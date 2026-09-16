export const CAL_NAMESPACE = "30min";
export const CAL_LINK = "anele-chidera-enoeyz/30min";

function brandColor(theme: string | undefined) {
  return theme === "light" ? "#b3552f" : "#e08a5c";
}

// Flat params only — Cal's element-click embed serializes this config into the
// modal iframe's URL query string, which silently drops nested objects
// (e.g. styles.branding.brandColor becomes the literal string "[object Object]").
export function calConfig(theme: string | undefined) {
  return {
    layout: "month_view",
    useSlotsViewOnSmallScreen: "true",
    hideEventTypeDetails: false,
    theme: theme === "light" ? "light" : "dark",
  };
}

type CalFn = (...args: unknown[]) => void;
function getCalNamespace(): CalFn | undefined {
  const cal = (window as unknown as { Cal?: { ns?: Record<string, CalFn> } }).Cal;
  return cal?.ns?.[CAL_NAMESPACE];
}

// Brand color has to go through the "ui" command (delivered via postMessage
// once the iframe exists) rather than the URL, so it's kept in sync with the
// site's theme separately from calConfig above.
export function syncCalBranding(theme: string | undefined): boolean {
  const fn = getCalNamespace();
  if (!fn) return false;
  fn("ui", {
    theme: theme === "light" ? "light" : "dark",
    styles: { branding: { brandColor: brandColor(theme) } },
    hideEventTypeDetails: false,
    layout: "month_view",
  });
  return true;
}

export function openCalModal(theme: string | undefined) {
  const fn = getCalNamespace();
  fn?.("modal", {
    calLink: CAL_LINK,
    config: calConfig(theme),
  });
}
