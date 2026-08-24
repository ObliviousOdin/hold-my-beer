import type { CanonicalRequest, CanonicalResponse } from "../types";
import { getModel } from "../catalog";
import { estimateRequestTokens, estimateTokens } from "../tokenizer";

const STOCK = [
  "Hold My Beer reserved the budget, picked the cheapest healthy target, and left a receipt.",
  "Simulated provider response. No upstream call was made. Evidence still records the decision.",
  "The taproom served this from the Test Lab. Protocol shape matches the selected model.",
  "Fallback path exercised: primary target was marked unhealthy in the lab matrix.",
];

export function simulate(req: CanonicalRequest, latencyMs = 42): CanonicalResponse {
  const model = getModel(req.model);
  const input = estimateRequestTokens(req.messages, model?.tokenizer);
  const text = STOCK[input % STOCK.length] + (req.json ? ' {"ok":true}' : "");
  const output = estimateTokens(text, model?.tokenizer);
  return {
    id: "lab_" + Math.random().toString(36).slice(2),
    model: req.model,
    content: text,
    finish: "stop",
    usage: { inputTokens: input, outputTokens: output, cachedTokens: 0, reasoningTokens: 0, totalTokens: input + output },
    latencyMs,
    cached: false,
  };
}
