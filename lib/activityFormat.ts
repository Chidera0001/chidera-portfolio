// Pure formatting helpers, split out from activityFeed.ts (which is
// server-only) so client components can format activity data too.

export function formatDistanceKm(km: number): string {
  return `${km.toFixed(1)} km`;
}

export function formatDuration(minutes: number | null): string | null {
  if (minutes === null) return null;
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export function formatPacePerKm(km: number, minutes: number | null): string | null {
  if (!minutes || km <= 0) return null;
  const paceMin = minutes / km;
  const m = Math.floor(paceMin);
  const s = Math.round((paceMin - m) * 60);
  return `${m}:${s.toString().padStart(2, "0")} /km`;
}

export function formatActivityDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(d);
}
