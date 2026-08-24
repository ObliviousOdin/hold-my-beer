import { Link, useRouterState } from "@tanstack/react-router";
import { PintMark } from "@/components/brand/logo";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { useGateway } from "@/gateway/store";
import { DEMO_ORG } from "@/gateway/seed";
import { usd, pct } from "@/lib/format";
import {
  Activity,
  Beaker,
  BookOpen,
  Boxes,
  KeyRound,
  LayoutDashboard,
  Receipt,
  Route as RouteIcon,
  Settings,
  Shield,
  Wallet,
  Bell,
} from "lucide-react";

const NAV = [
  { to: "/console", label: "Overview", icon: LayoutDashboard },
  { to: "/console/spend", label: "Spend", icon: Wallet },
  { to: "/console/routes", label: "Routes", icon: RouteIcon },
  { to: "/console/policies", label: "Policies", icon: Shield },
  { to: "/console/keys", label: "Keys", icon: KeyRound },
  { to: "/console/evidence", label: "Evidence", icon: Receipt },
  { to: "/console/lab", label: "Lab", icon: Beaker },
  { to: "/console/models", label: "Models", icon: Boxes },
  { to: "/console/finops", label: "FinOps", icon: Activity },
  { to: "/console/alerts", label: "Alerts", icon: Bell },
  { to: "/console/settings", label: "Settings", icon: Settings },
];

export function ConsoleShell({ children, title, aside }: { children: React.ReactNode; title: string; aside?: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const mode = useGateway((s) => s.mode);
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <div className="flex min-h-dvh">
        <aside className="hidden w-56 shrink-0 border-r border-border bg-surface md:flex md:flex-col">
          <Link to="/" className="flex items-center gap-2 px-4 py-4">
            <PintMark className="size-8" />
            <span className="font-display text-lg leading-none">HMB</span>
          </Link>
          <nav className="flex flex-1 flex-col gap-0.5 px-2 pb-4">
            {NAV.map((n) => {
              const active = n.to === "/console" ? pathname === "/console" : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-muted hover:bg-elevated hover:text-fg",
                    active && "bg-elevated text-fg",
                  )}
                >
                  <n.icon className="size-4" />
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <Link to="/docs" className="flex items-center gap-2 px-4 py-3 text-xs text-muted hover:text-fg">
            <BookOpen className="size-3.5" /> Docs
          </Link>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm text-muted">{DEMO_ORG.name} · {DEMO_ORG.plan}</p>
              <h1 className="truncate text-lg font-medium">{title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Badge tone={mode === "enforce" ? "ok" : mode === "shadow" ? "warn" : "neutral"}>{mode}</Badge>
              <span className="hidden font-mono text-xs tabular-nums text-muted sm:inline">
                {usd(DEMO_ORG.spendMonthUsd, 0)} / {usd(DEMO_ORG.spendLimitUsd, 0)} · {pct(DEMO_ORG.spendMonthUsd / DEMO_ORG.spendLimitUsd)}
              </span>
            </div>
          </header>
          <div className="flex gap-2 overflow-x-auto border-b border-border px-2 py-2 md:hidden">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className="shrink-0 rounded-sm border border-border px-3 py-2 text-xs">
                {n.label}
              </Link>
            ))}
          </div>
          <div className="flex-1 px-4 py-6">
            {aside && <p className="mb-6 max-w-2xl text-sm text-muted">{aside}</p>}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
