import { createServerFn } from "@tanstack/react-start";

export const liveLabComplete = createServerFn({ method: "POST" })
  .validator((input: { prompt: string; maxTokens?: number }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "Live Grok is unavailable in this environment." };
    const prompt = data.prompt.slice(0, 2000);
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        messages: [
          {
            role: "system",
            content: "You are the Hold My Beer lab. Be concise. Never request secrets.",
          },
          { role: "user", content: prompt },
        ],
        max_tokens: Math.min(data.maxTokens ?? 128, 256),
      }),
    });
    if (!res.ok) return { ok: false as const, error: `xAI error ${res.status}` };
    const body = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    return { ok: true as const, text: body.choices?.[0]?.message?.content ?? "" };
  });
