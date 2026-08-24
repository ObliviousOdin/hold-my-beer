import type {
  Budget,
  CanonicalRequest,
  EvidenceRecord,
  GatewayRequest,
  GatewayResult,
  GovernanceMode,
  HealthSnapshot,
  Outcome,
  Policy,
  RoutePool,
  RouteTarget,
  Usage,
  VirtualKey,
} from "./types";
import { getModel } from "./catalog";
import { simulate } from "./lab/simulator";
import { costUsd, estimateRequestTokens } from "./tokenizer";

export interface EngineState {
  keys: VirtualKey[];
  pools: RoutePool[];
  budgets: Budget[];
  policies: Policy[];
  health: HealthSnapshot[];
  now: number;
  mode: GovernanceMode;
}

function hash(parts: string[]): string {
  let h = 2166136261;
  const s = parts.join("|");
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ("00000000" + (h >>> 0).toString(16)).slice(-8);
}

export function estimateCost(req: CanonicalRequest, modelId: string): { usd: number; usage: Usage } {
  const model = getModel(modelId);
  const input = estimateRequestTokens(req.messages, model?.tokenizer);
  const output = Math.min(req.maxTokens ?? 512, model?.maxOutput ?? 512);
  const usd = model
    ? costUsd(input, output, model.inputPerMillion, model.outputPerMillion, 0, model.cachedInputPerMillion)
    : 0;
  return {
    usd,
    usage: {
      inputTokens: input,
      outputTokens: output,
      cachedTokens: 0,
      reasoningTokens: 0,
      totalTokens: input + output,
    },
  };
}

function keyFor(state: EngineState, apiKey: string): VirtualKey | undefined {
  return state.keys.find((k) => !k.revoked && (apiKey === k.id || apiKey.startsWith(k.prefix)));
}

function poolForAlias(state: EngineState, alias: string): RoutePool | undefined {
  return state.pools.find((p) => p.alias === alias || p.id === alias || p.name === alias);
}

export function evaluatePolicy(
  policy: Policy | undefined,
  req: CanonicalRequest,
  modelId: string,
  mode: GovernanceMode,
): { allow: boolean; reasons: string[]; mutated: CanonicalRequest } {
  const reasons: string[] = [];
  let allow = true;
  const mutated: CanonicalRequest = { ...req, maxTokens: req.maxTokens };
  if (!policy) return { allow: true, reasons, mutated };
  const effective = policy.mode === "observe" ? "observe" : mode;
  for (const rule of policy.rules) {
    if (rule.kind === "max-tokens" && typeof rule.value === "number") {
      if ((mutated.maxTokens ?? Infinity) > rule.value) {
        mutated.maxTokens = rule.value;
        reasons.push(rule.reasonCode);
      }
    }
    if (rule.kind === "deny-model") {
      const denied = Array.isArray(rule.value) ? rule.value : [String(rule.value)];
      if (denied.includes(modelId) || denied.includes(req.model)) {
        reasons.push(rule.reasonCode);
        if (effective === "enforce") allow = false;
      }
    }
    if (rule.kind === "allow-model") {
      const allowed = Array.isArray(rule.value) ? rule.value : [String(rule.value)];
      if (!allowed.includes(modelId) && !allowed.includes(req.model) && !allowed.includes("*")) {
        reasons.push(rule.reasonCode);
        if (effective === "enforce") allow = false;
      }
    }
    if (rule.kind === "jailbreak") {
      const blob = req.messages.map((m) => m.content).join("\n").toLowerCase();
      if (blob.includes("ignore previous") || blob.includes("jailbreak") || blob.includes("dan mode")) {
        reasons.push(rule.reasonCode);
        if (effective === "enforce" && rule.value === "block") allow = false;
      }
    }
    if (rule.kind === "tool-allowlist" && req.tools?.length) {
      const allowTools = Array.isArray(rule.value) ? rule.value.map(String) : [String(rule.value)];
      if (req.tools.some((t) => !allowTools.includes(t.name))) {
        reasons.push(rule.reasonCode);
        if (effective === "enforce") allow = false;
      }
    }
  }
  return { allow, reasons, mutated };
}

