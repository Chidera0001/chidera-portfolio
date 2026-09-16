import type { Metadata } from "next";
import Script from "next/script";
import { SiteFooter } from "@/components/SiteFooter";
import { CommandPalette } from "@/components/CommandPalette";
import { ActivityBadge } from "@/components/ActivityBadge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { RecentActivityPanel } from "@/components/RecentActivityPanel";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { FlagFootballMarquee } from "@/components/FlagFootballMarquee";
import { profile, featuredUpdates, flagFootballGallery } from "@/lib/data";
import { getRecentActivities, getChallengeProgress } from "@/lib/activityFeed";
import Link from "next/link";

export const revalidate = 60;

export const metadata: Metadata = {
  title: `Outside 9-5 · ${profile.name}`,
  description: "What Chidera is up to right now — including a live September 5K Challenge tracker.",
};

export default async function OutsideNineToFivePage() {
  const result = await getRecentActivities();
  const challenge = result.ok ? getChallengeProgress(result.activities) : null;
  const activities = result.ok ? result.activities : [];
  const latestType = activities[0]?.type ?? "Run";

  const now = new Date();
  const septYear = now.getUTCFullYear();
  const todayKey = now.toISOString().slice(0, 10);
  const septMin = `${septYear}-09-01`;
  const septMax = `${septYear}-09-30`;
  const maxSelectableDate = todayKey > septMax ? septMax : todayKey < septMin ? septMin : todayKey;

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-12 sm:py-16">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-sm text-[var(--fg-muted)] transition hover:text-[var(--fg)]">
          ← portfolio
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <CommandPalette />
        </div>
      </div>

      <h1 className="mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">Outside 9-5</h1>
      <p className="mt-3 max-w-xl text-[var(--fg-muted)]">
        What I am up to lately — on the product side and off it. The tracker below
        pulls from my Strava activity feed, so it updates the day I log a run or walk.
      </p>

      {/* Featured */}
      {featuredUpdates.length > 0 && (
        <div className="mt-10">
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--fg-faint)]">
            Featured
          </p>
          <div className="mt-4">
            <FeaturedCarousel updates={featuredUpdates} />
          </div>
        </div>
      )}

      {/* September 5K Challenge */}
      <div className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--bg-raised)] p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--fg-faint)]">
              Currently
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight">
              September 5K Challenge
            </h2>
          </div>
          <ActivityBadge type={latestType} />
        </div>

        {!result.ok || !challenge ? (
          <p className="mt-6 text-sm text-[var(--fg-muted)]">
            {result.ok ? "" : result.reason} Still wiring up the activity feed — check
            back soon.
          </p>
        ) : (
          <div className="mt-6">
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-[var(--fg)]">
                Day {challenge.daysElapsed} of {challenge.daysTarget}
              </span>
              <span className="text-[var(--fg-muted)]">
                {challenge.totalDistanceKm} km logged this month
              </span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[var(--bg)]">
              <div
                className="h-full rounded-full bg-[var(--accent)] transition-all"
                style={{
                  width: `${Math.min(
                    100,
                    (challenge.daysDone / challenge.daysTarget) * 100
                  )}%`,
                }}
              />
            </div>
            <p className="mt-3 text-sm text-[var(--fg-muted)]">
              Run, walk, or jog 5K every day in September — {challenge.daysElapsed} days in.
            </p>
          </div>
        )}
      </div>

      {/* Recent activity feed */}
      <div className="mt-12">
        {!result.ok ? (
          <>
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--fg-faint)]">
              Recent activity
            </p>
            <p className="mt-4 text-sm text-[var(--fg-muted)]">{result.reason}</p>
          </>
        ) : activities.length === 0 ? (
          <>
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--fg-faint)]">
              Recent activity
            </p>
            <p className="mt-4 text-sm text-[var(--fg-muted)]">
              Nothing logged yet this month.
            </p>
          </>
        ) : (
          <RecentActivityPanel
            activities={activities}
            minDate={septMin}
            maxDate={maxSelectableDate}
          />
        )}
      </div>

      <Script src="https://strava-embeds.com/embed.js" strategy="afterInteractive" />

      {/* Flag football gallery */}
      <div className="mt-12">
        <p className="text-xs uppercase tracking-[0.14em] text-[var(--fg-faint)]">
          Flag football
        </p>
        <div className="mt-4">
          <FlagFootballMarquee images={flagFootballGallery} />
        </div>
      </div>

      {/* Off the field */}
      <div className="mt-12">
        <p className="text-xs uppercase tracking-[0.14em] text-[var(--fg-faint)]">
          Also on rotation
        </p>
        <ul className="mt-4 space-y-3">
          <li className="flex items-start gap-3 text-sm text-[var(--fg-muted)]">
            <ActivityBadge type="Soccer" />
            <span>Weekly soccer and flag football with friends in Kigali.</span>
          </li>
          <li className="flex items-start gap-3 text-sm text-[var(--fg-muted)]">
            <ActivityBadge type="TableTennis" />
            <span>
              Backhand is better than fronthand, if you can use both...let&apos;s play.
            </span>
          </li>
          <li className="flex items-start gap-3 text-sm text-[var(--fg-muted)]">
            <ActivityBadge type="Workout" />
            <span>Gym is my safe space, still chasing my 20 straight pull-ups goal.</span>
          </li>
        </ul>
      </div>

      <SiteFooter />
    </main>
  );
}
