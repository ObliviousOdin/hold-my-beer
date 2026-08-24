import type {
  Alert,
  Budget,
  HealthSnapshot,
  OrgSnapshot,
  Policy,
  RoutePool,
  VirtualKey,
  Workload,
} from "./types";
import { ALL_MODELS } from "./catalog";
import { POLICY_PACKS } from "./policy";

function pick(id: string) {
  return ALL_MODELS.find((m) => m.id === id)?.id ?? ALL_MODELS[0].id;
}

export const DEMO_ORG: OrgSnapshot = {
  name: "Northwind Platform",
  plan: "brewery",
  mode: "enforce",
  spendMonthUsd: 18420.44,
  spendLimitUsd: 25000,
  requestsMonth: 98411,
  cacheHitRate: 0.18,
  blockedRate: 0.016,
  avgLatencyMs: 612,
};

export const DEMO_KEYS: VirtualKey[] = [
  { id: "hk_live_0", name: "checkout-prod", prefix: "hmb_live_chk_", secretHint: "…k3p9", workloadId: "checkout-copilot", role: "developer", createdAt: "2026-03-12", lastUsedAt: "2026-08-24", revoked: false, spendUsd: 4120.12, requestCount: 22104 },
  { id: "hk_live_1", name: "incident-bot", prefix: "hmb_live_inc_", secretHint: "…q1aa", workloadId: "incident-bot", role: "operator", createdAt: "2026-01-08", lastUsedAt: "2026-08-24", revoked: false, spendUsd: 2901.4, requestCount: 8831 },
  { id: "hk_live_2", name: "code-review", prefix: "hmb_live_cr_", secretHint: "…88vz", workloadId: "code-review", role: "developer", createdAt: "2026-02-01", lastUsedAt: "2026-08-23", revoked: false, spendUsd: 1544.9, requestCount: 12003 },
  { id: "hk_live_3", name: "support-l1", prefix: "hmb_live_sup_", secretHint: "…m2r0", workloadId: "support-l1", role: "developer", createdAt: "2025-11-19", lastUsedAt: "2026-08-24", revoked: false, spendUsd: 980.2, requestCount: 30112 },
  { id: "hk_live_4", name: "lab-shared", prefix: "hmb_lab_", secretHint: "…test", workloadId: "research", role: "viewer", createdAt: "2026-08-01", revoked: false, spendUsd: 12.04, requestCount: 440 },
  { id: "hk_live_5", name: "revoked-old-rag", prefix: "hmb_dead_", secretHint: "…xxxx", workloadId: "docs-search", role: "developer", createdAt: "2025-06-02", lastUsedAt: "2026-04-11", revoked: true, spendUsd: 771.0, requestCount: 9001 },
];

export const DEMO_WORKLOADS: Workload[] = [
  { id: "checkout-copilot", name: "Checkout copilot", team: "commerce", environment: "prod", routePoolId: "pool_fast", budgetId: "b_commerce", policyId: "pack-finops-tight", owner: "amina@northwind" },
  { id: "incident-bot", name: "Incident bot", team: "sre", environment: "prod", routePoolId: "pool_smart", budgetId: "b_sre", policyId: "pack-soc2-enforce", owner: "jon@northwind" },
  { id: "code-review", name: "Code review", team: "platform", environment: "prod", routePoolId: "pool_code", budgetId: "b_platform", policyId: "pack-code-review", owner: "lea@northwind" },
  { id: "support-l1", name: "Support L1", team: "cx", environment: "prod", routePoolId: "pool_fast", budgetId: "b_cx", policyId: "pack-support-l1", owner: "cx-leads@northwind" },
  { id: "research", name: "Research long-context", team: "data", environment: "staging", routePoolId: "pool_smart", budgetId: "b_data", policyId: "pack-research-long", owner: "r&d@northwind" },
  { id: "eval-harness", name: "Eval harness", team: "platform", environment: "dev", routePoolId: "pool_lab", budgetId: "b_platform", policyId: "pack-lab-open", owner: "eval@northwind" },
  { id: "sales-assist", name: "Sales assist", team: "gtm", environment: "prod", routePoolId: "pool_fast", budgetId: "b_gtm", policyId: "pack-public-chat", owner: "gtm@northwind" },
  { id: "docs-search", name: "Docs search", team: "platform", environment: "prod", routePoolId: "pool_rag", budgetId: "b_platform", policyId: "pack-finops-tight", owner: "docs@northwind" },
];