export function selectTarget(
  pool: RoutePool,
  health: HealthSnapshot[],
  preferCost = false,
): RouteTarget | undefined {
  const eligible = pool.targets.filter((t) => t.enabled);
  if (!eligible.length) return undefined;
  const healthy = eligible.filter((t) => {
    const h = health.find((x) => x.provider === t.provider);
    return !h || h.healthy;
  });
  const set = healthy.length ? healthy : eligible;
  if (pool.strategy === "priority" || pool.strategy === "health") {
    return [...set].sort((a, b) => a.priority - b.priority)[0];
  }
  if (pool.strategy === "least-cost" || preferCost) {
    return [...set].sort((a, b) => {
      const ma = getModel(a.modelId);
      const mb = getModel(b.modelId);
      const ca = (ma?.inputPerMillion ?? 99) + (ma?.outputPerMillion ?? 99);
      const cb = (mb?.inputPerMillion ?? 99) + (mb?.outputPerMillion ?? 99);
      return ca - cb;
    })[0];
  }
  if (pool.strategy === "weighted" || pool.strategy === "round-robin") {
    const total = set.reduce((s, t) => s + Math.max(1, t.weight), 0);
    let r = Math.random() * total;
    for (const t of set) {
      r -= Math.max(1, t.weight);
      if (r <= 0) return t;
    }
    return set[0];
  }
  if (pool.strategy === "latency") {
    return [...set].sort((a, b) => {
      const ha = health.find((x) => x.provider === a.provider)?.latencyP50 ?? 9999;
      const hb = health.find((x) => x.provider === b.provider)?.latencyP50 ?? 9999;
      return ha - hb;
    })[0];
  }
  return set[0];
}

export function reserveBudget(budget: Budget, estimate: number): { ok: boolean; budget: Budget; reason?: string } {
  if (budget.spentUsd + budget.reservedUsd + estimate > budget.hardLimitUsd) {
    return { ok: false, budget, reason: "BGT.RESERVE_FAIL" };
  }
  return {
    ok: true,
    budget: { ...budget, reservedUsd: budget.reservedUsd + estimate },
    reason: estimate + budget.spentUsd >= budget.softLimitUsd ? "BGT.SOFT_ALERT" : undefined,
  };
}

export function settleBudget(budget: Budget, reserved: number, actual: number): Budget {
  return {
    ...budget,
    reservedUsd: Math.max(0, budget.reservedUsd - reserved),
    spentUsd: budget.spentUsd + actual,
  };
}

const cache = new Map<string, { at: number; response: GatewayResult["response"]; ttl: number }>();

function cacheKey(req: CanonicalRequest, alias: string, workload: string): string {
  return hash([workload, alias, req.model, req.messages.map((m) => m.role + m.content).join(""), String(req.maxTokens ?? "")]);
}

