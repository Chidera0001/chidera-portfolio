"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import Script from "next/script";
import { Calendar } from "lucide-react";
import { CAL_NAMESPACE, CAL_LINK, calConfig, syncCalBranding } from "@/lib/cal";

const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function BookACall() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const theme = mounted ? resolvedTheme : undefined;

  useEffect(() => {
    if (!mounted) return;
    if (syncCalBranding(theme)) return;
    const id = setTimeout(() => syncCalBranding(theme), 500);
    return () => clearTimeout(id);
  }, [mounted, theme]);

  return (
    <>
      <Script id="cal-embed" strategy="afterInteractive">
        {`
          (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
          Cal("init", "${CAL_NAMESPACE}", {origin:"https://app.cal.com"});
          Cal.config = Cal.config || {};
          Cal.config.forwardQueryParams = true;
          Cal.ns["${CAL_NAMESPACE}"]("ui", ${JSON.stringify(calConfig(undefined))});
        `}
      </Script>

      <button
        type="button"
        data-cal-link={CAL_LINK}
        data-cal-namespace={CAL_NAMESPACE}
        data-cal-config={JSON.stringify(calConfig(theme))}
        aria-label="Book a call"
        className="group fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--cal-bg)] text-[var(--cal-icon)] shadow-lg transition hover:opacity-90"
      >
        <Calendar className="h-5 w-5" strokeWidth={1.75} />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md border border-[var(--border)] bg-[var(--bg-raised)] px-2.5 py-1.5 text-xs text-[var(--fg)] opacity-0 shadow-md transition group-hover:opacity-100">
          Book a call
        </span>
      </button>
    </>
  );
}
