import "server-only";

// Data source: a Google Sheet (published to web as CSV), filled in by hand
// after each activity since Strava no longer offers a free automated bridge
// (their API now requires a paid subscription, and Zapier/Make/IFTTT have
// all dropped or paywalled the "new activity" trigger).
//
// Minimum header row (case-insensitive columns):
//   date          <- the activity's date
//   type          <- Run, Walk, Soccer, etc.
//   distance_km   <- distance in km (needed for the 5K challenge total —
//                     distance_m in raw meters also accepted)
//   strava_url    <- the activity's Strava link, e.g.
//                     https://www.strava.com/activities/1234567890
//   image_url     <- (recommended) a direct link to Strava's own shareable
//                     stats-card image for the activity — the one people
//                     post to Instagram (Activity → Share → save the image,
//                     upload it to imgur.com, paste the direct link here).
//
// strava_url is used as a "View on Strava" link, and — since the numeric
// activity ID it contains can drive Strava's own official embed widget (see
// components/StravaEmbed.tsx) — as an attempt at a live map + pace + time
// embed pulled straight from Strava. In practice that embed can fail even
// when the activity and profile are set to "Everyone" (a Strava-side
// quirk/outage, not something this site controls), so image_url takes
// priority whenever both are present: it's a plain image, so it can't break
// the way the live embed can.
//
// duration_min / duration_sec and map_url are still accepted as a legacy
// fallback for rows without a strava_url or image_url.

export type LoggedActivity = {
  date: string; // as parsed from the sheet, ISO-ish
  dayKey: string; // YYYY-MM-DD, used for challenge day-counting
  type: string;
  name: string;
  distanceKm: number;
  durationMin: number | null;
  stravaUrl: string | null;
  activityId: string | null; // parsed out of stravaUrl, for the embed widget
  imageUrl: string | null; // direct link to a saved Strava share-card image
  mapUrl: string | null;
};

function extractStravaActivityId(url: string | null): string | null {
  if (!url) return null;
  const match = url.match(/strava\.com\/activities\/(\d+)/);
  return match ? match[1] : null;
}

// Imgur's page URL (imgur.com/<id>) isn't a hotlinkable image — only its CDN
// subdomain (i.imgur.com/<id>.<ext>) is. Imgur serves the real file
// regardless of the extension in the URL, so defaulting to .jpg here is
// enough to turn a pasted page link into something an <img> tag can use.
function normalizeImageUrl(url: string | null): string | null {
  if (!url) return null;
  const pageMatch = url.match(/^https?:\/\/(?:www\.)?imgur\.com\/([A-Za-z0-9]+)$/);
  if (pageMatch) return `https://i.imgur.com/${pageMatch[1]}.jpg`;
  return url;
}

type FeedResult =
  | { ok: true; activities: LoggedActivity[] }
  | { ok: false; reason: string };

const RUN_WALK_TYPES = new Set([
  "run",
  "walk",
  "hike",
  "trailrun",
  "virtualrun",
  "jog",
]);

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && next === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim().length > 0));
}

function parseNumber(raw: string | undefined): number | null {
  if (!raw) return null;
  const cleaned = raw.replace(/[^0-9.\-]/g, "");
  const value = parseFloat(cleaned);
  return Number.isFinite(value) ? value : null;
}

function parseDurationMin(raw: string | undefined): number | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;

  // HH:MM:SS or MM:SS
  if (trimmed.includes(":")) {
    const parts = trimmed.split(":").map((p) => parseInt(p, 10));
    if (parts.some((p) => Number.isNaN(p))) return null;
    if (parts.length === 3) return parts[0] * 60 + parts[1] + parts[2] / 60;
    if (parts.length === 2) return parts[0] + parts[1] / 60;
    return null;
  }

  return parseNumber(trimmed);
}

