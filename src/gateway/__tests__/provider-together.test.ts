import assert from "node:assert/strict";
import test from "node:test";
import { TOGETHER_MODELS } from "../catalog/together";
import { togetherAdapter, togetherEstimate } from "../adapters/together";

test("together catalog is coherent", () => {
  assert.ok(TOGETHER_MODELS.length >= 1);
  for (const m of TOGETHER_MODELS) {
    assert.equal(m.provider, 'together');
    assert.ok(m.id.includes('/'));
  }
});

test("together adapter roundtrip", () => {
  const up = togetherAdapter.toUpstream({ model: TOGETHER_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] });
  assert.ok(up);
  const down = togetherAdapter.fromUpstream({ id: 'x', choices: [{ message: { content: 'pong' } }], usage: { prompt_tokens: 3, completion_tokens: 1 } }, { model: TOGETHER_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] }, 12);
  assert.equal(down.content, 'pong');
  assert.equal(down.usage.inputTokens, 3);
});

test("together cost helper", () => {
  assert.equal(togetherEstimate(1_000_000, 0, 1, 2), 1);
});

test("together model together/llama-4-maverick pricing is finite", () => {
  const m = TOGETHER_MODELS.find((x) => x.id === 'together/llama-4-maverick');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.27);
});

test("together model together/llama-4-scout pricing is finite", () => {
  const m = TOGETHER_MODELS.find((x) => x.id === 'together/llama-4-scout');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.18);
});

test("together model together/llama-3.3-70b pricing is finite", () => {
  const m = TOGETHER_MODELS.find((x) => x.id === 'together/llama-3.3-70b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.59);
});

test("together model together/llama-3.1-8b pricing is finite", () => {
  const m = TOGETHER_MODELS.find((x) => x.id === 'together/llama-3.1-8b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.05);
});

test("together model together/llama-3.1-405b pricing is finite", () => {
  const m = TOGETHER_MODELS.find((x) => x.id === 'together/llama-3.1-405b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 1.79);
});

test("together model together/mistral-large-2411 pricing is finite", () => {
  const m = TOGETHER_MODELS.find((x) => x.id === 'together/mistral-large-2411');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 2.0);
});

test("together model together/mistral-small-3.1 pricing is finite", () => {
  const m = TOGETHER_MODELS.find((x) => x.id === 'together/mistral-small-3.1');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.1);
});

test("together model together/codestral-2501 pricing is finite", () => {
  const m = TOGETHER_MODELS.find((x) => x.id === 'together/codestral-2501');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.3);
});

test("together model together/pixtral-large pricing is finite", () => {
  const m = TOGETHER_MODELS.find((x) => x.id === 'together/pixtral-large');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 2.0);
});

test("together model together/ministral-8b pricing is finite", () => {
  const m = TOGETHER_MODELS.find((x) => x.id === 'together/ministral-8b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.1);
});

test("together model together/deepseek-v3.2 pricing is finite", () => {
  const m = TOGETHER_MODELS.find((x) => x.id === 'together/deepseek-v3.2');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.27);
});

test("together model together/deepseek-v3 pricing is finite", () => {
  const m = TOGETHER_MODELS.find((x) => x.id === 'together/deepseek-v3');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.27);
});
