import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PintMark } from "@/components/brand/logo";
import { ALL_MODELS, MODEL_COUNT, PROVIDER_COUNT } from "@/gateway/catalog";
import { DEMO_ORG, DEMO_POOLS, DEMO_HEALTH } from "@/gateway/seed";
import { usd, compact, pct } from "@/lib/format";
import { ArrowRight, Check, Shield, Gauge, ScrollText, Waypoints } from "lucide-react";

export const Route = createFileRoute("/")({ component: Home });

const STEPS = [
  { n: "01", t: "Authenticate", d: "Resolve the virtual key, workload, and environment. Fail closed if the key is revoked." },
  { n: "02", t: "Constrain", d: "Drop targets that violate model, region, tool, or budget policy before a provider is touched." },
  { n: "03", t: "Select", d: "Rank by priority, weight, health, latency, or least cost. Circuits stay honest." },
  { n: "04", t: "Reconcile", d: "Serve from cache or upstream, settle the reserve against real usage, write evidence — never the prompt." },
];

const FEATURES = [
  { icon: Gauge, t: "Hard limits before spend", d: "Atomic reserve against org, team, key, and prepaid wallets. The invoice cannot outrun the policy." },
  { icon: Waypoints, t: "Cost-aware routing", d: "One alias. Many targets. Fail over on 429, 5xx, timeout, or budget pressure without a redeploy." },
  { icon: Shield, t: "Observe → shadow → enforce", d: "Ship the pack in observe, measure false positives, then flip the switch. Reason codes on every decision." },
  { icon: ScrollText, t: "Evidence, not archives", d: "Workload, alias, model, latency, cost, integrity hash. Prompts and keys never land in the ledger." },
];

function Home() {
  const healthy = DEMO_HEALTH.filter((h) => h.healthy).length;
  return (
    <MarketingShell>
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:pt-24">
        <div className="flex items-center gap-3">
          <PintMark className="size-10" />
          <Badge>Open source · MIT</Badge>
        </div>
        <h1 className="font-display mt-6 max-w-3xl text-5xl leading-[1.05] tracking-tight sm:text-7xl">
          We’ll hold the spend.
          <span className="italic text-muted"> You hold the beer.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          Hold My Beer is the AI gateway with a spine. One OpenAI-compatible endpoint, hard budgets before a token is billed,
          cost-aware routing across {MODEL_COUNT} models and {PROVIDER_COUNT} providers, and an evidence ledger that never stores your prompts.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/console">
            <Button size="lg">
              Open the taproom <ArrowRight className="size-4" />
            </Button>
          </Link>
          <Link to="/console/lab">
            <Button size="lg" variant="secondary">
              Fire the test lab
            </Button>
          </Link>
        </div>
        <p className="mt-4 text-sm text-subtle">No card. No provider key. The lab is simulated until you ask for a live Grok call.</p>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px sm:grid-cols-4">
          {[
            [compact(DEMO_ORG.requestsMonth), "requests this month"],
            [usd(DEMO_ORG.spendMonthUsd, 0), "attributed spend"],
            [pct(DEMO_ORG.cacheHitRate), "cache hit rate"],
            [`${healthy}/${DEMO_HEALTH.length}`, "providers healthy"],
          ].map(([k, v]) => (
            <div key={String(v)} className="px-6 py-8">
              <p className="font-mono text-2xl tabular-nums">{k}</p>
              <p className="mt-1 text-sm text-muted">{v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-sm uppercase tracking-[0.2em] text-muted">Request path</p>
        <h2 className="font-display mt-2 max-w-2xl text-4xl tracking-tight">Authenticate, constrain, select, reconcile.</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <Card key={s.n} className="p-5">
              <p className="font-mono text-xs text-subtle">{s.n}</p>
              <h3 className="mt-3 text-lg font-medium">{s.t}</h3>
              <p className="mt-2 text-sm text-muted">{s.d}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted">Working product</p>
            <h2 className="font-display mt-2 text-4xl tracking-tight">A taproom, not a slide.</h2>
            <p className="mt-4 text-muted">
              Northwind’s brewery workspace is loaded with real route pools, budgets, virtual keys, and a 90-day spend series.
              Flip a target off. Tighten a cap. Run a lab request. Watch the evidence row land — without a prompt archive.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {["Virtual keys with spend and role", "Least-cost + failover pools", "Observe / shadow / enforce", "Integrity-hashed evidence"].map((t) => (
                <li key={t} className="flex gap-2 text-fg">
                  <Check className="mt-0.5 size-4 shrink-0 text-ok" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <Card className="overflow-hidden p-0">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="text-sm">company-approved-fast</span>
              <Badge tone="ok">healthy</Badge>
            </div>
            <div className="divide-y divide-border">
              {DEMO_POOLS[0].targets.map((t) => {
                const m = ALL_MODELS.find((x) => x.id === t.modelId);
                return (
                  <div key={t.id} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                    <div className="min-w-0">
                      <p className="truncate font-medium">{m?.displayName ?? t.modelId}</p>
                      <p className="truncate font-mono text-xs text-subtle">{t.modelId}</p>
                    </div>
                    <p className="shrink-0 font-mono text-xs tabular-nums text-muted">
                      ${m?.inputPerMillion}/{m?.outputPerMillion}
                    </p>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.t} className="flex gap-4 rounded-lg bg-bg/40 p-5">
              <f.icon className="size-5 shrink-0 text-accent" />
              <div>
                <h3 className="font-medium">{f.t}</h3>
                <p className="mt-2 text-sm text-muted">{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-sm uppercase tracking-[0.2em] text-muted">Stable developer surface</p>
        <h2 className="font-display mt-2 text-4xl tracking-tight">Invisible to applications. Obvious to operators.</h2>
        <pre className="mt-8 overflow-x-auto rounded-xl border border-border bg-elevated p-5 font-mono text-[13px] leading-relaxed text-paper">
{`from openai import OpenAI

client = OpenAI(
    base_url="https://holdmybeer.ai/v1",
    api_key=os.environ["HMB_KEY"],
)

response = client.chat.completions.create(
    model="company-approved-fast",
    messages=[{"role": "user", "content": "Summarize the incident"}],
)`}
        </pre>
        <p className="mt-4 text-sm text-muted">
          Rotate credentials, change pools, cap spend, or contain an outage without touching application code.
          Compatible with OpenAI chat, Anthropic messages, and embeddings.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24">
        <div className="rounded-xl border border-border bg-surface px-6 py-10 sm:px-10">
          <h2 className="font-display text-3xl tracking-tight">Pricing that actually exists.</h2>
          <p className="mt-3 max-w-xl text-muted">
            AI Gateway HQ never published a price. We did. Lab is free. Taproom is $49. Brewery is $199. Distillery is a conversation.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/pricing">
              <Button>See plans</Button>
            </Link>
            <Link to="/compare">
              <Button variant="secondary">Compare the field</Button>
            </Link>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
