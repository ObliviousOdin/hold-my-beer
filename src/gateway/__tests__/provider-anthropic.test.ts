import assert from "node:assert/strict";
import test from "node:test";
import { ANTHROPIC_MODELS } from "../catalog/anthropic";
import { anthropicAdapter, anthropicEstimate } from "../adapters/anthropic";

test("anthropic catalog is coherent", () => {
  assert.ok(ANTHROPIC_MODELS.length >= 1);
  for (const m of ANTHROPIC_MODELS) {
    assert.equal(m.provider, 'anthropic');
    assert.ok(m.id.includes('/'));
  }
});

test("anthropic adapter roundtrip", () => {
  const up = anthropicAdapter.toUpstream({ model: ANTHROPIC_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] });
  assert.ok(up);
  const down = anthropicAdapter.fromUpstream({ id: 'x', choices: [{ message: { content: 'pong' } }], usage: { prompt_tokens: 3, completion_tokens: 1 } }, { model: ANTHROPIC_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] }, 12);
  assert.equal(down.content, 'pong');
  assert.equal(down.usage.inputTokens, 3);
});

test("anthropic cost helper", () => {
  assert.equal(anthropicEstimate(1_000_000, 0, 1, 2), 1);
});

test("anthropic model anthropic/claude-opus-4.1 pricing is finite", () => {
  const m = ANTHROPIC_MODELS.find((x) => x.id === 'anthropic/claude-opus-4.1');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 15.0);
});

test("anthropic model anthropic/claude-opus-4 pricing is finite", () => {
  const m = ANTHROPIC_MODELS.find((x) => x.id === 'anthropic/claude-opus-4');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 15.0);
});

test("anthropic model anthropic/claude-sonnet-4.5 pricing is finite", () => {
  const m = ANTHROPIC_MODELS.find((x) => x.id === 'anthropic/claude-sonnet-4.5');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 3.0);
});

test("anthropic model anthropic/claude-sonnet-4 pricing is finite", () => {
  const m = ANTHROPIC_MODELS.find((x) => x.id === 'anthropic/claude-sonnet-4');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 3.0);
});

test("anthropic model anthropic/claude-haiku-4.5 pricing is finite", () => {
  const m = ANTHROPIC_MODELS.find((x) => x.id === 'anthropic/claude-haiku-4.5');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.8);
});

test("anthropic model anthropic/claude-3-5-sonnet pricing is finite", () => {
  const m = ANTHROPIC_MODELS.find((x) => x.id === 'anthropic/claude-3-5-sonnet');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 3.0);
});

test("anthropic model anthropic/claude-3-5-haiku pricing is finite", () => {
  const m = ANTHROPIC_MODELS.find((x) => x.id === 'anthropic/claude-3-5-haiku');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.8);
});

test("anthropic model anthropic/claude-3-opus pricing is finite", () => {
  const m = ANTHROPIC_MODELS.find((x) => x.id === 'anthropic/claude-3-opus');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 15.0);
});
