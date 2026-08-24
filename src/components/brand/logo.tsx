import { cn } from "@/lib/cn";

export function PintMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-8", className)}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="7" fill="currentColor" className="text-fg" />
      <path
        fill="currentColor"
        className="text-bg"
        d="M10 8h10l-1.2 14.5c-.15 1.7-1.5 3-3.2 3h-1.2c-1.7 0-3.05-1.3-3.2-3L10 8z"
      />
      <path fill="currentColor" className="text-fg" d="M12.2 10.2h5.6l-.2 2.1h-5.2z" />
      <path
        fill="none"
        stroke="currentColor"
        className="text-bg"
        strokeWidth="1.6"
        strokeLinecap="round"
        d="M20.2 10.5c2.2.2 3.6 1.6 3.4 4.2-.2 2.4-1.8 3.6-3.6 3.6"
      />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <PintMark className="size-8 shrink-0" />
      <span className="font-display text-xl leading-none tracking-tight text-fg">
        Hold My Beer
      </span>
    </span>
  );
}
