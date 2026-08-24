import assert from "node:assert/strict";
import test from "node:test";
import { PERPLEXITY_MODELS } from "../catalog/perplexity";
import { perplexityAdapter, perplexityEstimate } from "../adapters/perplexity";

test("perplexity catalog is coherent", () => {
  assert.ok(PERPLEXITY_MODELS.length >= 1);
  for (const m of PERPLEXITY_MODELS) {
    assert.equal(m.provider, 'perplexity');
    assert.ok(m.id.includes('/'));
  }
});

test("perplexity adapter roundtrip", () => {
  const up = perplexityAdapter.toUpstream({ model: PERPLEXITY_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] });
  assert.ok(up);
  const down = perplexityAdapter.fromUpstream({ id: 'x', choices: [{ message: { content: 'pong' } }], usage: { prompt_tokens: 3, completion_tokens: 1 } }, { model: PERPLEXITY_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] }, 12);
  assert.equal(down.content, 'pong');
  assert.equal(down.usage.inputTokens, 3);
});

test("perplexity cost helper", () => {
  assert.equal(perplexityEstimate(1_000_000, 0, 1, 2), 1);
});

test("perplexity model perplexity/sonar-pro pricing is finite", () => {
  const m = PERPLEXITY_MODELS.find((x) => x.id === 'perplexity/sonar-pro');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 3.0);
});

test("perplexity model perplexity/sonar pricing is finite", () => {
  const m = PERPLEXITY_MODELS.find((x) => x.id === 'perplexity/sonar');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 1.0);
});

test("perplexity model perplexity/sonar-reasoning-pro pricing is finite", () => {
  const m = PERPLEXITY_MODELS.find((x) => x.id === 'perplexity/sonar-reasoning-pro');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 2.0);
});