export const DEMO_POOLS: RoutePool[] = [
  {
    id: "pool_fast",
    name: "Approved fast",
    alias: "company-approved-fast",
    strategy: "least-cost",
    cacheTtlSeconds: 120,
    hedge: false,
    fallbackOn: ["timeout", "5xx", "429", "budget"],
    notes: "Interactive product surfaces. Prefer cheap healthy hosts.",
    targets: [
      { id: "t1", modelId: pick("groq/llama-4-scout-groq"), provider: "groq", weight: 40, priority: 1, enabled: true, maxAttempts: 2, cooldownMs: 8000, circuitFailureThreshold: 5 },
      { id: "t2", modelId: pick("openai/gpt-4.1-mini"), provider: "openai", weight: 30, priority: 2, enabled: true, maxAttempts: 2, cooldownMs: 8000, circuitFailureThreshold: 5 },
      { id: "t3", modelId: pick("google/gemini-2.5-flash"), provider: "google", weight: 20, priority: 3, enabled: true, maxAttempts: 1, cooldownMs: 15000, circuitFailureThreshold: 4 },
      { id: "t4", modelId: pick("anthropic/claude-haiku-4.5"), provider: "anthropic", weight: 10, priority: 4, enabled: true, maxAttempts: 1, cooldownMs: 15000, circuitFailureThreshold: 4 },
    ],
  },
  {
    id: "pool_smart",
    name: "Approved smart",
    alias: "company-approved-smart",
    strategy: "priority",
    cacheTtlSeconds: 30,
    hedge: false,
    fallbackOn: ["timeout", "5xx", "429"],
    notes: "Hard problems. Frontier first, degrade to workhorse.",
    targets: [
      { id: "s1", modelId: pick("anthropic/claude-sonnet-4.5"), provider: "anthropic", weight: 40, priority: 1, enabled: true, maxAttempts: 2, cooldownMs: 10000, circuitFailureThreshold: 3 },
      { id: "s2", modelId: pick("openai/gpt-5"), provider: "openai", weight: 30, priority: 2, enabled: true, maxAttempts: 2, cooldownMs: 10000, circuitFailureThreshold: 3 },
      { id: "s3", modelId: pick("xai/grok-4.5"), provider: "xai", weight: 20, priority: 3, enabled: true, maxAttempts: 1, cooldownMs: 12000, circuitFailureThreshold: 3 },
      { id: "s4", modelId: pick("google/gemini-2.5-pro"), provider: "google", weight: 10, priority: 4, enabled: true, maxAttempts: 1, cooldownMs: 12000, circuitFailureThreshold: 3 },
    ],
  },
  {
    id: "pool_code",
    name: "Code review",
    alias: "code-review",
    strategy: "weighted",
    cacheTtlSeconds: 0,
    hedge: false,
    fallbackOn: ["5xx", "429"],
    notes: "Diff-aware review. No image models.",
    targets: [
      { id: "c1", modelId: pick("anthropic/claude-sonnet-4.5"), provider: "anthropic", weight: 50, priority: 1, enabled: true, maxAttempts: 2, cooldownMs: 8000, circuitFailureThreshold: 4 },
      { id: "c2", modelId: pick("deepseek/deepseek-v3.2"), provider: "deepseek", weight: 30, priority: 2, enabled: true, maxAttempts: 2, cooldownMs: 8000, circuitFailureThreshold: 4 },
      { id: "c3", modelId: pick("mistral/codestral-2501"), provider: "mistral", weight: 20, priority: 3, enabled: true, maxAttempts: 1, cooldownMs: 8000, circuitFailureThreshold: 4 },
    ],
  },
  {
    id: "pool_rag",
    name: "Cheap RAG",
    alias: "cheap-rag",
    strategy: "least-cost",
    cacheTtlSeconds: 900,
    hedge: false,
    fallbackOn: ["timeout", "5xx", "429", "budget"],
    notes: "Rewrite and extract. Utility class only.",
    targets: [
      { id: "r1", modelId: pick("openai/gpt-4.1-nano"), provider: "openai", weight: 50, priority: 1, enabled: true, maxAttempts: 2, cooldownMs: 5000, circuitFailureThreshold: 6 },
      { id: "r2", modelId: pick("google/gemini-2.5-flash-lite"), provider: "google", weight: 50, priority: 2, enabled: true, maxAttempts: 2, cooldownMs: 5000, circuitFailureThreshold: 6 },
    ],
  },
  {
    id: "pool_lab",
    name: "Lab open",
    alias: "lab-open",
    strategy: "round-robin",
    cacheTtlSeconds: 0,
    hedge: false,
    fallbackOn: ["5xx"],
    notes: "Test Lab. Observe-only.",
    targets: [
      { id: "l1", modelId: pick("xai/grok-4.5"), provider: "xai", weight: 50, priority: 1, enabled: true, maxAttempts: 1, cooldownMs: 4000, circuitFailureThreshold: 8 },
      { id: "l2", modelId: pick("openai/gpt-4.1-mini"), provider: "openai", weight: 50, priority: 2, enabled: true, maxAttempts: 1, cooldownMs: 4000, circuitFailureThreshold: 8 },
    ],
  },
  {
    id: "pool_eu",
    name: "EU only",
    alias: "eu-only",
    strategy: "health",
    cacheTtlSeconds: 60,
    hedge: false,
    fallbackOn: ["timeout", "5xx"],
    notes: "Region-locked. Fail closed if no EU target is healthy.",
    targets: [
      { id: "e1", modelId: pick("mistral/mistral-small-3.1"), provider: "mistral", weight: 60, priority: 1, enabled: true, maxAttempts: 2, cooldownMs: 8000, circuitFailureThreshold: 3 },
      { id: "e2", modelId: pick("azure/gpt-4.1-mini"), provider: "azure", weight: 40, priority: 2, enabled: true, maxAttempts: 2, cooldownMs: 8000, circuitFailureThreshold: 3 },
    ],
  },
];