function toDayKey(dateStr: string): string | null {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

function parseActivityCsv(text: string): LoggedActivity[] {
  const rows = parseCsv(text);
  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.trim().toLowerCase());
  const idx = {
    date: headers.indexOf("date"),
    type: headers.indexOf("type"),
    name: headers.indexOf("name"),
    distanceKm: headers.indexOf("distance_km"),
    distanceM: headers.indexOf("distance_m"),
    durationMin: headers.indexOf("duration_min"),
    durationSec: headers.indexOf("duration_sec"),
    stravaUrl: headers.indexOf("strava_url"),
    imageUrl: headers.indexOf("image_url"),
    mapUrl: headers.indexOf("map_url"),
  };

  const activities: LoggedActivity[] = [];

  for (const row of rows.slice(1)) {
    if (idx.date === -1 || idx.type === -1) continue;
    if (idx.distanceKm === -1 && idx.distanceM === -1) continue;

    const rawDate = row[idx.date]?.trim();
    const rawType = row[idx.type]?.trim();
    if (!rawDate || !rawType) continue;

    const dayKey = toDayKey(rawDate);
    if (!dayKey) continue;

    let distanceKm: number | null = null;
    if (idx.distanceM !== -1) {
      const meters = parseNumber(row[idx.distanceM]);
      distanceKm = meters !== null ? meters / 1000 : null;
    } else if (idx.distanceKm !== -1) {
      distanceKm = parseNumber(row[idx.distanceKm]);
    }
    if (distanceKm === null) continue;

    let durationMin: number | null = null;
    if (idx.durationSec !== -1) {
      const seconds = parseNumber(row[idx.durationSec]);
      durationMin = seconds !== null ? seconds / 60 : null;
    } else if (idx.durationMin !== -1) {
      durationMin = parseDurationMin(row[idx.durationMin]);
    }

    const stravaUrl = idx.stravaUrl !== -1 ? row[idx.stravaUrl]?.trim() || null : null;

    activities.push({
      date: rawDate,
      dayKey,
      type: rawType,
      name: idx.name !== -1 ? row[idx.name]?.trim() || rawType : rawType,
      distanceKm,
      durationMin,
      stravaUrl,
      activityId: extractStravaActivityId(stravaUrl),
      imageUrl: normalizeImageUrl(idx.imageUrl !== -1 ? row[idx.imageUrl]?.trim() || null : null),
      mapUrl: idx.mapUrl !== -1 ? row[idx.mapUrl]?.trim() || null : null,
    });
  }

  return activities.sort((a, b) => (a.dayKey < b.dayKey ? 1 : -1));
}

export async function getRecentActivities(): Promise<FeedResult> {
  const url = process.env.ACTIVITY_FEED_CSV_URL;
  if (!url) {
    return { ok: false, reason: "Activity feed isn't connected yet." };
  }

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) {
      return { ok: false, reason: `Couldn't load the activity feed (${res.status}).` };
    }
    const text = await res.text();
    return { ok: true, activities: parseActivityCsv(text) };
  } catch {
    return { ok: false, reason: "Couldn't reach the activity feed right now." };
  }
}

export type ChallengeProgress = {
  daysDone: number;
  daysElapsed: number;
  daysTarget: number;
  totalDistanceKm: number;
};

export function getChallengeProgress(activities: LoggedActivity[]): ChallengeProgress {
  const now = new Date();
  const isCurrentYearSeptember = now.getUTCMonth() === 8;
  const septemberYear = now.getUTCFullYear();

  const inSeptember = activities.filter((a) => {
    const year = parseInt(a.dayKey.slice(0, 4), 10);
    const month = parseInt(a.dayKey.slice(5, 7), 10);
    return year === septemberYear && month === 9;
  });
  const qualifying = inSeptember.filter((a) => RUN_WALK_TYPES.has(a.type.toLowerCase()));

  const dayKeys = new Set(qualifying.map((a) => a.dayKey));
  // Every logged day's distance counts toward the month total, not just
  // Run/Walk days — Soccer and other activities still covered real ground.
  const totalDistanceKm = inSeptember.reduce((sum, a) => sum + a.distanceKm, 0);

  const daysTarget = 30;
  let daysElapsed = 0;
  if (isCurrentYearSeptember) {
    daysElapsed = now.getUTCDate();
  } else if (now.getUTCMonth() > 8) {
    daysElapsed = daysTarget;
  }

  return {
    daysDone: dayKeys.size,
    daysElapsed,
    daysTarget,
    totalDistanceKm: Math.round(totalDistanceKm * 10) / 10,
  };
}

