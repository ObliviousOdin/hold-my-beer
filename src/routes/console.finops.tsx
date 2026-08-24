import { createFileRoute } from "@tanstack/react-router";
import { ConsoleShell } from "@/components/console/shell";
import { Card } from "@/components/ui/card";
import { rateCard } from "@/gateway/finops/rates";
import { SPEND_SERIES } from "@/gateway/fixtures/history";
import { usd } from "@/lib/format";
import { useMemo } from "react";

export const Route = createFileRoute("/console/finops")({ component: Finops });

function Finops() {
  const cheap = useMemo(() => {
    return [...rateCard()].sort((a, b) => a.blended2k500 - b.blended2k500).slice(0, 8);
  }, []);
  const expensive = useMemo(() => {
    return [...rateCard()].sort((a, b) => b.blended8k2k - a.blended8k2k).slice(0, 8);
  }, []);
  const burn = SPEND_SERIES.slice(-7).reduce((s, d) => s + d.usd, 0);
  return (
    <ConsoleShell title="FinOps" aside="Blended cost for a 2k/500 turn versus an 8k/2k turn. Use this when a pool is choosing least-cost.">
      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="p-4">
          <p className="text-xs text-muted">7-day burn</p>
          <p className="mt-2 font-mono text-2xl tabular-nums">{usd(burn, 0)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted">Avg request (30d)</p>
          <p className="mt-2 font-mono text-2xl tabular-nums">
            {usd(SPEND_SERIES.slice(-30).reduce((s, d) => s + d.usd, 0) / SPEND_SERIES.slice(-30).reduce((s, d) => s + d.requests, 0), 4)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted">Catalog rows</p>
          <p className="mt-2 font-mono text-2xl tabular-nums">{rateCard().length}</p>
        </Card>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <p className="mb-3 text-sm">Cheapest 2k/500</p>
          {cheap.map((r) => (
            <div key={r.modelId} className="flex justify-between gap-2 border-t border-border py-2 text-sm first:border-0">
              <span className="truncate font-mono text-xs">{r.modelId}</span>
              <span className="font-mono text-xs tabular-nums">{usd(r.blended2k500, 4)}</span>
            </div>
          ))}
        </Card>
        <Card className="p-4">
          <p className="mb-3 text-sm">Pricey 8k/2k</p>
          {expensive.map((r) => (
            <div key={r.modelId} className="flex justify-between gap-2 border-t border-border py-2 text-sm first:border-0">
              <span className="truncate font-mono text-xs">{r.modelId}</span>
              <span className="font-mono text-xs tabular-nums">{usd(r.blended8k2k, 4)}</span>
            </div>
          ))}
        </Card>
      </div>
    </ConsoleShell>
  );
}
