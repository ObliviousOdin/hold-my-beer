import assert from "node:assert/strict";
import test from "node:test";
import { OPENROUTER_MODELS } from "../catalog/openrouter";
import { openrouterAdapter, openrouterEstimate } from "../adapters/openrouter";

test("openrouter catalog is coherent", () => {
  assert.ok(OPENROUTER_MODELS.length >= 1);
  for (const m of OPENROUTER_MODELS) {
    assert.equal(m.provider, 'openrouter');
    assert.ok(m.id.includes('/'));
  }
});

test("openrouter adapter roundtrip", () => {
  const up = openrouterAdapter.toUpstream({ model: OPENROUTER_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] });
  assert.ok(up);
  const down = openrouterAdapter.fromUpstream({ id: 'x', choices: [{ message: { content: 'pong' } }], usage: { prompt_tokens: 3, completion_tokens: 1 } }, { model: OPENROUTER_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] }, 12);
  assert.equal(down.content, 'pong');
  assert.equal(down.usage.inputTokens, 3);
});

test("openrouter cost helper", () => {
  assert.equal(openrouterEstimate(1_000_000, 0, 1, 2), 1);
});

test("openrouter model openrouter/llama-4-maverick pricing is finite", () => {
  const m = OPENROUTER_MODELS.find((x) => x.id === 'openrouter/llama-4-maverick');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.2835);
});

test("openrouter model openrouter/llama-4-scout pricing is finite", () => {
  const m = OPENROUTER_MODELS.find((x) => x.id === 'openrouter/llama-4-scout');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.189);
});

test("openrouter model openrouter/llama-3.3-70b pricing is finite", () => {
  const m = OPENROUTER_MODELS.find((x) => x.id === 'openrouter/llama-3.3-70b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.6195);
});

test("openrouter model openrouter/llama-3.1-8b pricing is finite", () => {
  const m = OPENROUTER_MODELS.find((x) => x.id === 'openrouter/llama-3.1-8b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.0525);
});

test("openrouter model openrouter/llama-3.1-405b pricing is finite", () => {
  const m = OPENROUTER_MODELS.find((x) => x.id === 'openrouter/llama-3.1-405b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 1.8795);
});

test("openrouter model openrouter/mistral-large-2411 pricing is finite", () => {
  const m = OPENROUTER_MODELS.find((x) => x.id === 'openrouter/mistral-large-2411');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 2.1);
});

test("openrouter model openrouter/mistral-small-3.1 pricing is finite", () => {
  const m = OPENROUTER_MODELS.find((x) => x.id === 'openrouter/mistral-small-3.1');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.105);
});

test("openrouter model openrouter/codestral-2501 pricing is finite", () => {
  const m = OPENROUTER_MODELS.find((x) => x.id === 'openrouter/codestral-2501');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.315);
});

test("openrouter model openrouter/pixtral-large pricing is finite", () => {
  const m = OPENROUTER_MODELS.find((x) => x.id === 'openrouter/pixtral-large');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 2.1);
});

test("openrouter model openrouter/ministral-8b pricing is finite", () => {
  const m = OPENROUTER_MODELS.find((x) => x.id === 'openrouter/ministral-8b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.105);
});

test("openrouter model openrouter/deepseek-v3.2 pricing is finite", () => {
  const m = OPENROUTER_MODELS.find((x) => x.id === 'openrouter/deepseek-v3.2');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.2835);
});

test("openrouter model openrouter/deepseek-v3 pricing is finite", () => {
  const m = OPENROUTER_MODELS.find((x) => x.id === 'openrouter/deepseek-v3');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.2835);
});