export function handleGatewayRequest(input: GatewayRequest, state: EngineState): GatewayResult {
  const now = input.now ?? state.now ?? Date.now();
  const reasons: string[] = [];
  const key = keyFor(state, input.apiKey);
  if (!key) {
    return deny(401, "AUTH.MISSING_KEY", input, state, now, reasons);
  }
  const alias = input.request.model;
  const pool = poolForAlias(state, alias);
  const requested = pool?.targets[0]?.modelId ?? alias;
  const policy = state.policies[0];
  const budget = state.budgets.find((b) => b.scopeId === key.workloadId) ?? state.budgets[0];

  let target = pool ? selectTarget(pool, state.health) : undefined;
  let modelId = target?.modelId ?? requested;
  const policyRes = evaluatePolicy(policy, input.request, modelId, state.mode);
  reasons.push(...policyRes.reasons);
  if (!policyRes.allow) {
    return deny(403, policyRes.reasons[0] ?? "POL.DENY_MODEL", input, state, now, reasons, key, pool);
  }
  const req = policyRes.mutated;

  if (pool && !target) {
    return deny(503, "RTE.NO_ELIGIBLE", input, state, now, reasons.concat("RTE.NO_ELIGIBLE"), key, pool);
  }

  const estimate = estimateCost(req, modelId);
  if (budget) {
    const reserved = reserveBudget(budget, estimate.usd);
    if (!reserved.ok) {
      if (pool?.fallbackOn.includes("budget")) {
        target = selectTarget(pool, state.health, true);
        modelId = target?.modelId ?? modelId;
        reasons.push("BGT.DEGRADE");
      } else {
        return deny(402, "BGT.RESERVE_FAIL", input, state, now, reasons.concat("BGT.RESERVE_FAIL"), key, pool);
      }
    } else if (reserved.reason) reasons.push(reserved.reason);
  }

  if (pool?.cacheTtlSeconds && !req.stream && !req.tools?.length) {
    const ck = cacheKey(req, pool.alias, key.workloadId);
    const hit = cache.get(ck);
    if (hit && now - hit.at < hit.ttl * 1000 && hit.response) {
      reasons.push("CCH.HIT", "RTE.SELECTED");
      const evidence = makeEvidence({
        now, key, pool, req, modelId, outcome: "cached", reasons, estimate: 0, settled: 0, latency: 4, usage: hit.response.usage, attempts: 0, cached: true, mode: state.mode,
      });
      return { ok: true, status: 200, response: { ...hit.response, cached: true }, evidence };
    }
    reasons.push("CCH.MISS");
  } else {
    reasons.push("CCH.BYPASS");
  }

  reasons.push("RTE.SELECTED", "LAB.SIMULATED");
  const started = now;
  const response = simulate({ ...req, model: modelId }, 30 + Math.round(Math.random() * 90));
  const model = getModel(modelId);
  const settled = model
    ? costUsd(
        response.usage.inputTokens,
        response.usage.outputTokens,
        model.inputPerMillion,
        model.outputPerMillion,
        response.usage.cachedTokens,
        model.cachedInputPerMillion,
      )
    : estimate.usd;
  if (budget) {
    const next = settleBudget(budget, estimate.usd, settled);
    budget.reservedUsd = next.reservedUsd;
    budget.spentUsd = next.spentUsd;
  }
  if (pool?.cacheTtlSeconds && response) {
    cache.set(cacheKey(req, pool.alias, key.workloadId), {
      at: now,
      response,
      ttl: pool.cacheTtlSeconds,
    });
  }
  const evidence = makeEvidence({
    now: started,
    key,
    pool,
    req,
    modelId,
    outcome: "served",
    reasons,
    estimate: estimate.usd,
    settled,
    latency: response.latencyMs,
    usage: response.usage,
    attempts: 1,
    cached: false,
    mode: state.mode,
  });
  return { ok: true, status: 200, response, evidence };
}

function deny(
  status: number,
  reason: string,
  input: GatewayRequest,
  state: EngineState,
  now: number,
  reasons: string[],
  key?: VirtualKey,
  pool?: RoutePool,
): GatewayResult {
  const all = reasons.includes(reason) ? reasons : reasons.concat(reason);
  const evidence = makeEvidence({
    now,
    key,
    pool,
    req: input.request,
    modelId: input.request.model,
    outcome: status === 402 ? "budget_denied" : status === 403 ? "policy_denied" : "error",
    reasons: all,
    estimate: 0,
    settled: 0,
    latency: 2,
    usage: { inputTokens: 0, outputTokens: 0, cachedTokens: 0, reasoningTokens: 0, totalTokens: 0 },
    attempts: 0,
    cached: false,
    mode: state.mode,
  });
  return { ok: false, status, deniedReason: reason, evidence };
}

function makeEvidence(opts: {
  now: number;
  key?: VirtualKey;
  pool?: RoutePool;
  req: CanonicalRequest;
  modelId: string;
  outcome: Outcome;
  reasons: string[];
  estimate: number;
  settled: number;
  latency: number;
  usage: Usage;
  attempts: number;
  cached: boolean;
  mode: GovernanceMode;
}): EvidenceRecord {
  const model = getModel(opts.modelId);
  const id = "ev_" + opts.now.toString(36) + Math.random().toString(36).slice(2, 6);
  const integrity = hash([
    id,
    opts.key?.workloadId ?? "none",
    opts.pool?.alias ?? "none",
    opts.modelId,
    opts.outcome,
    opts.settled.toFixed(6),
    opts.reasons.join(","),
  ]);
  return {
    id,
    ts: new Date(opts.now).toISOString(),
    workloadId: opts.key?.workloadId ?? "unknown",
    keyId: opts.key?.id ?? "unknown",
    routePoolId: opts.pool?.id ?? "none",
    alias: opts.pool?.alias ?? opts.req.model,
    requestedModel: opts.req.model,
    selectedModel: opts.modelId,
    provider: model?.provider ?? "openrouter",
    outcome: opts.outcome,
    reasonCodes: opts.reasons,
    estimatedUsd: opts.estimate,
    settledUsd: opts.settled,
    latencyMs: opts.latency,
    usage: opts.usage,
    attempts: opts.attempts,
    cacheHit: opts.cached,
    integrity,
    mode: opts.mode,
  };
}
