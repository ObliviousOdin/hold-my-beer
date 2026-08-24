import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/shell";
import { Check, Minus } from "lucide-react";

export const Route = createFileRoute("/compare")({ component: Compare });

const COLS = ["Hold My Beer", "AI Gateway HQ", "LiteLLM", "Portkey", "Helicone"] as const;

const ROWS: Array<[string, boolean[], string]> = [
  ["Hard pre-spend budgets", [true, true, false, true, false], "Reserve before the provider is called."],
  ["Published pricing", [true, false, true, true, true], "AIGHQ never put a number on the site."],
  ["Open source core", [true, false, true, true, true], "MIT, TypeScript, you can read the engine."],
  ["OpenAI-compatible endpoint", [true, true, true, true, true], "Applications do not care who is upstream."],
  ["Cost-aware routing", [true, true, true, true, false], "Least-cost after policy and health."],
  ["Observe / shadow / enforce", [true, true, false, true, false], "Reason-coded packs, not a hidden ACL."],
  ["Evidence without prompt storage", [true, true, false, false, false], "The thing AIGHQ got right."],
  ["Virtual keys", [true, true, true, true, true], "Scoped, revocable, attributed."],
  ["200+ model catalog", [true, false, true, true, true], "We ship the rate card, not a screenshot."],
  ["Interactive test lab", [true, true, false, false, false], "Simulators plus a capped live Grok path."],
  ["Semantic cache hooks", [true, false, false, true, true], "Exact cache today, embeddings-ready."],
  ["Beautiful control plane", [true, false, false, true, true], "Operators should want to open it."],
];

function Compare() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm uppercase tracking-[0.2em] text-muted">Compare</p>
        <h1 className="font-display mt-2 max-w-3xl text-5xl tracking-tight">The field, without the brochure fog.</h1>
        <p className="mt-4 max-w-2xl text-muted">
          We learned from LiteLLM’s provider graph, Portkey’s guardrails, Helicone’s traces, Bifrost’s virtual keys, and AI Gateway HQ’s
          “don’t archive prompts” stance. Then we shipped pricing, a working taproom, and an engine you can read.
        </p>
        <div className="mt-10 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-surface text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Capability</th>
                {COLS.map((c) => (
                  <th key={c} className="px-3 py-3 font-medium">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r[0]} className="border-t border-border">
                  <td className="px-4 py-3">
                    <p>{r[0]}</p>
                    <p className="text-xs text-subtle">{r[2]}</p>
                  </td>
                  {r[1].map((v, i) => (
                    <td key={COLS[i]} className="px-3 py-3">
                      {v ? <Check className="size-4 text-ok" /> : <Minus className="size-4 text-subtle" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MarketingShell>
  );
}
