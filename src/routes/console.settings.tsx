import { createFileRoute } from "@tanstack/react-router";
import { ConsoleShell } from "@/components/console/shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGateway } from "@/gateway/store";
import { DEMO_ORG } from "@/gateway/seed";

export const Route = createFileRoute("/console/settings")({ component: Settings });

function Settings() {
  const reset = useGateway((s) => s.resetDemo);
  const mode = useGateway((s) => s.mode);
  return (
    <ConsoleShell title="Settings" aside="This preview workspace is in-memory. Reset to restore Northwind’s brewery demo.">
      <Card className="p-5">
        <p className="text-sm text-muted">Workspace</p>
        <p className="mt-2 text-lg">{DEMO_ORG.name}</p>
        <p className="text-sm text-muted">
          Plan {DEMO_ORG.plan} · governance {mode}
        </p>
        <Button className="mt-6" variant="secondary" onClick={reset}>
          Reset demo
        </Button>
      </Card>
    </ConsoleShell>
  );
}
