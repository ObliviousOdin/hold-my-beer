import { createFileRoute } from "@tanstack/react-router";
import { ConsoleShell } from "@/components/console/shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGateway } from "@/gateway/store";
import { getModel } from "@/gateway/catalog";

export const Route = createFileRoute("/console/routes")({ component: RoutesPage });

function RoutesPage() {
  const pools = useGateway((s) => s.pools);
  const toggle = useGateway((s) => s.toggleTarget);
  return (
    <ConsoleShell title="Route pools" aside="Aliases stay stable. Targets move. Disable a host and the next eligible one takes the traffic.">
      <div className="space-y-4">
        {pools.map((p) => (
          <Card key={p.id} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-medium">{p.name}</h2>
                <p className="font-mono text-xs text-subtle">{p.alias}</p>
              </div>
              <div className="flex gap-2">
                <Badge>{p.strategy}</Badge>
                <Badge tone="neutral">ttl {p.cacheTtlSeconds}s</Badge>
              </div>
            </div>
            <p className="mt-2 text-sm text-muted">{p.notes}</p>
            <div className="mt-4 divide-y divide-border rounded-md border border-border">
              {p.targets.map((t) => {
                const m = getModel(t.modelId);
                return (
                  <div key={t.id} className="flex flex-wrap items-center justify-between gap-3 px-3 py-3 text-sm">
                    <div className="min-w-0">
                      <p className="truncate">{m?.displayName ?? t.modelId}</p>
                      <p className="truncate font-mono text-xs text-subtle">{t.modelId}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-muted">p{t.priority} · w{t.weight}</span>
                      <button
                        className="rounded-sm border border-border px-3 py-1.5 text-xs"
                        onClick={() => toggle(p.id, t.id)}
                      >
                        {t.enabled ? "enabled" : "disabled"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </ConsoleShell>
  );
}
