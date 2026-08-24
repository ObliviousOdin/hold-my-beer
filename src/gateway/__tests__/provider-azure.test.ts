import assert from "node:assert/strict";
import test from "node:test";
import { AZURE_MODELS } from "../catalog/azure";
import { azureAdapter, azureEstimate } from "../adapters/azure";

test("azure catalog is coherent", () => {
  assert.ok(AZURE_MODELS.length >= 1);
  for (const m of AZURE_MODELS) {
    assert.equal(m.provider, 'azure');
    assert.ok(m.id.includes('/'));
  }
});

test("azure adapter roundtrip", () => {
  const up = azureAdapter.toUpstream({ model: AZURE_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] });
  assert.ok(up);
  const down = azureAdapter.fromUpstream({ id: 'x', choices: [{ message: { content: 'pong' } }], usage: { prompt_tokens: 3, completion_tokens: 1 } }, { model: AZURE_MODELS[0].id, messages: [{ role: 'user', content: 'ping' }] }, 12);
  assert.equal(down.content, 'pong');
  assert.equal(down.usage.inputTokens, 3);
});

test("azure cost helper", () => {
  assert.equal(azureEstimate(1_000_000, 0, 1, 2), 1);
});

test("azure model azure/llama-4-maverick pricing is finite", () => {
  const m = AZURE_MODELS.find((x) => x.id === 'azure/llama-4-maverick');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.324);
});

test("azure model azure/llama-4-scout pricing is finite", () => {
  const m = AZURE_MODELS.find((x) => x.id === 'azure/llama-4-scout');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.216);
});

test("azure model azure/llama-3.3-70b pricing is finite", () => {
  const m = AZURE_MODELS.find((x) => x.id === 'azure/llama-3.3-70b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.708);
});

test("azure model azure/llama-3.1-8b pricing is finite", () => {
  const m = AZURE_MODELS.find((x) => x.id === 'azure/llama-3.1-8b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.06);
});

test("azure model azure/llama-3.1-405b pricing is finite", () => {
  const m = AZURE_MODELS.find((x) => x.id === 'azure/llama-3.1-405b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 2.148);
});

test("azure model azure/mistral-large-2411 pricing is finite", () => {
  const m = AZURE_MODELS.find((x) => x.id === 'azure/mistral-large-2411');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 2.4);
});

test("azure model azure/mistral-small-3.1 pricing is finite", () => {
  const m = AZURE_MODELS.find((x) => x.id === 'azure/mistral-small-3.1');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.12);
});

test("azure model azure/codestral-2501 pricing is finite", () => {
  const m = AZURE_MODELS.find((x) => x.id === 'azure/codestral-2501');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.36);
});

test("azure model azure/pixtral-large pricing is finite", () => {
  const m = AZURE_MODELS.find((x) => x.id === 'azure/pixtral-large');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 2.4);
});

test("azure model azure/ministral-8b pricing is finite", () => {
  const m = AZURE_MODELS.find((x) => x.id === 'azure/ministral-8b');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.12);
});

test("azure model azure/gpt-4o pricing is finite", () => {
  const m = AZURE_MODELS.find((x) => x.id === 'azure/gpt-4o');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 2.5);
});

test("azure model azure/gpt-4o-mini pricing is finite", () => {
  const m = AZURE_MODELS.find((x) => x.id === 'azure/gpt-4o-mini');
  assert.ok(m);
  assert.equal(m?.inputPerMillion, 0.15);
});
