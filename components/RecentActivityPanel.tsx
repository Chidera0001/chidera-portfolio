"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { LoggedActivity } from "@/lib/activityFeed";
import { flagFootballGallery } from "@/lib/data";
import {
  formatDistanceKm,
  formatDuration,
  formatPacePerKm,
  formatActivityDate,
} from "@/lib/activityFormat";
import { ActivityBadge } from "@/components/ActivityBadge";
import { MapThumbnail } from "@/components/MapThumbnail";
import { StravaEmbed } from "@/components/StravaEmbed";

// A fixed height (not max-height) keeps every card the same length
// regardless of each image's own aspect ratio — width still adapts to fit,
// so nothing gets cropped.
const MEDIA_CLASS =
  "mx-auto mt-3 block h-[380px] w-auto max-w-full rounded-xl border border-[var(--border)] object-contain";

function ActivityImage({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);
  if (errored) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} onError={() => setErrored(true)} className={MEDIA_CLASS} />
  );
}

function ActivityMedia({ activity }: { activity: LoggedActivity }) {
  if (activity.imageUrl) {
    return (
      <ActivityImage src={activity.imageUrl} alt={`Strava stats card for ${activity.name}`} />
    );
  }

  if (activity.activityId) {
    return <StravaEmbed activityId={activity.activityId} />;
  }

  const type = activity.type.toLowerCase();

  if (type.includes("flag") && flagFootballGallery.length > 0) {
    // No Strava data for flag football days — cycle through the real
    // flag football gallery instead, picked deterministically by day so it
    // doesn't reshuffle on every render.
    const dayOfMonth = parseInt(activity.dayKey.slice(-2), 10) || 0;
    const photo = flagFootballGallery[dayOfMonth % flagFootballGallery.length];
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={photo} alt={`Flag football — ${activity.name}`} className={MEDIA_CLASS} />
    );
  }

  if (type.includes("soccer")) {
    return (
      <video
        src="/featured/soccer-juggling.mp4"
        poster="/featured/soccer-juggling-poster.jpg"
        controls
        playsInline
        className={MEDIA_CLASS}
      />
    );
  }

  if (type.includes("pitch") || type.includes("swift haven")) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img src="/featured/swift-haven-pitch-day.jpg" alt="Swift Haven pitch day" className={MEDIA_CLASS} />
    );
  }

  if (activity.mapUrl) {
    return <MapThumbnail src={activity.mapUrl} alt={`Route map for ${activity.name}`} />;
  }

  return null;
}

function daysBetween(minDate: string, maxDate: string): string[] {
  const days: string[] = [];
  let cur = new Date(`${minDate}T00:00:00Z`);
  const end = new Date(`${maxDate}T00:00:00Z`);
  while (cur.getTime() <= end.getTime()) {
    days.push(cur.toISOString().slice(0, 10));
    cur = new Date(cur.getTime() + 86400000);
  }
  return days;
}

function DaySlide({
  dayKey,
  activity,
  width,
  style,
}: {
  dayKey: string;
  activity: LoggedActivity | null;
  width: number;
  style: CSSProperties;
}) {
  if (!activity) {
    return (
      <div
        style={{ width, ...style }}
        className="flex min-h-[200px] shrink-0 snap-center flex-col items-center justify-center px-1 text-center"
      >
        <p className="text-sm text-[var(--fg-muted)]">
          Nothing logged on {formatActivityDate(dayKey)}.
        </p>
      </div>
    );
  }

  return (
    <div style={{ width, ...style }} className="shrink-0 snap-center px-1">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-raised)] p-4">
        <div className="flex items-center gap-2">
          <ActivityBadge
            type={activity.type}
            label={
              activity.type.includes("/") ? (
                <>
                  <span className="sm:hidden">{activity.type.split("/").pop()!.trim()}</span>
                  <span className="hidden sm:inline">{activity.type}</span>
                </>
              ) : undefined
            }
          />
          <span className="text-sm text-[var(--fg)]">{activity.name}</span>
        </div>
        <div className="mt-1.5 flex items-start justify-between gap-3">
          <p className="text-xs text-[var(--fg-faint)]">{formatActivityDate(activity.date)}</p>
          <div className="shrink-0 text-right text-sm text-[var(--fg-muted)]">
            <div>{formatDistanceKm(activity.distanceKm)}</div>
            {!activity.imageUrl && !activity.activityId && (
              <div className="text-xs text-[var(--fg-faint)]">
                {formatDuration(activity.durationMin)}
                {formatPacePerKm(activity.distanceKm, activity.durationMin)
                  ? ` · ${formatPacePerKm(activity.distanceKm, activity.durationMin)}`
                  : ""}
              </div>
            )}
            {activity.stravaUrl && (
              <a
                href={activity.stravaUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-block text-xs text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-2 hover:decoration-[var(--accent)]"
              >
                View on Strava ↗
              </a>
            )}
          </div>
        </div>
        <ActivityMedia activity={activity} />
      </div>
    </div>
  );
}

