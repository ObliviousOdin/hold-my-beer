import type { ProviderId } from "../types";
import { openaiAdapter } from "./openai";
import { anthropicAdapter } from "./anthropic";
import { googleAdapter } from "./google";
import { xaiAdapter } from "./xai";
import { amazonAdapter } from "./amazon";
import { azureAdapter } from "./azure";
import { mistralAdapter } from "./mistral";
import { cohereAdapter } from "./cohere";
import { groqAdapter } from "./groq";
import { togetherAdapter } from "./together";
import { fireworksAdapter } from "./fireworks";
import { deepseekAdapter } from "./deepseek";
import { alibabaAdapter } from "./alibaba";
import { metaAdapter } from "./meta";
import { perplexityAdapter } from "./perplexity";
import { nvidiaAdapter } from "./nvidia";
import { cerebrasAdapter } from "./cerebras";
import { sambanovaAdapter } from "./sambanova";
import { huggingfaceAdapter } from "./huggingface";
import { openrouterAdapter } from "./openrouter";
import { deepinfraAdapter } from "./deepinfra";
import { vertexAdapter } from "./vertex";
import { bedrockAdapter } from "./bedrock";
import { moonshotAdapter } from "./moonshot";
import { zaiAdapter } from "./zai";
export const ADAPTERS = {
  openai: openaiAdapter,
  anthropic: anthropicAdapter,
  google: googleAdapter,
  xai: xaiAdapter,
  amazon: amazonAdapter,
  azure: azureAdapter,
  mistral: mistralAdapter,
  cohere: cohereAdapter,
  groq: groqAdapter,
  together: togetherAdapter,
  fireworks: fireworksAdapter,
  deepseek: deepseekAdapter,
  alibaba: alibabaAdapter,
  meta: metaAdapter,
  perplexity: perplexityAdapter,
  nvidia: nvidiaAdapter,
  cerebras: cerebrasAdapter,
  sambanova: sambanovaAdapter,
  huggingface: huggingfaceAdapter,
  openrouter: openrouterAdapter,
  deepinfra: deepinfraAdapter,
  vertex: vertexAdapter,
  bedrock: bedrockAdapter,
  moonshot: moonshotAdapter,
  zai: zaiAdapter,
} as const;
export function getAdapter(id: ProviderId) { return ADAPTERS[id as keyof typeof ADAPTERS]; }
