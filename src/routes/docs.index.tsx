import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/shell";
import { Card } from "@/components/ui/card";
import { DOC_PAGES } from "@/lib/docs";

export const Route = createFileRoute("/docs/")({ component: DocsIndex });

function DocsIndex() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm uppercase tracking-[0.2em] text-muted">Docs</p>
        <h1 className="font-display mt-2 text-5xl tracking-tight">Read the engine, then run it.</h1>
        <p className="mt-4 max-w-xl text-muted">
          Full markdown lives in the GitHub repo. These pages are the operator-facing cut of the same story.
        </p>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DOC_PAGES.map((d) => (
            <Link key={d.slug} to="/docs/$slug" params={{ slug: d.slug }}>
              <Card className="h-full p-5 hover:border-border-strong">
                <h2 className="font-medium">{d.title}</h2>
                <p className="mt-2 text-sm text-muted">{d.blurb}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </MarketingShell>
  );
}
