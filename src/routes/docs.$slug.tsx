import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing/shell";
import { DOC_PAGES, docBody } from "@/lib/docs";

export const Route = createFileRoute("/docs/$slug")({
  component: DocPage,
  loader: ({ params }) => {
    const page = DOC_PAGES.find((d) => d.slug === params.slug);
    if (!page) throw notFound();
    return page;
  },
});

function DocPage() {
  const page = Route.useLoaderData();
  const body = docBody(page.slug);
  return (
    <MarketingShell>
      <article className="mx-auto max-w-2xl px-4 py-16">
        <Link to="/docs" className="text-sm text-muted hover:text-fg">
          All docs
        </Link>
        <h1 className="font-display mt-4 text-4xl tracking-tight">{page.title}</h1>
        <p className="mt-3 text-muted">{page.blurb}</p>
        <div className="mt-10 space-y-5 text-[17px] leading-7 text-fg/90">
          {body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </article>
    </MarketingShell>
  );
}
