import assert from "node:assert/strict";
import test from "node:test";
import { NVIDIA_MODELS } from "../catalog/nvidia";
import { nvidiaAdapter, nvidiaEstimate } from "../adapters/nvidia";

test("nvidia catalog is coherent", () => {
  assert.ok(NVIDIA_MODELS.length >= 1);
  for (const m of NVIDIA_MODELS) {
    assert.equal(m.provider, 'nvidia');
    assert.ok(m.id.includes('/'));
  }
});

test("nvidia adapter roundtrip", () => {
  const up = nvidiaAdapter.toUpstream({ model: NVIDIA_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] });
  assert.ok(up);
  const down = nvidiaAdapter.fromUpstream({ id: 'x', choices: [{ message: { content: 'pong' } }], usage: { prompt_tokens: 3, completion_tokens: 1 } }, { model: NVIDIA_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] }, 12);
  assert.equal(down.content, 'pong');
  assert.equal(down.usage.inputTokens, 3);
});

test("nvidia cost helper", () => {
  assert.equal(nvidiaEstimate(1_000_000, 0, 1, 2), 1);
});

test("nvidia model nvidia/llama-4-maverick pricing is finite", () => {
  const m = NVIDIA_MODELS.find((x) => x.id === 'nvidia/llama-4-maverick');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.297);
});

test("nvidia model nvidia/llama-4-scout pricing is finite", () => {
  const m = NVIDIA_MODELS.find((x) => x.id === 'nvidia/llama-4-scout');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.198);
});

test("nvidia model nvidia/llama-3.3-70b pricing is finite", () => {
  const m = NVIDIA_MODELS.find((x) => x.id === 'nvidia/llama-3.3-70b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.649);
});

test("nvidia model nvidia/llama-3.1-8b pricing is finite", () => {
  const m = NVIDIA_MODELS.find((x) => x.id === 'nvidia/llama-3.1-8b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.055);
});

test("nvidia model nvidia/llama-3.1-405b pricing is finite", () => {
  const m = NVIDIA_MODELS.find((x) => x.id === 'nvidia/llama-3.1-405b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 1.969);
});
