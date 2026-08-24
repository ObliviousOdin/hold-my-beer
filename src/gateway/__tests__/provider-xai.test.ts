import assert from "node:assert/strict";
import test from "node:test";
import { XAI_MODELS } from "../catalog/xai";
import { xaiAdapter, xaiEstimate } from "../adapters/xai";

test("xai catalog is coherent", () => {
  assert.ok(XAI_MODELS.length >= 1);
  for (const m of XAI_MODELS) {
    assert.equal(m.provider, 'xai');
    assert.ok(m.id.includes('/'));
  }
});

test("xai adapter roundtrip", () => {
  const up = xaiAdapter.toUpstream({ model: XAI_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] });
  assert.ok(up);
  const down = xaiAdapter.fromUpstream({ id: 'x', choices: [{ message: { content: 'pong' } }], usage: { prompt_tokens: 3, completion_tokens: 1 } }, { model: XAI_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] }, 12);
  assert.equal(down.content, 'pong');
  assert.equal(down.usage.inputTokens, 3);
});

test("xai cost helper", () => {
  assert.equal(xaiEstimate(1_000_000, 0, 1, 2), 1);
});

test("xai model xai/grok-4.5 pricing is finite", () => {
  const m = XAI_MODELS.find((x) => x.id === 'xai/grok-4.5');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 3.0);
});

test("xai model xai/grok-4 pricing is finite", () => {
  const m = XAI_MODELS.find((x) => x.id === 'xai/grok-4');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 3.0);
});

test("xai model xai/grok-3 pricing is finite", () => {
  const m = XAI_MODELS.find((x) => x.id === 'xai/grok-3');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 3.0);
});

test("xai model xai/grok-3-mini pricing is finite", () => {
  const m = XAI_MODELS.find((x) => x.id === 'xai/grok-3-mini');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.3);
});

test("xai model xai/grok-2 pricing is finite", () => {
  const m = XAI_MODELS.find((x) => x.id === 'xai/grok-2');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 2.0);
});

test("xai model xai/grok-2-vision pricing is finite", () => {
  const m = XAI_MODELS.find((x) => x.id === 'xai/grok-2-vision');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 2.0);
});
