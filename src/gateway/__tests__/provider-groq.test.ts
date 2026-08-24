import assert from "node:assert/strict";
import test from "node:test";
import { GROQ_MODELS } from "../catalog/groq";
import { groqAdapter, groqEstimate } from "../adapters/groq";

test("groq catalog is coherent", () => {
  assert.ok(GROQ_MODELS.length >= 1);
  for (const m of GROQ_MODELS) {
    assert.equal(m.provider, 'groq');
    assert.ok(m.id.includes('/'));
  }
});

test("groq adapter roundtrip", () => {
  const up = groqAdapter.toUpstream({ model: GROQ_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] });
  assert.ok(up);
  const down = groqAdapter.fromUpstream({ id: 'x', choices: [{ message: { content: 'pong' } }], usage: { prompt_tokens: 3, completion_tokens: 1 } }, { model: GROQ_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] }, 12);
  assert.equal(down.content, 'pong');
  assert.equal(down.usage.inputTokens, 3);
});

test("groq cost helper", () => {
  assert.equal(groqEstimate(1_000_000, 0, 1, 2), 1);
});

test("groq model groq/llama-4-maverick pricing is finite", () => {
  const m = GROQ_MODELS.find((x) => x.id === 'groq/llama-4-maverick');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.189);
});

test("groq model groq/llama-4-scout pricing is finite", () => {
  const m = GROQ_MODELS.find((x) => x.id === 'groq/llama-4-scout');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.126);
});

test("groq model groq/llama-3.3-70b pricing is finite", () => {
  const m = GROQ_MODELS.find((x) => x.id === 'groq/llama-3.3-70b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.413);
});

test("groq model groq/llama-3.1-8b pricing is finite", () => {
  const m = GROQ_MODELS.find((x) => x.id === 'groq/llama-3.1-8b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.035);
});

test("groq model groq/llama-3.1-405b pricing is finite", () => {
  const m = GROQ_MODELS.find((x) => x.id === 'groq/llama-3.1-405b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 1.253);
});

test("groq model groq/llama-4-scout-groq pricing is finite", () => {
  const m = GROQ_MODELS.find((x) => x.id === 'groq/llama-4-scout-groq');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.11);
});

test("groq model groq/qwen3-32b-groq pricing is finite", () => {
  const m = GROQ_MODELS.find((x) => x.id === 'groq/qwen3-32b-groq');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.29);
});
