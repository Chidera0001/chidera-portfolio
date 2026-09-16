export function StravaEmbed({ activityId }: { activityId: string }) {
  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-[var(--border)] bg-white">
      <div
        className="strava-embed-placeholder"
        data-embed-type="activity"
        data-embed-id={activityId}
        data-style="standard"
      />
    </div>
  );
}
