import assert from "node:assert/strict";
import test from "node:test";
import { BEDROCK_MODELS } from "../catalog/bedrock";
import { bedrockAdapter, bedrockEstimate } from "../adapters/bedrock";

test("bedrock catalog is coherent", () => {
  assert.ok(BEDROCK_MODELS.length >= 1);
  for (const m of BEDROCK_MODELS) {
    assert.equal(m.provider, 'bedrock');
    assert.ok(m.id.includes('/'));
  }
});

test("bedrock adapter roundtrip", () => {
  const up = bedrockAdapter.toUpstream({ model: BEDROCK_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] });
  assert.ok(up);
  const down = bedrockAdapter.fromUpstream({ id: 'x', choices: [{ message: { content: 'pong' } }], usage: { prompt_tokens: 3, completion_tokens: 1 } }, { model: BEDROCK_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] }, 12);
  assert.equal(down.content, 'pong');
  assert.equal(down.usage.inputTokens, 3);
});

test("bedrock cost helper", () => {
  assert.equal(bedrockEstimate(1_000_000, 0, 1, 2), 1);
});

test("bedrock model bedrock/llama-4-maverick pricing is finite", () => {
  const m = BEDROCK_MODELS.find((x) => x.id === 'bedrock/llama-4-maverick');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.3105);
});

test("bedrock model bedrock/llama-4-scout pricing is finite", () => {
  const m = BEDROCK_MODELS.find((x) => x.id === 'bedrock/llama-4-scout');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.207);
});

test("bedrock model bedrock/llama-3.3-70b pricing is finite", () => {
  const m = BEDROCK_MODELS.find((x) => x.id === 'bedrock/llama-3.3-70b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.6785);
});

test("bedrock model bedrock/llama-3.1-8b pricing is finite", () => {
  const m = BEDROCK_MODELS.find((x) => x.id === 'bedrock/llama-3.1-8b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.0575);
});

test("bedrock model bedrock/llama-3.1-405b pricing is finite", () => {
  const m = BEDROCK_MODELS.find((x) => x.id === 'bedrock/llama-3.1-405b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 2.0585);
});
