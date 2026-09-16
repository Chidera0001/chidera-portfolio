import type { ReactNode } from "react";

export function InlineLogo({
  href,
  logo,
  children,
}: {
  href: string;
  logo: string;
  children: ReactNode;
}) {
  return (
    <span className="relative inline-flex items-center gap-1.5 align-middle">
      <span className="inline-flex size-[18px] shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--chip-bg)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt="" className="size-[11px] object-contain" />
      </span>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-2 hover:decoration-[var(--accent)]"
      >
        {children}
      </a>
    </span>
  );
}
