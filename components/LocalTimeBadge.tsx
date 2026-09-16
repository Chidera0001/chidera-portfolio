"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";
import { getCurrentActivity } from "@/lib/schedule";

export function LocalTimeBadge() {
  const [time, setTime] = useState("");
  const [activity, setActivity] = useState("");

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: profile.timezone,
        }).format(now)
      );
      setActivity(getCurrentActivity(now));
    }
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="flex items-center gap-1 text-sm text-[var(--fg-faint)] transition-colors duration-200 hover:text-[var(--fg)]"
      >
        <span>
          {time} · {profile.timezoneLabel}
        </span>
      </button>

      <div className="pointer-events-none absolute left-full top-[-8px] z-10 ml-4 hidden min-[1240px]:block">
        <div>
          <div className="flex items-start gap-2.5">
            <svg
              width="54"
              height="32"
              viewBox="0 0 54 32"
              fill="none"
              className="mt-1 shrink-0"
              aria-hidden
            >
              <path
                d="M 50 26 C 38 6, 18 4, 3 14"
                stroke="var(--note)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 12 7 L 3 14 L 11 21"
                stroke="var(--note)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="w-56 leading-[1.3]">
              <p className="font-handwriting text-lg font-bold leading-tight text-[var(--note)]">
                01 / Local time
              </p>
              <div className="mt-1 text-[17px] font-medium leading-snug text-[var(--note)] opacity-90">
                <p className="font-handwriting">Live from Kigali (UTC+2).</p>
                <p className="font-handwriting mt-0.5">{activity}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
