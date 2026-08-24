import { createFileRoute } from "@tanstack/react-router";
import { ConsoleShell } from "@/components/console/shell";
import { Card } from "@/components/ui/card";
import { SPEND_SERIES, PROVIDER_SPEND } from "@/gateway/fixtures/history";
import { useGateway } from "@/gateway/store";
import { usd } from "@/lib/format";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/console/spend")({ component: Spend });

function Spend() {
  const budgets = useGateway((s) => s.budgets);
  const patch = useGateway((s) => s.patchBudget);
  return (
    <ConsoleShell title="Spend" aside="Hard limits are reserved before inference. Drag a cap, watch the remaining headroom.">
      <Card className="p-4">
        <p className="text-sm text-muted">Daily spend</p>
        <div className="mt-2 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={SPEND_SERIES.slice(-45)}>
              <XAxis dataKey="day" hide />
              <YAxis hide />
              <Tooltip contentStyle={{ background: "#131417", border: "1px solid #26282d" }} />
              <Bar dataKey="usd" fill="#d5d9e0" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {budgets.map((b) => {
          const used = (b.spentUsd + b.reservedUsd) / b.hardLimitUsd;
          return (
            <Card key={b.id} className="p-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-medium">{b.name}</p>
                  <p className="text-xs text-muted">
                    {b.scope} · {b.period} · {b.actionOnHard} at hard
                  </p>
                </div>
                <p className="font-mono text-sm tabular-nums">
                  {usd(b.spentUsd, 0)} / {usd(b.hardLimitUsd, 0)}
                </p>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-elevated">
                <div
                  className="h-full bg-accent"
                  style={{ width: `${Math.min(100, used * 100)}%` }}
                />
              </div>
              <label className="mt-3 flex items-center gap-3 text-xs text-muted">
                Hard cap
                <input
                  type="range"
                  min={Math.ceil(b.spentUsd + 10)}
                  max={40000}
                  value={b.hardLimitUsd}
                  onChange={(e) => patch(b.id, Number(e.target.value))}
                  className="flex-1"
                />
              </label>
            </Card>
          );
        })}
      </div>
      <Card className="mt-4 p-4">
        <p className="mb-3 text-sm">By provider</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              {PROVIDER_SPEND.map((p) => (
                <tr key={p.provider} className="border-t border-border first:border-0">
                  <td className="py-2 capitalize">{p.provider}</td>
                  <td className="py-2 font-mono tabular-nums">{usd(p.usd)}</td>
                  <td className="py-2 text-muted">{Math.round(p.share * 100)}%</td>
                  <td className="py-2 text-right text-muted">{p.requests.toLocaleString()} req</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </ConsoleShell>
  );
}
