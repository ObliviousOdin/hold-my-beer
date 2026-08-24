import assert from "node:assert/strict";
import test from "node:test";
import { FIREWORKS_MODELS } from "../catalog/fireworks";
import { fireworksAdapter, fireworksEstimate } from "../adapters/fireworks";

test("fireworks catalog is coherent", () => {
  assert.ok(FIREWORKS_MODELS.length >= 1);
  for (const m of FIREWORKS_MODELS) {
    assert.equal(m.provider, 'fireworks');
    assert.ok(m.id.includes('/'));
  }
});

test("fireworks adapter roundtrip", () => {
  const up = fireworksAdapter.toUpstream({ model: FIREWORKS_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] });
  assert.ok(up);
  const down = fireworksAdapter.fromUpstream({ id: 'x', choices: [{ message: { content: 'pong' } }], usage: { prompt_tokens: 3, completion_tokens: 1 } }, { model: FIREWORKS_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] }, 12);
  assert.equal(down.content, 'pong');
  assert.equal(down.usage.inputTokens, 3);
});

test("fireworks cost helper", () => {
  assert.equal(fireworksEstimate(1_000_000, 0, 1, 2), 1);
});

test("fireworks model fireworks/llama-4-maverick pricing is finite", () => {
  const m = FIREWORKS_MODELS.find((x) => x.id === 'fireworks/llama-4-maverick');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.2565);
});

test("fireworks model fireworks/llama-4-scout pricing is finite", () => {
  const m = FIREWORKS_MODELS.find((x) => x.id === 'fireworks/llama-4-scout');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.171);
});

test("fireworks model fireworks/llama-3.3-70b pricing is finite", () => {
  const m = FIREWORKS_MODELS.find((x) => x.id === 'fireworks/llama-3.3-70b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.5605);
});

test("fireworks model fireworks/llama-3.1-8b pricing is finite", () => {
  const m = FIREWORKS_MODELS.find((x) => x.id === 'fireworks/llama-3.1-8b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.0475);
});

test("fireworks model fireworks/llama-3.1-405b pricing is finite", () => {
  const m = FIREWORKS_MODELS.find((x) => x.id === 'fireworks/llama-3.1-405b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 1.7005);
});

test("fireworks model fireworks/mistral-large-2411 pricing is finite", () => {
  const m = FIREWORKS_MODELS.find((x) => x.id === 'fireworks/mistral-large-2411');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 1.9);
});

test("fireworks model fireworks/mistral-small-3.1 pricing is finite", () => {
  const m = FIREWORKS_MODELS.find((x) => x.id === 'fireworks/mistral-small-3.1');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.095);
});

test("fireworks model fireworks/codestral-2501 pricing is finite", () => {
  const m = FIREWORKS_MODELS.find((x) => x.id === 'fireworks/codestral-2501');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.285);
});

test("fireworks model fireworks/pixtral-large pricing is finite", () => {
  const m = FIREWORKS_MODELS.find((x) => x.id === 'fireworks/pixtral-large');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 1.9);
});

test("fireworks model fireworks/ministral-8b pricing is finite", () => {
  const m = FIREWORKS_MODELS.find((x) => x.id === 'fireworks/ministral-8b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.095);
});

test("fireworks model fireworks/deepseek-v3.2 pricing is finite", () => {
  const m = FIREWORKS_MODELS.find((x) => x.id === 'fireworks/deepseek-v3.2');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.2565);
});

test("fireworks model fireworks/deepseek-v3 pricing is finite", () => {
  const m = FIREWORKS_MODELS.find((x) => x.id === 'fireworks/deepseek-v3');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.2565);
});
