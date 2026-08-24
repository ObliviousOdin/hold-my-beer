import assert from "node:assert/strict";
import test from "node:test";
import { DEEPINFRA_MODELS } from "../catalog/deepinfra";
import { deepinfraAdapter, deepinfraEstimate } from "../adapters/deepinfra";

test("deepinfra catalog is coherent", () => {
  assert.ok(DEEPINFRA_MODELS.length >= 1);
  for (const m of DEEPINFRA_MODELS) {
    assert.equal(m.provider, 'deepinfra');
    assert.ok(m.id.includes('/'));
  }
});

test("deepinfra adapter roundtrip", () => {
  const up = deepinfraAdapter.toUpstream({ model: DEEPINFRA_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] });
  assert.ok(up);
  const down = deepinfraAdapter.fromUpstream({ id: 'x', choices: [{ message: { content: 'pong' } }], usage: { prompt_tokens: 3, completion_tokens: 1 } }, { model: DEEPINFRA_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] }, 12);
  assert.equal(down.content, 'pong');
  assert.equal(down.usage.inputTokens, 3);
});

test("deepinfra cost helper", () => {
  assert.equal(deepinfraEstimate(1_000_000, 0, 1, 2), 1);
});

test("deepinfra model deepinfra/llama-4-maverick pricing is finite", () => {
  const m = DEEPINFRA_MODELS.find((x) => x.id === 'deepinfra/llama-4-maverick');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.2025);
});

test("deepinfra model deepinfra/llama-4-scout pricing is finite", () => {
  const m = DEEPINFRA_MODELS.find((x) => x.id === 'deepinfra/llama-4-scout');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.135);
});

test("deepinfra model deepinfra/llama-3.3-70b pricing is finite", () => {
  const m = DEEPINFRA_MODELS.find((x) => x.id === 'deepinfra/llama-3.3-70b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.4425);
});

test("deepinfra model deepinfra/llama-3.1-8b pricing is finite", () => {
  const m = DEEPINFRA_MODELS.find((x) => x.id === 'deepinfra/llama-3.1-8b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.0375);
});

test("deepinfra model deepinfra/llama-3.1-405b pricing is finite", () => {
  const m = DEEPINFRA_MODELS.find((x) => x.id === 'deepinfra/llama-3.1-405b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 1.3425);
});

test("deepinfra model deepinfra/deepseek-v3.2 pricing is finite", () => {
  const m = DEEPINFRA_MODELS.find((x) => x.id === 'deepinfra/deepseek-v3.2');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.2025);
});

test("deepinfra model deepinfra/deepseek-v3 pricing is finite", () => {
  const m = DEEPINFRA_MODELS.find((x) => x.id === 'deepinfra/deepseek-v3');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.2025);
});

test("deepinfra model deepinfra/deepseek-r1 pricing is finite", () => {
  const m = DEEPINFRA_MODELS.find((x) => x.id === 'deepinfra/deepseek-r1');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.4125);
});

test("deepinfra model deepinfra/deepseek-coder-v2 pricing is finite", () => {
  const m = DEEPINFRA_MODELS.find((x) => x.id === 'deepinfra/deepseek-coder-v2');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.105);
});

test("deepinfra model deepinfra/qwen3-235b pricing is finite", () => {
  const m = DEEPINFRA_MODELS.find((x) => x.id === 'deepinfra/qwen3-235b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.15);
});

test("deepinfra model deepinfra/qwen3-32b pricing is finite", () => {
  const m = DEEPINFRA_MODELS.find((x) => x.id === 'deepinfra/qwen3-32b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.075);
});

test("deepinfra model deepinfra/qwen2.5-72b pricing is finite", () => {
  const m = DEEPINFRA_MODELS.find((x) => x.id === 'deepinfra/qwen2.5-72b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.09);
});
