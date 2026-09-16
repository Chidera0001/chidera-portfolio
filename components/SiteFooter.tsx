import { profile } from "@/lib/data";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-[var(--border)] py-8 text-xs text-[var(--fg-faint)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span>Last updated · {new Date().toLocaleString("en-US", { month: "long", year: "numeric" })}</span>
        <span className="hidden sm:inline">⌘K to jump around</span>
        <span className="sm:hidden">Tap &ldquo;Quick jump&rdquo; to jump around</span>
        <span>© {year} {profile.name}</span>
      </div>
    </footer>
  );
}
