export const DOC_PAGES = [
  { slug: "quickstart", title: "Quickstart", blurb: "Point an OpenAI client at the gateway in five minutes." },
  { slug: "architecture", title: "Architecture", blurb: "Authenticate, constrain, select, reconcile." },
  { slug: "routing", title: "Routing", blurb: "Pools, strategies, circuits, failover." },
  { slug: "budgets", title: "Budgets", blurb: "Reserve before spend. Settle after usage." },
  { slug: "policies", title: "Policies", blurb: "Observe, shadow, enforce." },
  { slug: "evidence", title: "Evidence", blurb: "A ledger that never stores prompts." },
  { slug: "virtual-keys", title: "Virtual keys", blurb: "Scoped, revocable keys in front of BYOK." },
  { slug: "lab", title: "Test Lab", blurb: "Simulators and a capped live Grok path." },
  { slug: "security", title: "Security", blurb: "Fail closed. Redact credentials. Region locks." },
  { slug: "finops", title: "FinOps", blurb: "Rate cards, forecasts, anomaly scores." },
  { slug: "compare", title: "Compare", blurb: "LiteLLM, Portkey, Helicone, Kong, AIGHQ." },
  { slug: "reason-codes", title: "Reason codes", blurb: "Every decision is greppable." },
  { slug: "runbook", title: "Runbook", blurb: "What to do when a provider falls over." },
  { slug: "self-host", title: "Self-host", blurb: "Run the engine next to your apps." },
  { slug: "faq", title: "FAQ", blurb: "Straight answers." },
] as const;

export function docBody(slug: string): string[] {
  const page = DOC_PAGES.find((d) => d.slug === slug);
  const title = page?.title ?? slug;
  return [
    `${title} is part of the Hold My Beer control plane. The engine is TypeScript, the catalog is versioned, and every decision emits a reason code.`,
    "A request hits a virtual key, not a provider key. The key maps to a workload, a route pool alias, a budget, and a policy pack.",
    "Policy runs first. Observe never blocks. Shadow records what enforce would have done. Enforce fail-closes.",
    "Budgets reserve estimated spend atomically. If the reserve fails, the pool may degrade to a cheaper target or deny with BGT.RESERVE_FAIL.",
    "Routing ranks remaining targets by the pool strategy: priority, weighted, least-cost, health, latency, or round-robin. Open circuits are skipped.",
    "Cache is optional, short-lived, and workload-isolated. Streaming and tool calls bypass it.",
    "The selected adapter maps the canonical request to the upstream protocol. Prompt bodies are not written. Usage, latency, alias, and integrity are.",
    "Settlement uses provider-reported tokens when present, else the tokenizer estimate. Evidence is the receipt finance actually wanted.",
    "The Test Lab speaks the same engine with simulated providers. A live Grok path exists, capped, user-initiated, and never on page load.",
    "Self-host with the MIT license. The cloud plans pay for the hosted taproom, SSO, and the on-call rotation — not a tax on your tokens.",
  ];
}
