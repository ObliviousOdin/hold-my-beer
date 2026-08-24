import assert from "node:assert/strict";
import test from "node:test";
import { SAMBANOVA_MODELS } from "../catalog/sambanova";
import { sambanovaAdapter, sambanovaEstimate } from "../adapters/sambanova";

test("sambanova catalog is coherent", () => {
  assert.ok(SAMBANOVA_MODELS.length >= 1);
  for (const m of SAMBANOVA_MODELS) {
    assert.equal(m.provider, 'sambanova');
    assert.ok(m.id.includes('/'));
  }
});

test("sambanova adapter roundtrip", () => {
  const up = sambanovaAdapter.toUpstream({ model: SAMBANOVA_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] });
  assert.ok(up);
  const down = sambanovaAdapter.fromUpstream({ id: 'x', choices: [{ message: { content: 'pong' } }], usage: { prompt_tokens: 3, completion_tokens: 1 } }, { model: SAMBANOVA_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] }, 12);
  assert.equal(down.content, 'pong');
  assert.equal(down.usage.inputTokens, 3);
});

test("sambanova cost helper", () => {
  assert.equal(sambanovaEstimate(1_000_000, 0, 1, 2), 1);
});

test("sambanova model sambanova/llama-4-maverick pricing is finite", () => {
  const m = SAMBANOVA_MODELS.find((x) => x.id === 'sambanova/llama-4-maverick');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.2295);
});

test("sambanova model sambanova/llama-4-scout pricing is finite", () => {
  const m = SAMBANOVA_MODELS.find((x) => x.id === 'sambanova/llama-4-scout');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.153);
});

test("sambanova model sambanova/llama-3.3-70b pricing is finite", () => {
  const m = SAMBANOVA_MODELS.find((x) => x.id === 'sambanova/llama-3.3-70b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.5015);
});

test("sambanova model sambanova/llama-3.1-8b pricing is finite", () => {
  const m = SAMBANOVA_MODELS.find((x) => x.id === 'sambanova/llama-3.1-8b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.0425);
});

test("sambanova model sambanova/llama-3.1-405b pricing is finite", () => {
  const m = SAMBANOVA_MODELS.find((x) => x.id === 'sambanova/llama-3.1-405b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 1.5215);
});
