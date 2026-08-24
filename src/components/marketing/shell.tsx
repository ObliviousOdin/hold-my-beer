import { Link, useRouterState } from "@tanstack/react-router";
import { Wordmark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const LINKS = [
  { to: "/", label: "Product" },
  { to: "/pricing", label: "Pricing" },
  { to: "/models", label: "Models" },
  { to: "/compare", label: "Compare" },
  { to: "/docs", label: "Docs" },
  { to: "/security", label: "Security" },
];

export function MarketingShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="shrink-0" aria-label="Hold My Beer home">
            <Wordmark />
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "text-sm text-muted hover:text-fg",
                  pathname === l.to && "text-fg",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <Link to="/console">
              <Button variant="secondary" size="sm">
                Open taproom
              </Button>
            </Link>
            <Link to="/console/lab">
              <Button size="sm">Try the lab</Button>
            </Link>
          </div>
          <button
            className="inline-flex size-11 items-center justify-center rounded-md border border-border md:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {open && (
          <div className="border-t border-border px-4 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              {LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="rounded-md px-3 py-3 text-sm text-fg"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/console" className="rounded-md px-3 py-3 text-sm" onClick={() => setOpen(false)}>
                Open taproom
              </Link>
            </div>
          </div>
        )}
      </header>
      <main>{children}</main>
      <footer className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
          <div>
            <Wordmark />
            <p className="mt-3 max-w-xs text-sm text-muted">
              The AI gateway with a spine. Hard budgets, cost-aware routing, evidence without hoarding prompts.
            </p>
          </div>
          <div className="text-sm">
            <p className="mb-2 text-muted">Product</p>
            <div className="flex flex-col gap-2">
              <Link to="/pricing" className="hover:text-fg text-muted">Pricing</Link>
              <Link to="/compare" className="hover:text-fg text-muted">Compare</Link>
              <Link to="/docs" className="hover:text-fg text-muted">Docs</Link>
              <a href="https://github.com/ObliviousOdin/hold-my-beer" className="hover:text-fg text-muted">GitHub</a>
            </div>
          </div>
          <div className="text-sm">
            <p className="mb-2 text-muted">Legal</p>
            <div className="flex flex-col gap-2">
              <Link to="/legal/privacy" className="hover:text-fg text-muted">Privacy</Link>
              <Link to="/legal/terms" className="hover:text-fg text-muted">Terms</Link>
              <Link to="/security" className="hover:text-fg text-muted">Security</Link>
            </div>
          </div>
        </div>
        <p className="border-t border-border py-4 text-center text-xs text-subtle">
          © 2026 Hold My Beer. MIT licensed. Inspired by LiteLLM, Portkey, Helicone, and Bifrost — built to be better.
        </p>
      </footer>
    </div>
  );
}
