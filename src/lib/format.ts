export function usd(n: number, digits = 2): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: digits });
}

export function compact(n: number): string {
  return Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

export function pct(n: number): string {
  return `${Math.round(n * 1000) / 10}%`;
}
