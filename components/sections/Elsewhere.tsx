"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import type { ComponentType, SVGProps } from "react";
import { FileText, Send } from "lucide-react";
import { Section } from "@/components/Section";
import { profile, getIntroduceHref } from "@/lib/data";
import { CAL_NAMESPACE, CAL_LINK, calConfig } from "@/lib/cal";

const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

const linksBeforeCal = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: "/icons/gmail.svg",
  },
  {
    label: "LinkedIn",
    value: "Chidera Anele",
    href: profile.linkedin,
    icon: "/icons/linkedin.svg",
  },
  {
    label: "GitHub",
    value: "Chidera0001",
    href: profile.github,
    icon: "/icons/github.svg",
  },
];

const linksAfterCal = [
  {
    label: "Résumé",
    value: "View and download",
    href: "/resume",
    icon: null,
  },
  {
    label: "Introduce me",
    value: "Send this to someone hiring",
    href: getIntroduceHref(),
    icon: null,
    FallbackIcon: Send,
  },
];

function LinkRow({
  link,
}: {
  link: {
    label: string;
    value: string;
    href: string;
    icon: string | null;
    FallbackIcon?: ComponentType<SVGProps<SVGSVGElement>>;
  };
}) {
  const FallbackIcon = link.FallbackIcon ?? FileText;
  return (
    <li>
      <a
        href={link.href}
        target={link.href.startsWith("http") ? "_blank" : undefined}
        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
        className="group flex items-center gap-3 py-4 text-sm"
      >
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border)] transition duration-200 group-hover:scale-105 ${
            link.icon ? "bg-[var(--chip-bg)]" : "bg-[var(--bg-raised)]"
          }`}
        >
          {link.icon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={link.icon} alt="" className="h-4 w-4 object-contain" />
          ) : (
            <FallbackIcon className="h-4 w-4 text-[var(--fg-muted)]" strokeWidth={1.75} />
          )}
        </span>
        <span className="text-[var(--fg)] transition group-hover:underline">{link.label}</span>
        <span className="ml-auto text-[var(--fg-muted)] transition group-hover:text-[var(--accent)]">
          {link.value}
        </span>
      </a>
    </li>
  );
}

export function Elsewhere() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const theme = mounted ? resolvedTheme : undefined;

  return (
    <Section id="say-hi" eyebrow="say hi">
      <ul className="divide-y divide-[var(--border)] border-t border-[var(--border)]">
        {linksBeforeCal.map((link) => (
          <LinkRow key={link.label} link={link} />
        ))}
        <li>
          <button
            type="button"
            data-cal-link={CAL_LINK}
            data-cal-namespace={CAL_NAMESPACE}
            data-cal-config={JSON.stringify(calConfig(theme))}
            className="group flex w-full items-center gap-3 py-4 text-left text-sm"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--chip-bg)] transition duration-200 group-hover:scale-105">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/calcom.svg" alt="" className="h-4 w-4 object-contain" />
            </span>
            <span className="text-[var(--fg)] transition group-hover:underline">Cal</span>
            <span className="ml-auto text-[var(--fg-muted)] transition group-hover:text-[var(--accent)]">
              Book an intro call
            </span>
          </button>
        </li>
        {linksAfterCal.map((link) => (
          <LinkRow key={link.label} link={link} />
        ))}
      </ul>
    </Section>
  );
}
