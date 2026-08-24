import assert from "node:assert/strict";
import test from "node:test";
import { DEEPSEEK_MODELS } from "../catalog/deepseek";
import { deepseekAdapter, deepseekEstimate } from "../adapters/deepseek";

test("deepseek catalog is coherent", () => {
  assert.ok(DEEPSEEK_MODELS.length >= 1);
  for (const m of DEEPSEEK_MODELS) {
    assert.equal(m.provider, 'deepseek');
    assert.ok(m.id.includes('/'));
  }
});

test("deepseek adapter roundtrip", () => {
  const up = deepseekAdapter.toUpstream({ model: DEEPSEEK_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] });
  assert.ok(up);
  const down = deepseekAdapter.fromUpstream({ id: 'x', choices: [{ message: { content: 'pong' } }], usage: { prompt_tokens: 3, completion_tokens: 1 } }, { model: DEEPSEEK_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] }, 12);
  assert.equal(down.content, 'pong');
  assert.equal(down.usage.inputTokens, 3);
});

test("deepseek cost helper", () => {
  assert.equal(deepseekEstimate(1_000_000, 0, 1, 2), 1);
});

test("deepseek model deepseek/deepseek-v3.2 pricing is finite", () => {
  const m = DEEPSEEK_MODELS.find((x) => x.id === 'deepseek/deepseek-v3.2');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.27);
});

test("deepseek model deepseek/deepseek-v3 pricing is finite", () => {
  const m = DEEPSEEK_MODELS.find((x) => x.id === 'deepseek/deepseek-v3');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.27);
});

test("deepseek model deepseek/deepseek-r1 pricing is finite", () => {
  const m = DEEPSEEK_MODELS.find((x) => x.id === 'deepseek/deepseek-r1');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.55);
});

test("deepseek model deepseek/deepseek-coder-v2 pricing is finite", () => {
  const m = DEEPSEEK_MODELS.find((x) => x.id === 'deepseek/deepseek-coder-v2');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.14);
});
