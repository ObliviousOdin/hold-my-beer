export type ProviderId =
  | "openai"
  | "anthropic"
  | "google"
  | "xai"
  | "amazon"
  | "azure"
  | "mistral"
  | "cohere"
  | "groq"
  | "together"
  | "fireworks"
  | "deepseek"
  | "alibaba"
  | "meta"
  | "perplexity"
  | "nvidia"
  | "cerebras"
  | "sambanova"
  | "huggingface"
  | "openrouter"
  | "deepinfra"
  | "vertex"
  | "bedrock"
  | "moonshot"
  | "zai";

export type Modality =
  | "text"
  | "vision"
  | "audio"
  | "image"
  | "embed"
  | "rerank"
  | "code"
  | "tools"
  | "json"
  | "reasoning";

export type Protocol =
  | "openai-chat"
  | "openai-responses"
  | "openai-embeddings"
  | "openai-images"
  | "anthropic-messages"
  | "google-generate"
  | "bedrock-converse"
  | "cohere-chat";

export type GovernanceMode = "observe" | "shadow" | "enforce";

export type RouteStrategy = "priority" | "weighted" | "least-cost" | "health" | "latency" | "round-robin";

export type Outcome =
  | "served"
  | "cached"
  | "blocked"
  | "budget_denied"
  | "policy_denied"
  | "failover"
  | "degraded"
  | "error"
  | "circuit_open";

export type ReasonCode = string;

export type Role = "owner" | "admin" | "operator" | "finops" | "developer" | "viewer";

export interface ModelSpec {
  id: string;
  provider: ProviderId;
  displayName: string;
  family: string;
  release: string;
  modality: Modality[];
  protocol: Protocol;
  contextWindow: number;
  maxOutput: number;
  inputPerMillion: number;
  outputPerMillion: number;
  cachedInputPerMillion?: number;
  embeddingPerMillion?: number;
  reasoningPerMillion?: number;
  tokenizer: string;
  streaming: boolean;
  tools: boolean;
  jsonMode: boolean;
  vision: boolean;
  regions: string[];
  status: "ga" | "preview" | "deprecated" | "legacy";
  speedClass: "instant" | "fast" | "standard" | "slow" | "batch";
  qualityClass: "utility" | "workhorse" | "frontier" | "reasoning";
  notes: string;
  useCases: string[];
  fallbacks: string[];
  carbonGPerMTok: number;
}

export interface ProviderSpec {
  id: ProviderId;
  displayName: string;
  defaultBaseUrl: string;
  docsUrl: string;
  authHeader: "bearer" | "x-api-key" | "azure" | "gcp";
  protocols: Protocol[];
  healthPath: string;
  streaming: boolean;
  notes: string;
}

export interface VirtualKey {
  id: string;
  name: string;
  prefix: string;
  secretHint: string;
  workloadId: string;
  role: Role;
  createdAt: string;
  lastUsedAt?: string;
  revoked: boolean;
  spendUsd: number;
  requestCount: number;
}

export interface Workload {
  id: string;
  name: string;
  team: string;
  environment: "prod" | "staging" | "dev" | "lab";
  routePoolId: string;
  budgetId: string;
  policyId: string;
  owner: string;
}

export interface RouteTarget {
  id: string;
  modelId: string;
  provider: ProviderId;
  weight: number;
  priority: number;
  enabled: boolean;
  maxAttempts: number;
  cooldownMs: number;
  circuitFailureThreshold: number;
}

export interface RoutePool {
  id: string;
  name: string;
  alias: string;
  strategy: RouteStrategy;
  targets: RouteTarget[];
  cacheTtlSeconds: number;
  hedge: boolean;
  fallbackOn: Array<"timeout" | "5xx" | "429" | "content-filter" | "budget">;
  notes: string;
}

export interface Budget {
  id: string;
  name: string;
  scope: "org" | "team" | "workload" | "key" | "model" | "provider" | "prepaid";
  scopeId: string;
  period: "hourly" | "daily" | "weekly" | "monthly" | "prepaid";
  hardLimitUsd: number;
  softLimitUsd: number;
  reservedUsd: number;
  spentUsd: number;
  tokenCap?: number;
  requestCap?: number;
  actionOnSoft: "alert" | "degrade" | "reroute";
  actionOnHard: "block" | "degrade" | "require-approval";
}

export interface PolicyRule {
  id: string;
  kind:
    | "allow-model"
    | "deny-model"
    | "allow-provider"
    | "deny-provider"
    | "max-tokens"
    | "pii-redact"
    | "jailbreak"
    | "tool-allowlist"
    | "region-lock"
    | "env-lock"
    | "rate-limit"
    | "require-json"
    | "block-image"
    | "min-quality";
  value: string | number | string[];
  mode: GovernanceMode;
  reasonCode: ReasonCode;
}

export interface Policy {
  id: string;
  name: string;
  mode: GovernanceMode;
  rules: PolicyRule[];
  description: string;
}

export interface CanonicalMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  name?: string;
}

export interface CanonicalRequest {
  model: string;
  messages: CanonicalMessage[];
  maxTokens?: number;
  temperature?: number;
  stream?: boolean;
  tools?: Array<{ name: string }>;
  json?: boolean;
  workloadHint?: string;
  metadata?: Record<string, string>;
}

export interface Usage {
  inputTokens: number;
  outputTokens: number;
  cachedTokens: number;
  reasoningTokens: number;
  totalTokens: number;
}

export interface CanonicalResponse {
  id: string;
  model: string;
  content: string;
  finish: "stop" | "length" | "tool" | "filter" | "error";
  usage: Usage;
  latencyMs: number;
  cached: boolean;
}

export interface EvidenceRecord {
  id: string;
  ts: string;
  workloadId: string;
  keyId: string;
  routePoolId: string;
  alias: string;
  requestedModel: string;
  selectedModel: string;
  provider: ProviderId;
  outcome: Outcome;
  reasonCodes: ReasonCode[];
  estimatedUsd: number;
  settledUsd: number;
  latencyMs: number;
  usage: Usage;
  attempts: number;
  cacheHit: boolean;
  integrity: string;
  mode: GovernanceMode;
}

export interface GatewayRequest {
  apiKey: string;
  request: CanonicalRequest;
  now?: number;
}

export interface GatewayResult {
  ok: boolean;
  status: number;
  response?: CanonicalResponse;
  evidence: EvidenceRecord;
  deniedReason?: string;
}

export interface HealthSnapshot {
  provider: ProviderId;
  healthy: boolean;
  latencyP50: number;
  latencyP95: number;
  errorRate: number;
  quotaRemaining: number;
}

export interface OrgSnapshot {
  name: string;
  plan: "lab" | "taproom" | "brewery" | "distillery";
  mode: GovernanceMode;
  spendMonthUsd: number;
  spendLimitUsd: number;
  requestsMonth: number;
  cacheHitRate: number;
  blockedRate: number;
  avgLatencyMs: number;
}

export interface Alert {
  id: string;
  ts: string;
  severity: "info" | "warn" | "critical";
  title: string;
  body: string;
  href: string;
}

export interface SpendPoint {
  day: string;
  usd: number;
  requests: number;
  tokens: number;
  blocked: number;
  cached: number;
}

export interface ProviderSpend {
  provider: ProviderId;
  usd: number;
  share: number;
  requests: number;
}

export const REASON_PREFIX = {
  RTE: "routing",
  BGT: "budget",
  POL: "policy",
  CCH: "cache",
  HLT: "health",
  AUTH: "auth",
  LAB: "lab",
  SEC: "security",
} as const;