export const DEMO_BUDGETS: Budget[] = [
  { id: "b_org", name: "Northwind August", scope: "org", scopeId: "northwind", period: "monthly", hardLimitUsd: 25000, softLimitUsd: 20000, reservedUsd: 140.2, spentUsd: 18420.44, actionOnSoft: "alert", actionOnHard: "block" },
  { id: "b_commerce", name: "Commerce", scope: "team", scopeId: "checkout-copilot", period: "monthly", hardLimitUsd: 6000, softLimitUsd: 4800, reservedUsd: 40, spentUsd: 4120.12, actionOnSoft: "degrade", actionOnHard: "degrade" },
  { id: "b_sre", name: "SRE", scope: "team", scopeId: "incident-bot", period: "monthly", hardLimitUsd: 4000, softLimitUsd: 3200, reservedUsd: 12, spentUsd: 2901.4, actionOnSoft: "alert", actionOnHard: "block" },
  { id: "b_platform", name: "Platform", scope: "team", scopeId: "code-review", period: "monthly", hardLimitUsd: 3500, softLimitUsd: 2800, reservedUsd: 8, spentUsd: 2315.9, actionOnSoft: "reroute", actionOnHard: "degrade" },
  { id: "b_cx", name: "CX", scope: "team", scopeId: "support-l1", period: "monthly", hardLimitUsd: 1500, softLimitUsd: 1200, reservedUsd: 4, spentUsd: 980.2, actionOnSoft: "degrade", actionOnHard: "block" },
  { id: "b_data", name: "Data", scope: "team", scopeId: "research", period: "monthly", hardLimitUsd: 5000, softLimitUsd: 4000, reservedUsd: 0, spentUsd: 1880.4, actionOnSoft: "alert", actionOnHard: "require-approval" },
  { id: "b_gtm", name: "GTM", scope: "team", scopeId: "sales-assist", period: "monthly", hardLimitUsd: 2000, softLimitUsd: 1600, reservedUsd: 6, spentUsd: 1222.5, actionOnSoft: "alert", actionOnHard: "degrade" },
  { id: "b_prepaid", name: "Lab prepaid", scope: "prepaid", scopeId: "research", period: "prepaid", hardLimitUsd: 50, softLimitUsd: 10, reservedUsd: 0, spentUsd: 12.04, actionOnSoft: "alert", actionOnHard: "block" },
];

