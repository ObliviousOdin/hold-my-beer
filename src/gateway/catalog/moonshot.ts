import type { Modality, ModelSpec, Protocol } from "../types";

export const MOONSHOT_MODELS: ModelSpec[] = [
  {
    id: 'moonshot/kimi-k2.5',
    provider: 'moonshot',
    displayName: 'Kimi K2.5 via moonshot',
    family: 'Kimi',
    release: '2026-01',
    modality: ['text', 'tools', 'json', 'code'] as Modality[],
    protocol: 'openai-chat' as Protocol,
    contextWindow: 262144,
    maxOutput: 16384,
    inputPerMillion: 0.6,
    outputPerMillion: 3.0,
    cachedInputPerMillion: 0.15,
    tokenizer: 'kimi',
    streaming: true,
    tools: true,
    jsonMode: true,
    vision: false,
    regions: ['us-west', 'asia-east'],
    status: 'ga',
    speedClass: 'fast',
    qualityClass: 'frontier',
    notes: 'Kimi K2.5 via moonshot (moonshot/kimi-k2.5) is a frontier Kimi model hosted by moonshot. It speaks openai-chat with a 262,144 token context window and a 16,384 token output cap. List price is $0.6/M input tokens and $3.0/M output tokens, with cached input at $0.15/M. Modalities: text, tools, json, code. Tokenizer: kimi. Speed class: fast. Hold My Beer treats this as a first-class catalog citizen: budgets reserve against these rates, route pools can pin or exclude it, and the evidence ledger records the alias that selected it without storing prompt bodies. Status: ga. Released 2026-01.',
    useCases: ['hard reasoning', 'long-horizon agents', 'research synthesis', 'high-stakes writing', 'multimodal ops'],
    fallbacks: [],
    carbonGPerMTok: 1.26,
  },
  {
    id: 'moonshot/kimi-k2',
    provider: 'moonshot',
    displayName: 'Kimi K2 via moonshot',
    family: 'Kimi',
    release: '2025-07',
    modality: ['text', 'tools', 'json', 'code'] as Modality[],
    protocol: 'openai-chat' as Protocol,
    contextWindow: 131072,
    maxOutput: 16384,
    inputPerMillion: 0.6,
    outputPerMillion: 2.5,
    cachedInputPerMillion: 0.15,
    tokenizer: 'kimi',
    streaming: true,
    tools: true,
    jsonMode: true,
    vision: false,
    regions: ['us-west', 'asia-east'],
    status: 'ga',
    speedClass: 'fast',
    qualityClass: 'frontier',
    notes: 'Kimi K2 via moonshot (moonshot/kimi-k2) is a frontier Kimi model hosted by moonshot. It speaks openai-chat with a 131,072 token context window and a 16,384 token output cap. List price is $0.6/M input tokens and $2.5/M output tokens, with cached input at $0.15/M. Modalities: text, tools, json, code. Tokenizer: kimi. Speed class: fast. Hold My Beer treats this as a first-class catalog citizen: budgets reserve against these rates, route pools can pin or exclude it, and the evidence ledger records the alias that selected it without storing prompt bodies. Status: ga. Released 2025-07.',
    useCases: ['hard reasoning', 'long-horizon agents', 'research synthesis', 'high-stakes writing', 'multimodal ops'],
    fallbacks: [],
    carbonGPerMTok: 1.26,
  },
];

export const MOONSHOT_MODEL_COUNT = MOONSHOT_MODELS.length;

export const MODEL_DOC_moonshot_kimi_k2_5 = {
  id: 'moonshot/kimi-k2.5',
  summary: 'Kimi K2.5 via moonshot (moonshot/kimi-k2.5) is a frontier Kimi model hosted by moonshot. It speaks openai-chat with a 262,144 token context window and a 16,384 token output cap. List price is $0.6/M input tokens and $3.0/M output tokens, with cached input at $0.15/M. Modalities: text, tools, json, code. Tokenizer: kimi. Speed class: fast. Hold My Beer treats this as a first-class catalog citizen: budgets reserve against these rates, route pools can pin or exclude it, and the evidence ledger records the alias that selected it without storing prompt bodies. Status: ga. Released 2026-01.',
  routingHints: [
    'Prefer moonshot/kimi-k2.5 when quality class is frontier and speed class is fast.',
    'Cap max_tokens at 4096 in enforce mode for interactive workloads.',
    'Estimated fully-loaded cost for a 2k/500 turn is $0.0027.',
    'Carbon intensity about 1.26 gCO2e per million tokens on this host.',
    'Compatible protocol openai-chat; do not mix with mismatched route pool targets.',
  ],
  sli: {
    expectedP50Ms: 420,
    expectedP95Ms: 1400,
    errorBudgetPct: 0.5,
  },
};

export const MODEL_DOC_moonshot_kimi_k2 = {
  id: 'moonshot/kimi-k2',
  summary: 'Kimi K2 via moonshot (moonshot/kimi-k2) is a frontier Kimi model hosted by moonshot. It speaks openai-chat with a 131,072 token context window and a 16,384 token output cap. List price is $0.6/M input tokens and $2.5/M output tokens, with cached input at $0.15/M. Modalities: text, tools, json, code. Tokenizer: kimi. Speed class: fast. Hold My Beer treats this as a first-class catalog citizen: budgets reserve against these rates, route pools can pin or exclude it, and the evidence ledger records the alias that selected it without storing prompt bodies. Status: ga. Released 2025-07.',
  routingHints: [
    'Prefer moonshot/kimi-k2 when quality class is frontier and speed class is fast.',
    'Cap max_tokens at 4096 in enforce mode for interactive workloads.',
    'Estimated fully-loaded cost for a 2k/500 turn is $0.00245.',
    'Carbon intensity about 1.26 gCO2e per million tokens on this host.',
    'Compatible protocol openai-chat; do not mix with mismatched route pool targets.',
  ],
  sli: {
    expectedP50Ms: 420,
    expectedP95Ms: 1400,
    errorBudgetPct: 0.5,
  },
};

