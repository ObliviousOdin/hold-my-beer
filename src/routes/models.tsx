import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/shell";
import { ALL_MODELS, MODEL_COUNT, PROVIDER_COUNT, PROVIDERS } from "@/gateway/catalog";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/models")({ component: ModelsPage });

function ModelsPage() {
  const [q, setQ] = useState("");
  const [prov, setProv] = useState("all");
  const rows = useMemo(() => {
    const l = q.toLowerCase();
    return ALL_MODELS.filter((m) => {
      if (prov !== "all" && m.provider !== prov) return false;
      if (!l) return true;
      return m.id.includes(l) || m.displayName.toLowerCase().includes(l) || m.family.toLowerCase().includes(l);
    }).slice(0, 120);
  }, [q, prov]);
  return (
    <MarketingShell>
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm uppercase tracking-[0.2em] text-muted">Catalog</p>
        <h1 className="font-display mt-2 text-5xl tracking-tight">
          {MODEL_COUNT} models · {PROVIDER_COUNT} providers
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          Rate card is first-class. Budgets reserve against these numbers. Route pools pin aliases, not vendor folklore.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search models"
            className="h-11 flex-1 rounded-md border border-border bg-surface px-3 text-sm"
          />
          <select
            value={prov}
            onChange={(e) => setProv(e.target.value)}
            className="h-11 rounded-md border border-border bg-surface px-3 text-sm"
          >
            <option value="all">All providers</option>
            {PROVIDERS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.displayName}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-surface text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Model</th>
                <th className="px-3 py-3 font-medium">Quality</th>
                <th className="px-3 py-3 font-medium">Context</th>
                <th className="px-3 py-3 font-medium">In / M</th>
                <th className="px-3 py-3 font-medium">Out / M</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m) => (
                <tr key={m.id} className="border-t border-border">
                  <td className="px-4 py-3">
                    <p>{m.displayName}</p>
                    <p className="font-mono text-xs text-subtle">{m.id}</p>
                  </td>
                  <td className="px-3 py-3 text-muted">{m.qualityClass}</td>
                  <td className="px-3 py-3 font-mono tabular-nums">{m.contextWindow.toLocaleString()}</td>
                  <td className="px-3 py-3 font-mono tabular-nums">${m.inputPerMillion}</td>
                  <td className="px-3 py-3 font-mono tabular-nums">${m.outputPerMillion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MarketingShell>
  );
}