export const DEMO_POLICIES: Policy[] = POLICY_PACKS;

export const DEMO_HEALTH: HealthSnapshot[] = [
  { provider: "openai", healthy: true, latencyP50: 420, latencyP95: 1100, errorRate: 0.004, quotaRemaining: 0.82 },
  { provider: "anthropic", healthy: true, latencyP50: 510, latencyP95: 1400, errorRate: 0.006, quotaRemaining: 0.74 },
  { provider: "google", healthy: true, latencyP50: 380, latencyP95: 980, errorRate: 0.01, quotaRemaining: 0.91 },
  { provider: "xai", healthy: true, latencyP50: 390, latencyP95: 920, errorRate: 0.008, quotaRemaining: 0.88 },
  { provider: "groq", healthy: true, latencyP50: 90, latencyP95: 210, errorRate: 0.002, quotaRemaining: 0.67 },
  { provider: "together", healthy: true, latencyP50: 240, latencyP95: 700, errorRate: 0.012, quotaRemaining: 0.7 },
  { provider: "fireworks", healthy: true, latencyP50: 220, latencyP95: 640, errorRate: 0.009, quotaRemaining: 0.77 },
  { provider: "mistral", healthy: true, latencyP50: 310, latencyP95: 800, errorRate: 0.007, quotaRemaining: 0.84 },
  { provider: "deepseek", healthy: true, latencyP50: 280, latencyP95: 760, errorRate: 0.015, quotaRemaining: 0.6 },
  { provider: "amazon", healthy: false, latencyP50: 1800, latencyP95: 4200, errorRate: 0.18, quotaRemaining: 0.2 },
  { provider: "azure", healthy: true, latencyP50: 470, latencyP95: 1300, errorRate: 0.005, quotaRemaining: 0.8 },
  { provider: "cohere", healthy: true, latencyP50: 260, latencyP95: 700, errorRate: 0.004, quotaRemaining: 0.9 },
  { provider: "cerebras", healthy: true, latencyP50: 70, latencyP95: 160, errorRate: 0.003, quotaRemaining: 0.55 },
  { provider: "openrouter", healthy: true, latencyP50: 540, latencyP95: 1600, errorRate: 0.02, quotaRemaining: 0.93 },
];

export const DEMO_ALERTS: Alert[] = [
  { id: "a1", ts: "2026-08-24T08:12:00Z", severity: "warn", title: "Commerce at 69% of hard limit", body: "Degrade-to-mini will fire at 80%. Checkout copilot is the burn leader.", href: "/console/spend" },
  { id: "a2", ts: "2026-08-24T06:40:00Z", severity: "critical", title: "Amazon Bedrock circuit open", body: "Error rate 18% over 15m. Pool company-approved-fast already failed over.", href: "/console/routes" },
  { id: "a3", ts: "2026-08-23T21:04:00Z", severity: "info", title: "Cache hit rate climbed to 18%", body: "cheap-rag TTL 900s is doing the work. Consider raising interactive TTL from 120s to 180s.", href: "/console/finops" },
  { id: "a4", ts: "2026-08-23T16:22:00Z", severity: "warn", title: "Jailbreak hits on public chat", body: "14 SEC.JAILBREAK events on sales-assist. Pack is in enforce — none reached a provider.", href: "/console/evidence" },
];
