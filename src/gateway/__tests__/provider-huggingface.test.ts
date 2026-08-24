import assert from "node:assert/strict";
import test from "node:test";
import { HUGGINGFACE_MODELS } from "../catalog/huggingface";
import { huggingfaceAdapter, huggingfaceEstimate } from "../adapters/huggingface";

test("huggingface catalog is coherent", () => {
  assert.ok(HUGGINGFACE_MODELS.length >= 1);
  for (const m of HUGGINGFACE_MODELS) {
    assert.equal(m.provider, 'huggingface');
    assert.ok(m.id.includes('/'));
  }
});

test("huggingface adapter roundtrip", () => {
  const up = huggingfaceAdapter.toUpstream({ model: HUGGINGFACE_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] });
  assert.ok(up);
  const down = huggingfaceAdapter.fromUpstream({ id: 'x', choices: [{ message: { content: 'pong' } }], usage: { prompt_tokens: 3, completion_tokens: 1 } }, { model: HUGGINGFACE_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] }, 12);
  assert.equal(down.content, 'pong');
  assert.equal(down.usage.inputTokens, 3);
});

test("huggingface cost helper", () => {
  assert.equal(huggingfaceEstimate(1_000_000, 0, 1, 2), 1);
});

test("huggingface model huggingface/llama-4-maverick pricing is finite", () => {
  const m = HUGGINGFACE_MODELS.find((x) => x.id === 'huggingface/llama-4-maverick');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.27);
});

test("huggingface model huggingface/llama-4-scout pricing is finite", () => {
  const m = HUGGINGFACE_MODELS.find((x) => x.id === 'huggingface/llama-4-scout');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.18);
});

test("huggingface model huggingface/llama-3.3-70b pricing is finite", () => {
  const m = HUGGINGFACE_MODELS.find((x) => x.id === 'huggingface/llama-3.3-70b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.59);
});

test("huggingface model huggingface/llama-3.1-8b pricing is finite", () => {
  const m = HUGGINGFACE_MODELS.find((x) => x.id === 'huggingface/llama-3.1-8b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.05);
});

test("huggingface model huggingface/llama-3.1-405b pricing is finite", () => {
  const m = HUGGINGFACE_MODELS.find((x) => x.id === 'huggingface/llama-3.1-405b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 1.79);
});

test("huggingface model huggingface/qwen3-235b pricing is finite", () => {
  const m = HUGGINGFACE_MODELS.find((x) => x.id === 'huggingface/qwen3-235b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.2);
});

test("huggingface model huggingface/qwen3-32b pricing is finite", () => {
  const m = HUGGINGFACE_MODELS.find((x) => x.id === 'huggingface/qwen3-32b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.1);
});

test("huggingface model huggingface/qwen2.5-72b pricing is finite", () => {
  const m = HUGGINGFACE_MODELS.find((x) => x.id === 'huggingface/qwen2.5-72b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.12);
});

test("huggingface model huggingface/qwen2.5-coder-32b pricing is finite", () => {
  const m = HUGGINGFACE_MODELS.find((x) => x.id === 'huggingface/qwen2.5-coder-32b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.08);
});

test("huggingface model huggingface/qwen-vl-max pricing is finite", () => {
  const m = HUGGINGFACE_MODELS.find((x) => x.id === 'huggingface/qwen-vl-max');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.8);
});
