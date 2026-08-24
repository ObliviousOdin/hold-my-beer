import assert from "node:assert/strict";
import test from "node:test";
import { ZAI_MODELS } from "../catalog/zai";
import { zaiAdapter, zaiEstimate } from "../adapters/zai";

test("zai catalog is coherent", () => {
  assert.ok(ZAI_MODELS.length >= 1);
  for (const m of ZAI_MODELS) {
    assert.equal(m.provider, 'zai');
    assert.ok(m.id.includes('/'));
  }
});

test("zai adapter roundtrip", () => {
  const up = zaiAdapter.toUpstream({ model: ZAI_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] });
  assert.ok(up);
  const down = zaiAdapter.fromUpstream({ id: 'x', choices: [{ message: { content: 'pong' } }], usage: { prompt_tokens: 3, completion_tokens: 1 } }, { model: ZAI_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] }, 12);
  assert.equal(down.content, 'pong');
  assert.equal(down.usage.inputTokens, 3);
});

test("zai cost helper", () => {
  assert.equal(zaiEstimate(1_000_000, 0, 1, 2), 1);
});

test("zai model zai/glm-4.5 pricing is finite", () => {
  const m = ZAI_MODELS.find((x) => x.id === 'zai/glm-4.5');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.6);
});

test("zai model zai/glm-4.6 pricing is finite", () => {
  const m = ZAI_MODELS.find((x) => x.id === 'zai/glm-4.6');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.5);
});

test("zai model zai/glm-4.5-air pricing is finite", () => {
  const m = ZAI_MODELS.find((x) => x.id === 'zai/glm-4.5-air');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.13);
});
