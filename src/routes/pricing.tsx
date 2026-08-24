import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({ component: Pricing });

const PLANS = [
  {
    name: "Lab",
    price: "$0",
    cadence: "forever",
    blurb: "Simulated providers, the full control plane, and community models. No card.",
    cta: "Open the lab",
    to: "/console/lab" as const,
    highlight: false,
    items: ["10k simulated requests / mo", "1 workspace", "Observe mode", "Community Discord", "MIT self-host"],
  },
  {
    name: "Taproom",
    price: "$49",
    cadence: "/ month",
    blurb: "BYOK, virtual keys, and real routing for a single product team.",
    cta: "Start Taproom",
    to: "/console" as const,
    highlight: false,
    items: ["5M routed requests", "3 seats", "BYOK, no inference markup", "Soft + hard budgets", "Exact cache", "Email support"],
  },
  {
    name: "Brewery",
    price: "$199",
    cadence: "/ month",
    blurb: "The plan Northwind runs. Enforce mode, SSO, FinOps exports.",
    cta: "Start Brewery",
    to: "/console" as const,
    highlight: true,
    items: ["50M routed requests", "Unlimited seats", "SSO (OIDC)", "Observe / shadow / enforce", "Semantic-ready cache hooks", "FinOps CSV + OTEL", "Priority support"],
  },
  {
    name: "Distillery",
    price: "Custom",
    cadence: "",
    blurb: "VPC, SCIM, dedicated routing, signed audit delivery, 24/7.",
    cta: "Talk to us",
    to: "/docs" as const,
    highlight: false,
    items: ["Customer VPC / private link", "SCIM + custom roles", "Customer-managed keys", "Dedicated Slack + 15m SLO", "On-prem catalog mirrors", "Penetration test reports"],
  },
];

function Pricing() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm uppercase tracking-[0.2em] text-muted">Pricing</p>
        <h1 className="font-display mt-2 max-w-2xl text-5xl tracking-tight">A price on the page. Novel, we know.</h1>
        <p className="mt-4 max-w-xl text-muted">
          BYOK never takes a markup. Gateway request fees are the plan you see. Prepaid managed models are optional and itemized.
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((p) => (
            <Card key={p.name} className={`flex flex-col p-5 ${p.highlight ? "border-accent" : ""}`}>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">{p.name}</h2>
                {p.highlight && <Badge tone="accent">popular</Badge>}
              </div>
              <p className="mt-4 font-display text-4xl tracking-tight">
                {p.price}
                <span className="text-base text-muted">{p.cadence}</span>
              </p>
              <p className="mt-3 min-h-16 text-sm text-muted">{p.blurb}</p>
              <ul className="mt-4 flex-1 space-y-2 text-sm">
                {p.items.map((i) => (
                  <li key={i} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-ok" /> {i}
                  </li>
                ))}
              </ul>
              <Link to={p.to} className="mt-6">
                <Button className="w-full" variant={p.highlight ? "primary" : "secondary"}>
                  {p.cta}
                </Button>
              </Link>
            </Card>
          ))}
        </div>
        <p className="mt-10 text-sm text-muted">
          Self-host on the MIT license with no seat cap. The paid cloud is how we keep the lights on — not a tax on your tokens.
        </p>
      </div>
    </MarketingShell>
  );
}