const GAP = 16; // px, matches the flex gap below

export function RecentActivityPanel({
  activities,
  minDate,
  maxDate,
}: {
  activities: LoggedActivity[];
  minDate: string;
  maxDate: string;
}) {
  const days = useMemo(() => daysBetween(minDate, maxDate), [minDate, maxDate]);
  const activityByDay = useMemo(() => {
    const map = new Map<string, LoggedActivity>();
    for (const a of activities) map.set(a.dayKey, a);
    return map;
  }, [activities]);

  const defaultDayKey = activities[0]?.dayKey ?? maxDate;
  const [selectedDate, setSelectedDate] = useState(defaultDayKey);
  const [slideWidth, setSlideWidth] = useState(460);
  const [scrollProgress, setScrollProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const unit = slideWidth + GAP;
  const sidePadding = Math.max(0, ((wrapperRef.current?.clientWidth ?? slideWidth) - slideWidth) / 2);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    function measure() {
      const containerWidth = wrapper!.clientWidth;
      setSlideWidth(Math.max(260, Math.min(520, containerWidth * 0.84)));
    }
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const index = Math.max(0, days.indexOf(defaultDayKey));
    el.scrollLeft = index * unit;
    setScrollProgress(index);
    // Only jump to the initial slide once slide width is known.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideWidth]);

  function scrollToIndex(index: number) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: index * unit, behavior: "smooth" });
  }

  function handleDateChange(newDate: string) {
    setSelectedDate(newDate);
    const index = days.indexOf(newDate);
    if (index !== -1) scrollToIndex(index);
  }

  function handleScroll() {
    const el = trackRef.current;
    if (!el || unit === 0) return;
    const progress = el.scrollLeft / unit;
    setScrollProgress(progress);
    const index = Math.round(progress);
    const day = days[index];
    if (day && day !== selectedDate) setSelectedDate(day);
  }

  function step(delta: number) {
    const currentIndex = Math.max(0, days.indexOf(selectedDate));
    const nextIndex = Math.min(days.length - 1, Math.max(0, currentIndex + delta));
    handleDateChange(days[nextIndex]);
  }

  const currentIndex = days.indexOf(selectedDate);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.14em] text-[var(--fg-faint)]">
          Recent activity
        </p>
        <input
          type="date"
          min={minDate}
          max={maxDate}
          value={selectedDate}
          onChange={(e) => handleDateChange(e.target.value)}
          className="rounded-lg border border-[var(--border)] bg-[var(--bg-raised)] px-2.5 py-1 text-xs text-[var(--fg)]"
        />
      </div>

      <div ref={wrapperRef} className="relative mt-4">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          style={{ paddingLeft: sidePadding, paddingRight: sidePadding }}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {days.map((day, i) => {
            const distance = Math.min(Math.abs(i - scrollProgress), 2);
            return (
              <DaySlide
                key={day}
                dayKey={day}
                activity={activityByDay.get(day) ?? null}
                width={slideWidth}
                style={{
                  transform: `scale(${1 - 0.12 * distance})`,
                  opacity: 1 - 0.45 * distance,
                  filter: distance > 0.05 ? `blur(${distance * 3}px)` : undefined,
                }}
              />
            );
          })}
        </div>

        {days.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={currentIndex <= 0}
              aria-label="Previous day"
              className="absolute left-1 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-raised)] text-[var(--fg-muted)] shadow-md transition hover:text-[var(--fg)] disabled:pointer-events-none disabled:opacity-0 sm:flex"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={currentIndex >= days.length - 1}
              aria-label="Next day"
              className="absolute right-1 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-raised)] text-[var(--fg-muted)] shadow-md transition hover:text-[var(--fg)] disabled:pointer-events-none disabled:opacity-0 sm:flex"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
