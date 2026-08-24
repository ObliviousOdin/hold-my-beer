
import type { CanonicalRequest, CanonicalResponse, ProviderId, Usage } from "../types";
import { getModel } from "../catalog";
import { estimateTokens } from "../tokenizer";

export const mistralAdapter = {
  id: 'mistral' as ProviderId,
  displayName: 'Mistral',
  defaultBaseUrl: 'https://api.mistral.ai/v1',
  toUpstream(req: CanonicalRequest): Record<string, unknown> {
    const model = getModel(req.model);
    const proto = model?.protocol ?? "openai-chat";
    if (proto === "anthropic-messages") {
      const system = req.messages.filter((m) => m.role === "system").map((m) => m.content).join("\n");
      const messages = req.messages.filter((m) => m.role !== "system").map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: [{ type: "text", text: m.content }],
      }));
      return {
        model: req.model.split("/").slice(1).join("/") || req.model,
        max_tokens: req.maxTokens ?? 1024,
        temperature: req.temperature ?? 1,
        system: system || undefined,
        messages,
        stream: Boolean(req.stream),
      };
    }
    if (proto === "google-generate") {
      return {
        contents: req.messages.filter((m) => m.role !== "system").map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
        systemInstruction: req.messages.find((m) => m.role === "system")?.content,
        generationConfig: {
          maxOutputTokens: req.maxTokens ?? 1024,
          temperature: req.temperature ?? 1,
          responseMimeType: req.json ? "application/json" : "text/plain",
        },
      };
    }
    if (proto === "bedrock-converse") {
      return {
        modelId: req.model,
        messages: req.messages.filter((m) => m.role !== "system").map((m) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: [{ text: m.content }],
        })),
        inferenceConfig: { maxTokens: req.maxTokens ?? 1024, temperature: req.temperature ?? 1 },
        system: req.messages.filter((m) => m.role === "system").map((m) => ({ text: m.content })),
      };
    }
    if (proto === "openai-embeddings") {
      return {
        model: req.model.split("/").slice(1).join("/") || req.model,
        input: req.messages.map((m) => m.content),
      };
    }
    return {
      model: req.model.split("/").slice(1).join("/") || req.model,
      messages: req.messages.map((m) => ({ role: m.role, content: m.content, name: m.name })),
      max_tokens: req.maxTokens,
      temperature: req.temperature,
      stream: Boolean(req.stream),
      response_format: req.json ? { type: "json_object" } : undefined,
      tools: req.tools?.map((t) => ({ type: "function", function: { name: t.name } })),
    };
  },
  fromUpstream(raw: Record<string, unknown>, req: CanonicalRequest, latencyMs: number): CanonicalResponse {
    const usageRaw = (raw.usage as Record<string, number> | undefined) ?? {};
    const usage: Usage = {
      inputTokens: Number(usageRaw.prompt_tokens ?? usageRaw.input_tokens ?? estimateTokens(req.messages.map((m) => m.content).join("\n"))),
      outputTokens: Number(usageRaw.completion_tokens ?? usageRaw.output_tokens ?? 0),
      cachedTokens: Number(usageRaw.cached_tokens ?? 0),
      reasoningTokens: Number(usageRaw.reasoning_tokens ?? 0),
      totalTokens: 0,
    };
    usage.totalTokens = usage.inputTokens + usage.outputTokens;
    let content = "";
    const choices = raw.choices as Array<Record<string, unknown>> | undefined;
    if (choices?.[0]) {
      const msg = (choices[0].message as Record<string, unknown> | undefined) ?? {};
      content = String(msg.content ?? choices[0].text ?? "");
    } else if (typeof raw.content === "string") {
      content = raw.content;
    } else if (Array.isArray(raw.content)) {
      content = (raw.content as Array<Record<string, string>>).map((b) => b.text ?? "").join("");
    }
    return {
      id: String(raw.id ?? `hmb-mistral-` + Math.random().toString(36).slice(2)),
      model: req.model,
      content,
      finish: "stop",
      usage,
      latencyMs,
      cached: false,
    };
  },
  mapError(status: number, body: string): { status: number; code: string; message: string } {
    if (status === 401 || status === 403) return { status, code: "AUTH.UPSTREAM_DENIED", message: 'Mistral' + " rejected the credential" };
    if (status === 429) return { status, code: "HLT.QUOTA", message: 'Mistral' + " is rate limiting" };
    if (status >= 500) return { status, code: "HLT.UPSTREAM_5XX", message: 'Mistral' + " is unhealthy: " + body.slice(0, 180) };
    return { status, code: "HLT.UPSTREAM", message: body.slice(0, 180) };
  },
  healthPath: '/models',
  notes: "Mistral adapter maps canonical Hold My Beer requests onto the provider's native protocol. Auth style is bearer. Default base URL https://api.mistral.ai/v1. Health probe /models. Streaming is framed as SSE for OpenAI-compatible hosts and as event-stream for Anthropic. The adapter never logs prompt bodies; only token counts, model ids, and latency land in evidence. Docs: https://docs.mistral.ai.",
};

export const mistralHeaderPlan = {
  auth: 'bearer',
  required: ['authorization'],
  redact: ['authorization', 'x-api-key', 'api-key'],
};

export const mistralRetryPolicy = {
  retryOn: [429, 500, 502, 503, 504],
  maxAttempts: 2,
  baseBackoffMs: 200,
  respectRetryAfter: true,
};

export function mistralEstimate(inputTokens: number, outputTokens: number, inputRate: number, outputRate: number): number {
  return (inputTokens * inputRate + outputTokens * outputRate) / 1_000_000;
}

export const mistralRegionAffinity: Record<string, string[]> = {
  'us-east': ['us-east-1', 'us-east-2'],
  'us-west': ['us-west-2', 'us-west-1'],
  'eu-west': ['eu-west-1', 'eu-central-1'],
  'asia-east': ['ap-southeast-1', 'ap-northeast-1'],
};

/** Wire-level error atlas for operators grepping evidence reason codes. */
export const mistralErrorAtlas: Record<string, string> = {
  'invalid_api_key': 'Mistral: Rotate the BYOK credential; the gateway will fail closed.',
  'insufficient_quota': 'Mistral: Provider quota is exhausted; route pool should failover.',
  'context_length_exceeded': 'Mistral: Trim the prompt or pick a longer-context target.',
  'content_filter': 'Mistral: Treat as POL.CONTENT and do not retry the same payload.',
  'overloaded': 'Mistral: Open the circuit for cooldownMs and pick the next target.',
  'model_not_found': 'Mistral: Alias points at a retired SKU; restore the previous route version.',
  'invalid_request': 'Mistral: Schema mismatch; check protocol of the selected target.',
};
