import assert from "node:assert/strict";
import test from "node:test";
import { ALIBABA_MODELS } from "../catalog/alibaba";
import { alibabaAdapter, alibabaEstimate } from "../adapters/alibaba";

test("alibaba catalog is coherent", () => {
  assert.ok(ALIBABA_MODELS.length >= 1);
  for (const m of ALIBABA_MODELS) {
    assert.equal(m.provider, 'alibaba');
    assert.ok(m.id.includes('/'));
  }
});

test("alibaba adapter roundtrip", () => {
  const up = alibabaAdapter.toUpstream({ model: ALIBABA_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] });
  assert.ok(up);
  const down = alibabaAdapter.fromUpstream({ id: 'x', choices: [{ message: { content: 'pong' } }], usage: { prompt_tokens: 3, completion_tokens: 1 } }, { model: ALIBABA_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] }, 12);
  assert.equal(down.content, 'pong');
  assert.equal(down.usage.inputTokens, 3);
});

test("alibaba cost helper", () => {
  assert.equal(alibabaEstimate(1_000_000, 0, 1, 2), 1);
});

test("alibaba model alibaba/qwen3-235b pricing is finite", () => {
  const m = ALIBABA_MODELS.find((x) => x.id === 'alibaba/qwen3-235b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.2);
});

test("alibaba model alibaba/qwen3-32b pricing is finite", () => {
  const m = ALIBABA_MODELS.find((x) => x.id === 'alibaba/qwen3-32b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.1);
});

test("alibaba model alibaba/qwen2.5-72b pricing is finite", () => {
  const m = ALIBABA_MODELS.find((x) => x.id === 'alibaba/qwen2.5-72b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.12);
});

test("alibaba model alibaba/qwen2.5-coder-32b pricing is finite", () => {
  const m = ALIBABA_MODELS.find((x) => x.id === 'alibaba/qwen2.5-coder-32b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.08);
});

test("alibaba model alibaba/qwen-vl-max pricing is finite", () => {
  const m = ALIBABA_MODELS.find((x) => x.id === 'alibaba/qwen-vl-max');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.8);
});
