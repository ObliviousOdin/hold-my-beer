import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/shell";

export const Route = createFileRoute("/legal/privacy")({ component: Privacy });

function Privacy() {
  return (
    <MarketingShell>
      <article className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="font-display text-4xl tracking-tight">Privacy</h1>
        <div className="mt-8 space-y-4 text-muted">
          <p>Hold My Beer is designed so the control plane does not need your prompts. The hosted taproom stores account metadata, virtual key hashes, route configuration, and evidence tuples (alias, model, tokens, cost, latency, reason codes).</p>
          <p>BYOK provider credentials are encrypted at rest and never written to the evidence ledger. The Test Lab simulator keeps traffic local to your browser except when you explicitly run a live Grok call, which is capped and user-initiated.</p>
          <p>Self-hosted deployments under the MIT license never phone home. This demo workspace keeps data in memory for the session.</p>
        </div>
      </article>
    </MarketingShell>
  );
}
