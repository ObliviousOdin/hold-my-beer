import assert from "node:assert/strict";
import test from "node:test";
import { OPENAI_MODELS } from "../catalog/openai";
import { openaiAdapter, openaiEstimate } from "../adapters/openai";

test("openai catalog is coherent", () => {
  assert.ok(OPENAI_MODELS.length >= 1);
  for (const m of OPENAI_MODELS) {
    assert.equal(m.provider, 'openai');
    assert.ok(m.id.includes('/'));
  }
});

test("openai adapter roundtrip", () => {
  const up = openaiAdapter.toUpstream({ model: OPENAI_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] });
  assert.ok(up);
  const down = openaiAdapter.fromUpstream({ id: 'x', choices: [{ message: { content: 'pong' } }], usage: { prompt_tokens: 3, completion_tokens: 1 } }, { model: OPENAI_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] }, 12);
  assert.equal(down.content, 'pong');
  assert.equal(down.usage.inputTokens, 3);
});

test("openai cost helper", () => {
  assert.equal(openaiEstimate(1_000_000, 0, 1, 2), 1);
});

test("openai model openai/gpt-4o pricing is finite", () => {
  const m = OPENAI_MODELS.find((x) => x.id === 'openai/gpt-4o');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 2.5);
});

test("openai model openai/gpt-4o-mini pricing is finite", () => {
  const m = OPENAI_MODELS.find((x) => x.id === 'openai/gpt-4o-mini');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.15);
});

test("openai model openai/gpt-4.1 pricing is finite", () => {
  const m = OPENAI_MODELS.find((x) => x.id === 'openai/gpt-4.1');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 2.0);
});

test("openai model openai/gpt-4.1-mini pricing is finite", () => {
  const m = OPENAI_MODELS.find((x) => x.id === 'openai/gpt-4.1-mini');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.4);
});

test("openai model openai/gpt-4.1-nano pricing is finite", () => {
  const m = OPENAI_MODELS.find((x) => x.id === 'openai/gpt-4.1-nano');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.1);
});

test("openai model openai/gpt-5 pricing is finite", () => {
  const m = OPENAI_MODELS.find((x) => x.id === 'openai/gpt-5');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 5.0);
});

test("openai model openai/gpt-5-mini pricing is finite", () => {
  const m = OPENAI_MODELS.find((x) => x.id === 'openai/gpt-5-mini');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.4);
});

test("openai model openai/gpt-5-nano pricing is finite", () => {
  const m = OPENAI_MODELS.find((x) => x.id === 'openai/gpt-5-nano');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.1);
});

test("openai model openai/gpt-5-pro pricing is finite", () => {
  const m = OPENAI_MODELS.find((x) => x.id === 'openai/gpt-5-pro');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 15.0);
});

test("openai model openai/o3 pricing is finite", () => {
  const m = OPENAI_MODELS.find((x) => x.id === 'openai/o3');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 10.0);
});

test("openai model openai/o3-mini pricing is finite", () => {
  const m = OPENAI_MODELS.find((x) => x.id === 'openai/o3-mini');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 1.1);
});

test("openai model openai/o4-mini pricing is finite", () => {
  const m = OPENAI_MODELS.find((x) => x.id === 'openai/o4-mini');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 1.1);
});
