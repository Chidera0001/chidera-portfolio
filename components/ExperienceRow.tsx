"use client";

import Link from "next/link";
import { useState } from "react";
import type { ExperienceItem } from "@/lib/data";

function formatDateRange(role: ExperienceItem): string {
  const startYear = role.start.slice(-4);
  if (role.current) return `${startYear}–`;
  const endYear = role.end.slice(-4);
  if (startYear === endYear) return startYear;
  return `${startYear}–${endYear.slice(-2)}`;
}

export function ExperienceRow({ role }: { role: ExperienceItem }) {
  const [clicked, setClicked] = useState(false);
  const [rowHovered, setRowHovered] = useState(false);
  const expanded = clicked || rowHovered;

  return (
    <li className="border-b border-[var(--border)] py-3.5 first:border-t">
      <button
        type="button"
        onClick={() => setClicked((v) => !v)}
        onMouseEnter={() => setRowHovered(true)}
        onMouseLeave={() => setRowHovered(false)}
        className="flex w-full flex-wrap items-center gap-x-3 gap-y-1.5 text-left"
        aria-expanded={expanded}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--border)] bg-[var(--chip-bg)] text-xs font-medium text-[var(--chip-fg)]">
          {role.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={role.logo}
              alt={`${role.company} logo`}
              className="h-full w-full object-contain p-1.5"
            />
          ) : (
            role.company.charAt(0)
          )}
        </span>
        <span className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-[15px] font-medium text-[var(--fg)]">
            {role.projectSlug ? (
              <Link
                href={`/work/${role.projectSlug}`}
                onClick={(e) => e.stopPropagation()}
                className="hover:text-[var(--accent)]"
              >
                {role.company}
              </Link>
            ) : (
              role.company
            )}
            {role.tag && (
              <span className="ml-1 font-normal text-[var(--fg-faint)]">
                ({role.tag})
              </span>
            )}
          </span>
          <span className="text-sm text-[var(--fg-muted)]">{role.role}</span>
        </span>
        <span className="ml-auto shrink-0 text-sm text-[var(--fg-faint)]">
          {formatDateRange(role)}
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="ml-12 mt-3 space-y-2 pb-1">
            {role.bullets.map((b, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-[var(--fg-muted)]">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--fg-faint)]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}
