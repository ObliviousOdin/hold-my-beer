import { createFileRoute } from "@tanstack/react-router";
import { ConsoleShell } from "@/components/console/shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGateway } from "@/gateway/store";
import { DEMO_POOLS } from "@/gateway/seed";
import { usd } from "@/lib/format";
import { liveLabComplete } from "@/lib/lab-live";
import { useState } from "react";

export const Route = createFileRoute("/console/lab")({ component: Lab });

function Lab() {
  const run = useGateway((s) => s.run);
  const evidence = useGateway((s) => s.evidence);
  const [alias, setAlias] = useState("company-approved-fast");
  const [prompt, setPrompt] = useState("Summarize why we should put every model call on a budget.");
  const [live, setLive] = useState(false);
  const [busy, setBusy] = useState(false);
  const [out, setOut] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const last = evidence[0];

  async function fire() {
    setBusy(true);
    setErr("");
    setOut("");
    try {
      if (live) {
        const res = await liveLabComplete({ data: { prompt, maxTokens: 128 } });
        if (!res.ok) setErr(res.error);
        else setOut(res.text);
      } else {
        const result = run({
          model: alias,
          messages: [{ role: "user", content: prompt }],
          maxTokens: 256,
        });
        if (!result.ok) setErr(result.deniedReason ?? "denied");
        else setOut(result.response?.content ?? "");
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <ConsoleShell title="Test Lab" aside="Protocol-faithful simulation by default. Live Grok is capped, user-initiated, and never on page load.">
      <Card className="p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm">
            Alias
            <select
              className="mt-1 h-11 w-full rounded-md border border-border bg-bg px-3"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
            >
              {DEMO_POOLS.map((p) => (
                <option key={p.id} value={p.alias}>
                  {p.alias}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-end gap-3 text-sm">
            <input type="checkbox" checked={live} onChange={(e) => setLive(e.target.checked)} className="size-4" />
            Live Grok 4.5 (capped)
          </label>
        </div>
        <textarea
          className="mt-3 min-h-32 w-full rounded-md border border-border bg-bg p-3 text-sm"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button className="mt-3" disabled={busy} onClick={fire}>
          {busy ? "Running…" : live ? "Run live" : "Simulate"}
        </Button>
        {err && <p className="mt-3 text-sm text-danger">{err}</p>}
        {out && (
          <pre className="mt-3 whitespace-pre-wrap rounded-md border border-border bg-elevated p-3 text-sm">{out}</pre>
        )}
      </Card>
      {last && (
        <Card className="mt-4 p-5">
          <div className="flex items-center gap-2">
            <p className="text-sm">Last evidence</p>
            <Badge>{last.outcome}</Badge>
          </div>
          <p className="mt-2 font-mono text-xs text-muted">
            {last.selectedModel} · {usd(last.settledUsd, 4)} · {last.latencyMs}ms · {last.reasonCodes.join(" ")} · {last.integrity}
          </p>
        </Card>
      )}
    </ConsoleShell>
  );
}
