import assert from "node:assert/strict";
import test from "node:test";
import { MOONSHOT_MODELS } from "../catalog/moonshot";
import { moonshotAdapter, moonshotEstimate } from "../adapters/moonshot";

test("moonshot catalog is coherent", () => {
  assert.ok(MOONSHOT_MODELS.length >= 1);
  for (const m of MOONSHOT_MODELS) {
    assert.equal(m.provider, 'moonshot');
    assert.ok(m.id.includes('/'));
  }
});

test("moonshot adapter roundtrip", () => {
  const up = moonshotAdapter.toUpstream({ model: MOONSHOT_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] });
  assert.ok(up);
  const down = moonshotAdapter.fromUpstream({ id: 'x', choices: [{ message: { content: 'pong' } }], usage: { prompt_tokens: 3, completion_tokens: 1 } }, { model: MOONSHOT_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] }, 12);
  assert.equal(down.content, 'pong');
  assert.equal(down.usage.inputTokens, 3);
});

test("moonshot cost helper", () => {
  assert.equal(moonshotEstimate(1_000_000, 0, 1, 2), 1);
});

test("moonshot model moonshot/kimi-k2.5 pricing is finite", () => {
  const m = MOONSHOT_MODELS.find((x) => x.id === 'moonshot/kimi-k2.5');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.6);
});

test("moonshot model moonshot/kimi-k2 pricing is finite", () => {
  const m = MOONSHOT_MODELS.find((x) => x.id === 'moonshot/kimi-k2');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.6);
});
