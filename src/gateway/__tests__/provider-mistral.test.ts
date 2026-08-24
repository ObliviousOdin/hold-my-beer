import assert from "node:assert/strict";
import test from "node:test";
import { MISTRAL_MODELS } from "../catalog/mistral";
import { mistralAdapter, mistralEstimate } from "../adapters/mistral";

test("mistral catalog is coherent", () => {
  assert.ok(MISTRAL_MODELS.length >= 1);
  for (const m of MISTRAL_MODELS) {
    assert.equal(m.provider, 'mistral');
    assert.ok(m.id.includes('/'));
  }
});

test("mistral adapter roundtrip", () => {
  const up = mistralAdapter.toUpstream({ model: MISTRAL_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] });
  assert.ok(up);
  const down = mistralAdapter.fromUpstream({ id: 'x', choices: [{ message: { content: 'pong' } }], usage: { prompt_tokens: 3, completion_tokens: 1 } }, { model: MISTRAL_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] }, 12);
  assert.equal(down.content, 'pong');
  assert.equal(down.usage.inputTokens, 3);
});

test("mistral cost helper", () => {
  assert.equal(mistralEstimate(1_000_000, 0, 1, 2), 1);
});

test("mistral model mistral/mistral-large-2411 pricing is finite", () => {
  const m = MISTRAL_MODELS.find((x) => x.id === 'mistral/mistral-large-2411');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 2.0);
});

test("mistral model mistral/mistral-small-3.1 pricing is finite", () => {
  const m = MISTRAL_MODELS.find((x) => x.id === 'mistral/mistral-small-3.1');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.1);
});

test("mistral model mistral/codestral-2501 pricing is finite", () => {
  const m = MISTRAL_MODELS.find((x) => x.id === 'mistral/codestral-2501');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.3);
});

test("mistral model mistral/pixtral-large pricing is finite", () => {
  const m = MISTRAL_MODELS.find((x) => x.id === 'mistral/pixtral-large');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 2.0);
});

test("mistral model mistral/ministral-8b pricing is finite", () => {
  const m = MISTRAL_MODELS.find((x) => x.id === 'mistral/ministral-8b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.1);
});
