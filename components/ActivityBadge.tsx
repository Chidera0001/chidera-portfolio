import type { ReactNode } from "react";

const TAG_STYLES: Record<string, string> = {
  Run: "bg-[var(--accent-soft)] text-[var(--accent)]",
  TrailRun: "bg-[var(--accent-soft)] text-[var(--accent)]",
  VirtualRun: "bg-[var(--accent-soft)] text-[var(--accent)]",
  Walk: "bg-[var(--tag-green-bg)] text-[var(--tag-green-fg)]",
  Hike: "bg-[var(--tag-green-bg)] text-[var(--tag-green-fg)]",
  Soccer: "bg-[var(--tag-blue-bg)] text-[var(--tag-blue-fg)]",
  AmericanFootball: "bg-[var(--tag-blue-bg)] text-[var(--tag-blue-fg)]",
  Workout: "bg-[var(--tag-purple-bg)] text-[var(--tag-purple-fg)]",
  WeightTraining: "bg-[var(--tag-purple-bg)] text-[var(--tag-purple-fg)]",
  Crossfit: "bg-[var(--tag-purple-bg)] text-[var(--tag-purple-fg)]",
  TableTennis: "bg-[var(--tag-pink-bg)] text-[var(--tag-pink-fg)]",
};

const DEFAULT_STYLE = "bg-[var(--bg)] text-[var(--fg-muted)] border border-[var(--border)]";

export function ActivityBadge({
  type,
  label,
}: {
  type: string;
  label?: ReactNode;
}) {
  const style = TAG_STYLES[type] ?? DEFAULT_STYLE;
  return (
    <span className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${style}`}>
      {label ?? type}
    </span>
  );
}
