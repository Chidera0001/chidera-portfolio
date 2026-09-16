import { Globe } from "lucide-react";

export function Quote() {
  return (
    <div className="mt-16 rounded-2xl border border-[var(--border)] bg-[var(--bg-raised)] p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="flex items-center gap-2 text-sm text-[var(--fg-muted)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--fg-muted)]" />
          Recent favorite quote
        </p>
        <Globe className="h-5 w-5 text-[var(--fg-muted)]" strokeWidth={1.5} />
      </div>

      <p className="mt-6 font-heading text-2xl leading-snug tracking-tight sm:text-3xl">
        A man who has not hit his Claude limits by noon{" "}
        <span className="font-semibold">has wasted his morning</span>
      </p>

      <p className="font-handwriting mt-4 text-lg italic text-[var(--note)]">
        &ldquo;A wise man once said&rdquo;
      </p>
    </div>
  );
}
