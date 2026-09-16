"use client";

import Link from "next/link";
import { profile, taglineLines, getIntroduceHref } from "@/lib/data";
import { CommandPalette } from "@/components/CommandPalette";
import { RotatingTagline } from "@/components/RotatingTagline";
import { LocalTimeBadge } from "@/components/LocalTimeBadge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HeaderAvatar } from "@/components/HeaderAvatar";

export function SiteHeader() {
  const forwardHref = getIntroduceHref();

  return (
    <header id="top" className="relative scroll-mt-8 pt-8 sm:pt-0">
      <div className="absolute right-0 top-0 sm:hidden">
        <LocalTimeBadge />
      </div>

      <div className="flex items-start justify-between gap-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <HeaderAvatar />
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {profile.name}
            </h1>
            <p className="mt-1 text-sm text-[var(--fg-muted)] sm:text-base">{profile.title}</p>
          </div>
        </div>
        <div className="hidden text-right sm:block">
          <LocalTimeBadge />
        </div>
      </div>

      <div className="mt-3 min-h-[1.5em] text-xs sm:ml-[calc(72px+1rem)] sm:text-base">
        <RotatingTagline lines={taglineLines} />
      </div>
      <p className="mt-2 flex items-center gap-2 text-xs text-[var(--fg-muted)] sm:ml-[calc(72px+1rem)] sm:text-sm">
        <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
        {profile.status}
      </p>

      <div className="mt-6 flex flex-nowrap items-center gap-2 sm:flex-wrap sm:gap-3">
        <ThemeToggle />
        <CommandPalette />
        <Link
          href="/resume"
          className="flex items-center gap-2 whitespace-nowrap rounded-full border border-[var(--border)] bg-[var(--bg-raised)] px-4 py-2 text-sm text-[var(--fg)] transition hover:border-[var(--fg-faint)]"
        >
          Résumé <span className="hidden text-[var(--fg-faint)] sm:inline">view ↗</span>
        </Link>
        <Link
          href="/outside-9-5"
          className="hidden items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-raised)] px-4 py-2 text-sm text-[var(--fg)] transition hover:border-[var(--fg-faint)] sm:flex"
        >
          Outside 9-5 <span className="text-[var(--fg-faint)]">what I am up to ↗</span>
        </Link>
        <a
          href={forwardHref}
          className="hidden items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-raised)] px-4 py-2 text-sm text-[var(--fg)] transition hover:border-[var(--fg-faint)] sm:flex"
        >
          Introduce me <span className="text-[var(--fg-faint)]">forward ↗</span>
        </a>
      </div>
    </header>
  );
}
