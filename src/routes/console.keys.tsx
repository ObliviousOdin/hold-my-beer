import { createFileRoute } from "@tanstack/react-router";
import { ConsoleShell } from "@/components/console/shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGateway } from "@/gateway/store";
import { usd } from "@/lib/format";

export const Route = createFileRoute("/console/keys")({ component: Keys });

function Keys() {
  const keys = useGateway((s) => s.keys);
  const revoke = useGateway((s) => s.revokeKey);
  return (
    <ConsoleShell title="Virtual keys" aside="Applications see a Hold My Beer key. Provider credentials stay in the vault. Revoke without a redeploy.">
      <div className="space-y-3">
        {keys.map((k) => (
          <Card key={k.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="font-medium">{k.name}</p>
              <p className="font-mono text-xs text-subtle">
                {k.prefix}{k.secretHint} · {k.workloadId} · {k.role}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-mono text-xs tabular-nums text-muted">
                {usd(k.spendUsd, 0)} · {k.requestCount.toLocaleString()} req
              </p>
              {k.revoked ? (
                <Badge tone="danger">revoked</Badge>
              ) : (
                <Button size="sm" variant="secondary" onClick={() => revoke(k.id)}>
                  Revoke
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </ConsoleShell>
  );
}
