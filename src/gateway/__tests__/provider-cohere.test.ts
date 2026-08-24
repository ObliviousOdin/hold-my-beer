import assert from "node:assert/strict";
import test from "node:test";
import { COHERE_MODELS } from "../catalog/cohere";
import { cohereAdapter, cohereEstimate } from "../adapters/cohere";

test("cohere catalog is coherent", () => {
  assert.ok(COHERE_MODELS.length >= 1);
  for (const m of COHERE_MODELS) {
    assert.equal(m.provider, 'cohere');
    assert.ok(m.id.includes('/'));
  }
});

test("cohere adapter roundtrip", () => {
  const up = cohereAdapter.toUpstream({ model: COHERE_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] });
  assert.ok(up);
  const down = cohereAdapter.fromUpstream({ id: 'x', choices: [{ message: { content: 'pong' } }], usage: { prompt_tokens: 3, completion_tokens: 1 } }, { model: COHERE_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] }, 12);
  assert.equal(down.content, 'pong');
  assert.equal(down.usage.inputTokens, 3);
});

test("cohere cost helper", () => {
  assert.equal(cohereEstimate(1_000_000, 0, 1, 2), 1);
});

test("cohere model cohere/command-a pricing is finite", () => {
  const m = COHERE_MODELS.find((x) => x.id === 'cohere/command-a');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 2.5);
});

test("cohere model cohere/command-r-plus pricing is finite", () => {
  const m = COHERE_MODELS.find((x) => x.id === 'cohere/command-r-plus');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 2.5);
});

test("cohere model cohere/command-r pricing is finite", () => {
  const m = COHERE_MODELS.find((x) => x.id === 'cohere/command-r');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.15);
});

test("cohere model cohere/embed-v4 pricing is finite", () => {
  const m = COHERE_MODELS.find((x) => x.id === 'cohere/embed-v4');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.12);
});

test("cohere model cohere/rerank-v3.5 pricing is finite", () => {
  const m = COHERE_MODELS.find((x) => x.id === 'cohere/rerank-v3.5');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 2.0);
});
