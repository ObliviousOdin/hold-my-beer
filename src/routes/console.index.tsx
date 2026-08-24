import { createFileRoute, Link } from "@tanstack/react-router";
import { ConsoleShell } from "@/components/console/shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DEMO_ALERTS, DEMO_HEALTH, DEMO_ORG, DEMO_POOLS } from "@/gateway/seed";
import { SPEND_SERIES, PROVIDER_SPEND } from "@/gateway/fixtures/history";
import { usd, compact, pct } from "@/lib/format";
import { useGateway } from "@/gateway/store";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

export const Route = createFileRoute("/console/")({ component: Overview });

function Overview() {
  const evidence = useGateway((s) => s.evidence);
  const series = SPEND_SERIES.slice(-30);
  return (
    <ConsoleShell title="Overview" aside="Northwind’s brewery workspace — live numbers from the catalog, not a concept render.">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          [usd(DEMO_ORG.spendMonthUsd, 0), "Month spend"],
          [compact(DEMO_ORG.requestsMonth), "Requests"],
          [pct(DEMO_ORG.cacheHitRate), "Cache hits"],
          [pct(DEMO_ORG.blockedRate), "Blocked"],
        ].map(([k, v]) => (
          <Card key={String(v)} className="p-4">
            <p className="text-xs uppercase tracking-wide text-muted">{v}</p>
            <p className="mt-2 font-mono text-2xl tabular-nums">{k}</p>
          </Card>
        ))}
      </div>
      <Card className="mt-4 p-4">
        <p className="text-sm text-muted">Spend, last 30 days</p>
        <div className="mt-2 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series}>
              <XAxis dataKey="day" hide />
              <Tooltip
                contentStyle={{ background: "#131417", border: "1px solid #26282d", borderRadius: 8 }}
                labelStyle={{ color: "#8c8e94" }}
              />
              <Area type="monotone" dataKey="usd" stroke="#d5d9e0" fill="#d5d9e0" fillOpacity={0.15} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm">Provider mix</p>
            <Link to="/console/spend" className="text-xs text-muted hover:text-fg">
              Spend
            </Link>
          </div>
          <div className="space-y-2">
            {PROVIDER_SPEND.map((p) => (
              <div key={p.provider} className="flex items-center gap-3 text-sm">
                <span className="w-24 capitalize text-muted">{p.provider}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-elevated">
                  <div className="h-full bg-accent" style={{ width: `${p.share * 100}%` }} />
                </div>
                <span className="w-16 text-right font-mono text-xs tabular-nums">{usd(p.usd, 0)}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-4">
          <p className="mb-3 text-sm">Health</p>
          <div className="grid grid-cols-2 gap-2">
            {DEMO_HEALTH.slice(0, 8).map((h) => (
              <div key={h.provider} className="flex items-center justify-between rounded-md bg-elevated px-3 py-2 text-sm">
                <span className="capitalize">{h.provider}</span>
                <Badge tone={h.healthy ? "ok" : "danger"}>{h.healthy ? "up" : "down"}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm">Route pools</p>
            <Link to="/console/routes" className="text-xs text-muted hover:text-fg">
              Manage
            </Link>
          </div>
          {DEMO_POOLS.map((p) => (
            <div key={p.id} className="flex items-center justify-between border-t border-border py-2 text-sm first:border-0">
              <div>
                <p>{p.name}</p>
                <p className="font-mono text-xs text-subtle">{p.alias}</p>
              </div>
              <span className="text-xs text-muted">{p.strategy} · {p.targets.length} targets</span>
            </div>
          ))}
        </Card>
        <Card className="p-4">
          <p className="mb-3 text-sm">Alerts</p>
          {DEMO_ALERTS.map((a) => (
            <Link key={a.id} to={a.href as "/console/spend"} className="block border-t border-border py-2 first:border-0">
              <div className="flex items-center gap-2">
                <Badge tone={a.severity === "critical" ? "danger" : a.severity === "warn" ? "warn" : "neutral"}>{a.severity}</Badge>
                <p className="text-sm">{a.title}</p>
              </div>
              <p className="mt-1 text-xs text-muted">{a.body}</p>
            </Link>
          ))}
          <p className="mt-3 text-xs text-subtle">{evidence.length} evidence rows in the live ledger.</p>
        </Card>
      </div>
    </ConsoleShell>
  );
}
