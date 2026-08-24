import assert from "node:assert/strict";
import test from "node:test";
import { GOOGLE_MODELS } from "../catalog/google";
import { googleAdapter, googleEstimate } from "../adapters/google";

test("google catalog is coherent", () => {
  assert.ok(GOOGLE_MODELS.length >= 1);
  for (const m of GOOGLE_MODELS) {
    assert.equal(m.provider, 'google');
    assert.ok(m.id.includes('/'));
  }
});

test("google adapter roundtrip", () => {
  const up = googleAdapter.toUpstream({ model: GOOGLE_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] });
  assert.ok(up);
  const down = googleAdapter.fromUpstream({ id: 'x', choices: [{ message: { content: 'pong' } }], usage: { prompt_tokens: 3, completion_tokens: 1 } }, { model: GOOGLE_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] }, 12);
  assert.equal(down.content, 'pong');
  assert.equal(down.usage.inputTokens, 3);
});

test("google cost helper", () => {
  assert.equal(googleEstimate(1_000_000, 0, 1, 2), 1);
});

test("google model google/gemini-2.5-pro pricing is finite", () => {
  const m = GOOGLE_MODELS.find((x) => x.id === 'google/gemini-2.5-pro');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 1.25);
});

test("google model google/gemini-2.5-flash pricing is finite", () => {
  const m = GOOGLE_MODELS.find((x) => x.id === 'google/gemini-2.5-flash');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.15);
});

test("google model google/gemini-2.5-flash-lite pricing is finite", () => {
  const m = GOOGLE_MODELS.find((x) => x.id === 'google/gemini-2.5-flash-lite');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.07);
});

test("google model google/gemini-2.0-flash pricing is finite", () => {
  const m = GOOGLE_MODELS.find((x) => x.id === 'google/gemini-2.0-flash');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.1);
});

test("google model google/gemini-1.5-pro pricing is finite", () => {
  const m = GOOGLE_MODELS.find((x) => x.id === 'google/gemini-1.5-pro');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 1.25);
});

test("google model google/gemma-3-27b pricing is finite", () => {
  const m = GOOGLE_MODELS.find((x) => x.id === 'google/gemma-3-27b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.09);
});

test("google model google/gemma-3-12b pricing is finite", () => {
  const m = GOOGLE_MODELS.find((x) => x.id === 'google/gemma-3-12b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.05);
});

test("google model google/gemini-embedding-001 pricing is finite", () => {
  const m = GOOGLE_MODELS.find((x) => x.id === 'google/gemini-embedding-001');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.15);
});
