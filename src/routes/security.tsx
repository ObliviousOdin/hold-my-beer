import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/shell";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/security")({ component: Security });

const ITEMS = [
  { t: "Fail closed", d: "Missing keys, open circuits, and empty eligible sets deny. We do not fail open into an unbudgeted provider." },
  { t: "No prompt archive", d: "Evidence is the decision tuple plus an integrity hash. Bodies, tools arguments, and credentials never persist." },
  { t: "BYOK encrypted", d: "Provider secrets are tenant-bound. Virtual keys are what applications see." },
  { t: "Region locks", d: "Policy packs can pin eu-west / eu-central and refuse US-only hosts." },
  { t: "Jailbreak + PII scanners", d: "Pattern library runs in observe, shadow, or enforce. Red-team in the lab first." },
  { t: "Signed reason codes", d: "Every allow, deny, failover, and degrade is greppable. SOC 2 auditors prefer this to a zip of prompts." },
];

function Security() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm uppercase tracking-[0.2em] text-muted">Security</p>
        <h1 className="font-display mt-2 max-w-2xl text-5xl tracking-tight">Control the boundary. Don’t hoard the prompts.</h1>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {ITEMS.map((i) => (
            <Card key={i.t} className="p-5">
              <h2 className="font-medium">{i.t}</h2>
              <p className="mt-2 text-sm text-muted">{i.d}</p>
            </Card>
          ))}
        </div>
      </div>
    </MarketingShell>
  );
}
