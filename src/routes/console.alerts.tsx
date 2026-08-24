import { createFileRoute, Link } from "@tanstack/react-router";
import { ConsoleShell } from "@/components/console/shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DEMO_ALERTS } from "@/gateway/seed";

export const Route = createFileRoute("/console/alerts")({ component: Alerts });

function Alerts() {
  return (
    <ConsoleShell title="Alerts" aside="Soft limits, jailbreak hits, open circuits. Actionable, not a firehose.">
      <div className="space-y-3">
        {DEMO_ALERTS.map((a) => (
          <Card key={a.id} className="p-4">
            <div className="flex items-center gap-2">
              <Badge tone={a.severity === "critical" ? "danger" : a.severity === "warn" ? "warn" : "neutral"}>{a.severity}</Badge>
              <p className="font-medium">{a.title}</p>
            </div>
            <p className="mt-2 text-sm text-muted">{a.body}</p>
            <Link to={a.href as "/console/spend"} className="mt-3 inline-block text-sm text-fg underline-offset-4 hover:underline">
              Open
            </Link>
          </Card>
        ))}
      </div>
    </ConsoleShell>
  );
}
