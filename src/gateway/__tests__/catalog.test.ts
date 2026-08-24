import assert from "node:assert/strict";
import test from "node:test";
import { ALL_MODELS, getModel, MODEL_COUNT, PROVIDERS } from "../catalog";
import { costUsd, estimateTokens } from "../tokenizer";
import { rateCard } from "../finops/rates";
import { REASON_DOCS } from "../evidence/codes";
import { POLICY_PACKS } from "../policy";

test("catalog is populated", () => {
  assert.ok(MODEL_COUNT > 80);
  assert.ok(PROVIDERS.length >= 20);
  assert.ok(getModel(ALL_MODELS[0].id));
});

test("every model has a positive context window and non-negative price", () => {
  for (const m of ALL_MODELS) {
    assert.ok(m.contextWindow > 0, m.id);
    assert.ok(m.inputPerMillion >= 0, m.id);
    assert.ok(m.outputPerMillion >= 0, m.id);
    assert.ok(m.displayName.length > 1, m.id);
  }
});

test("tokenizer is monotonic", () => {
  const a = estimateTokens("hello");
  const b = estimateTokens("hello hello hello hello");
  assert.ok(b > a);
});

test("cost math", () => {
  const usd = costUsd(1_000_000, 1_000_000, 1, 2);
  assert.equal(usd, 3);
});

test("rate card rows match catalog", () => {
  assert.equal(rateCard().length, ALL_MODELS.length);
});

test("reason docs exist", () => {
  assert.ok(REASON_DOCS.length > 30);
});

test("policy packs exist", () => {
  assert.ok(POLICY_PACKS.length >= 8);
});
