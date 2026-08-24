import assert from "node:assert/strict";
import test from "node:test";
import { AMAZON_MODELS } from "../catalog/amazon";
import { amazonAdapter, amazonEstimate } from "../adapters/amazon";

test("amazon catalog is coherent", () => {
  assert.ok(AMAZON_MODELS.length >= 1);
  for (const m of AMAZON_MODELS) {
    assert.equal(m.provider, 'amazon');
    assert.ok(m.id.includes('/'));
  }
});

test("amazon adapter roundtrip", () => {
  const up = amazonAdapter.toUpstream({ model: AMAZON_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] });
  assert.ok(up);
  const down = amazonAdapter.fromUpstream({ id: 'x', choices: [{ message: { content: 'pong' } }], usage: { prompt_tokens: 3, completion_tokens: 1 } }, { model: AMAZON_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] }, 12);
  assert.equal(down.content, 'pong');
  assert.equal(down.usage.inputTokens, 3);
});

test("amazon cost helper", () => {
  assert.equal(amazonEstimate(1_000_000, 0, 1, 2), 1);
});

test("amazon model amazon/llama-4-maverick pricing is finite", () => {
  const m = AMAZON_MODELS.find((x) => x.id === 'amazon/llama-4-maverick');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.3105);
});

test("amazon model amazon/llama-4-scout pricing is finite", () => {
  const m = AMAZON_MODELS.find((x) => x.id === 'amazon/llama-4-scout');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.207);
});

test("amazon model amazon/llama-3.3-70b pricing is finite", () => {
  const m = AMAZON_MODELS.find((x) => x.id === 'amazon/llama-3.3-70b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.6785);
});

test("amazon model amazon/llama-3.1-8b pricing is finite", () => {
  const m = AMAZON_MODELS.find((x) => x.id === 'amazon/llama-3.1-8b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.0575);
});

test("amazon model amazon/llama-3.1-405b pricing is finite", () => {
  const m = AMAZON_MODELS.find((x) => x.id === 'amazon/llama-3.1-405b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 2.0585);
});
