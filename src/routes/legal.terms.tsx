import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/shell";

export const Route = createFileRoute("/legal/terms")({ component: Terms });

function Terms() {
  return (
    <MarketingShell>
      <article className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="font-display text-4xl tracking-tight">Terms</h1>
        <div className="mt-8 space-y-4 text-muted">
          <p>The open-source engine is MIT licensed. Use it, fork it, hold our beer.</p>
          <p>Paid cloud plans (Taproom, Brewery, Distillery) are a hosted control plane. BYOK inference is billed by the provider at the rate card you already have. Hold My Beer does not add an inference markup on BYOK.</p>
          <p>The Lab plan is free, simulated, and provided as-is. Don’t point production traffic at the simulator and expect SLOs.</p>
        </div>
      </article>
    </MarketingShell>
  );
}
