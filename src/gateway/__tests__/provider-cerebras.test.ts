import assert from "node:assert/strict";
import test from "node:test";
import { CEREBRAS_MODELS } from "../catalog/cerebras";
import { cerebrasAdapter, cerebrasEstimate } from "../adapters/cerebras";

test("cerebras catalog is coherent", () => {
  assert.ok(CEREBRAS_MODELS.length >= 1);
  for (const m of CEREBRAS_MODELS) {
    assert.equal(m.provider, 'cerebras');
    assert.ok(m.id.includes('/'));
  }
});

test("cerebras adapter roundtrip", () => {
  const up = cerebrasAdapter.toUpstream({ model: CEREBRAS_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] });
  assert.ok(up);
  const down = cerebrasAdapter.fromUpstream({ id: 'x', choices: [{ message: { content: 'pong' } }], usage: { prompt_tokens: 3, completion_tokens: 1 } }, { model: CEREBRAS_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] }, 12);
  assert.equal(down.content, 'pong');
  assert.equal(down.usage.inputTokens, 3);
});

test("cerebras cost helper", () => {
  assert.equal(cerebrasEstimate(1_000_000, 0, 1, 2), 1);
});

test("cerebras model cerebras/llama-4-maverick pricing is finite", () => {
  const m = CEREBRAS_MODELS.find((x) => x.id === 'cerebras/llama-4-maverick');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.216);
});

test("cerebras model cerebras/llama-4-scout pricing is finite", () => {
  const m = CEREBRAS_MODELS.find((x) => x.id === 'cerebras/llama-4-scout');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.144);
});

test("cerebras model cerebras/llama-3.3-70b pricing is finite", () => {
  const m = CEREBRAS_MODELS.find((x) => x.id === 'cerebras/llama-3.3-70b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.472);
});

test("cerebras model cerebras/llama-3.1-8b pricing is finite", () => {
  const m = CEREBRAS_MODELS.find((x) => x.id === 'cerebras/llama-3.1-8b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.04);
});

test("cerebras model cerebras/llama-3.1-405b pricing is finite", () => {
  const m = CEREBRAS_MODELS.find((x) => x.id === 'cerebras/llama-3.1-405b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 1.432);
});
