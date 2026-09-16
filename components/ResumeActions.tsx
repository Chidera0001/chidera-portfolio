"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function ResumeActions() {
  return (
    <div className="no-print flex flex-wrap items-center gap-4">
      <Link href="/" className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)]">
        ← portfolio
      </Link>
      <div className="ml-auto flex flex-wrap items-center gap-3">
        <ThemeToggle />
        <a
          href="/resume.pdf"
          download
          className="flex items-center gap-2 whitespace-nowrap rounded-full border border-[var(--border)] bg-[var(--bg-raised)] px-4 py-2 text-sm text-[var(--fg)] transition hover:border-[var(--fg-faint)]"
        >
          ↓ Download PDF
        </a>
        <button
          onClick={() => window.print()}
          className="whitespace-nowrap rounded-full border border-[var(--border)] bg-[var(--bg-raised)] px-4 py-2 text-sm text-[var(--fg)] transition hover:border-[var(--fg-faint)]"
        >
          print
        </button>
      </div>
    </div>
  );
}
