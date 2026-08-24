import { createFileRoute } from "@tanstack/react-router";
import { ConsoleShell } from "@/components/console/shell";
import { ALL_MODELS } from "@/gateway/catalog";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/console/models")({ component: ConsoleModels });

function ConsoleModels() {
  const [q, setQ] = useState("");
  const rows = useMemo(() => {
    const l = q.toLowerCase();
    return ALL_MODELS.filter((m) => !l || m.id.includes(l) || m.displayName.toLowerCase().includes(l)).slice(0, 80);
  }, [q]);
  return (
    <ConsoleShell title="Model catalog" aside="The same rate card the engine uses to reserve spend.">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search"
        className="mb-4 h-11 w-full rounded-md border border-border bg-surface px-3 text-sm"
      />
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[700px] text-sm">
          <thead className="bg-surface text-muted">
            <tr>
              <th className="px-3 py-2 text-left font-medium">Model</th>
              <th className="px-3 py-2 text-left font-medium">Speed</th>
              <th className="px-3 py-2 text-left font-medium">In</th>
              <th className="px-3 py-2 text-left font-medium">Out</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => (
              <tr key={m.id} className="border-t border-border">
                <td className="px-3 py-2">
                  {m.displayName}
                  <div className="font-mono text-xs text-subtle">{m.id}</div>
                </td>
                <td className="px-3 py-2 text-muted">{m.speedClass}</td>
                <td className="px-3 py-2 font-mono tabular-nums">${m.inputPerMillion}</td>
                <td className="px-3 py-2 font-mono tabular-nums">${m.outputPerMillion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ConsoleShell>
  );
}
