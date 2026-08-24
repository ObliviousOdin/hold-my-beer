import { createFileRoute } from "@tanstack/react-router";
import { ConsoleShell } from "@/components/console/shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { POLICY_PACKS } from "@/gateway/policy";
import { useGateway } from "@/gateway/store";

export const Route = createFileRoute("/console/policies")({ component: Policies });

function Policies() {
  const mode = useGateway((s) => s.mode);
  const setMode = useGateway((s) => s.setMode);
  return (
    <ConsoleShell title="Policies" aside="Install in observe, measure false positives, promote to shadow, then enforce. Undo is a mode flip away.">
      <div className="mb-6 flex flex-wrap gap-2">
        {(["observe", "shadow", "enforce"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-md border px-4 py-2 text-sm ${mode === m ? "border-accent bg-elevated" : "border-border"}`}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        {POLICY_PACKS.map((p) => (
          <Card key={p.id} className="p-5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-medium">{p.name}</h2>
              <Badge tone={p.mode === "enforce" ? "ok" : p.mode === "shadow" ? "warn" : "neutral"}>{p.mode}</Badge>
            </div>
            <p className="mt-2 text-sm text-muted">{p.description}</p>
            <ul className="mt-3 space-y-1 text-xs text-subtle">
              {p.rules.map((r) => (
                <li key={r.id} className="font-mono">
                  {r.kind} · {r.reasonCode}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </ConsoleShell>
  );
}
