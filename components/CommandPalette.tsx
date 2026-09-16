"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { profile } from "@/lib/data";
import { projects } from "@/lib/data";
import { openCalModal } from "@/lib/cal";

type Item = {
  label: string;
  hint: string;
  action: () => void;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function go(href: string) {
    setOpen(false);
    if (href.startsWith("mailto:") || href.endsWith(".pdf")) {
      window.location.assign(href);
      return;
    }
    router.push(href);
  }

  const navItems: Item[] = [
    { label: "Home", hint: "top of the page", action: () => go("/#top") },
    { label: "Outside 9-5", hint: "what I am up to", action: () => go("/outside-9-5") },
    { label: "Selected work", hint: "jump to projects", action: () => go("/#work") },
    { label: "Experience", hint: "roles", action: () => go("/#experience") },
    { label: "Toolkit", hint: "skills", action: () => go("/#toolkit") },
    { label: "Say hi", hint: "contact and links", action: () => go("/#say-hi") },
    { label: "Résumé", hint: "view online résumé", action: () => go("/resume") },
    { label: "Download résumé", hint: "PDF", action: () => go("/resume.pdf") },
  ];

  const projectItems: Item[] = projects.map((p) => ({
    label: p.name,
    hint: "case study",
    action: () => go(`/work/${p.slug}`),
  }));

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-raised)] px-4 py-2 text-sm text-[var(--fg)] transition hover:border-[var(--fg-faint)]"
      >
        Quick jump
        <kbd className="hidden rounded border border-[var(--border)] bg-[var(--bg)] px-1.5 py-0.5 text-[11px] text-[var(--fg-muted)] sm:inline">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[12vh]"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-raised)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Command label="Command palette" loop>
              <Command.Input
                autoFocus
                placeholder="Type a command or search..."
                className="w-full border-b border-[var(--border)] bg-transparent px-4 py-3.5 text-sm text-[var(--fg)] outline-none placeholder:text-[var(--fg-faint)]"
              />
              <Command.List className="max-h-80 overflow-y-auto p-2">
                <Command.Empty className="px-3 py-6 text-center text-sm text-[var(--fg-muted)]">
                  No results.
                </Command.Empty>
                <Command.Group heading="Navigate" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-[var(--fg-faint)]">
                  {navItems.map((item) => (
                    <Command.Item
                      key={item.label}
                      onSelect={item.action}
                      className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm text-[var(--fg)] data-[selected=true]:bg-[var(--bg)]"
                    >
                      <span>{item.label}</span>
                      <span className="text-xs text-[var(--fg-faint)]">{item.hint}</span>
                    </Command.Item>
                  ))}
                </Command.Group>
                <Command.Group heading="Projects" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-[var(--fg-faint)]">
                  {projectItems.map((item) => (
                    <Command.Item
                      key={item.label}
                      onSelect={item.action}
                      className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm text-[var(--fg)] data-[selected=true]:bg-[var(--bg)]"
                    >
                      <span>{item.label}</span>
                      <span className="text-xs text-[var(--fg-faint)]">{item.hint}</span>
                    </Command.Item>
                  ))}
                </Command.Group>
                <Command.Group heading="Contact" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-[var(--fg-faint)]">
                  <Command.Item
                    onSelect={() => go(`mailto:${profile.email}`)}
                    className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm text-[var(--fg)] data-[selected=true]:bg-[var(--bg)]"
                  >
                    <span>Email {profile.shortName}</span>
                    <span className="text-xs text-[var(--fg-faint)]">{profile.email}</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => {
                      setOpen(false);
                      openCalModal(resolvedTheme);
                    }}
                    className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm text-[var(--fg)] data-[selected=true]:bg-[var(--bg)]"
                  >
                    <span>Book a call</span>
                    <span className="text-xs text-[var(--fg-faint)]">30 min · Cal.com</span>
                  </Command.Item>
                </Command.Group>
                <Command.Group heading="Appearance" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-[var(--fg-faint)]">
                  <Command.Item
                    onSelect={() => {
                      setOpen(false);
                      setTheme(resolvedTheme === "dark" ? "light" : "dark");
                    }}
                    className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm text-[var(--fg)] data-[selected=true]:bg-[var(--bg)]"
                  >
                    <span>Toggle theme</span>
                    <span className="text-xs text-[var(--fg-faint)]">
                      {resolvedTheme === "dark" ? "switch to light" : "switch to dark"}
                    </span>
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </div>
        </div>
      )}
    </>
  );
}
