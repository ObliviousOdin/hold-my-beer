import { createFileRoute } from "@tanstack/react-router";
import { ConsoleShell } from "@/components/console/shell";
import { Badge } from "@/components/ui/badge";
import { useGateway } from "@/gateway/store";
import { usd } from "@/lib/format";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/console/evidence")({ component: Evidence });

function Evidence() {
  const evidence = useGateway((s) => s.evidence);
  const [q, setQ] = useState("");
  const rows = useMemo(() => {
    const l = q.toLowerCase();
    return evidence.filter((e) => {
      if (!l) return true;
      return (
        e.alias.includes(l) ||
        e.selectedModel.includes(l) ||
        e.outcome.includes(l) ||
        e.reasonCodes.some((c) => c.toLowerCase().includes(l)) ||
        e.workloadId.includes(l)
      );
    });
  }, [evidence, q]);
  return (
    <ConsoleShell title="Evidence" aside="Decision metadata only. Prompt bodies are not here, not in the hash, not in the export.">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Filter alias, model, reason, workload"
        className="mb-4 h-11 w-full rounded-md border border-border bg-surface px-3 text-sm"
      />
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-surface text-muted">
            <tr>
              <th className="px-3 py-2 font-medium">When</th>
              <th className="px-3 py-2 font-medium">Alias</th>
              <th className="px-3 py-2 font-medium">Selected</th>
              <th className="px-3 py-2 font-medium">Outcome</th>
              <th className="px-3 py-2 font-medium">USD</th>
              <th className="px-3 py-2 font-medium">ms</th>
              <th className="px-3 py-2 font-medium">Reasons</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 80).map((e) => (
              <tr key={e.id} className="border-t border-border">
                <td className="px-3 py-2 font-mono text-xs text-subtle">{e.ts.slice(11, 19)}</td>
                <td className="px-3 py-2">{e.alias}</td>
                <td className="px-3 py-2 font-mono text-xs">{e.selectedModel}</td>
                <td className="px-3 py-2">
                  <Badge tone={e.outcome === "served" || e.outcome === "cached" ? "ok" : e.outcome.includes("denied") ? "danger" : "warn"}>
                    {e.outcome}
                  </Badge>
                </td>
                <td className="px-3 py-2 font-mono text-xs tabular-nums">{usd(e.settledUsd, 4)}</td>
                <td className="px-3 py-2 font-mono text-xs tabular-nums">{e.latencyMs}</td>
                <td className="px-3 py-2 font-mono text-[11px] text-muted">{e.reasonCodes.join(" ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ConsoleShell>
  );
}
