"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import type { FeaturedUpdate } from "@/lib/data";

export function FeaturedCard({
  update,
  onOpen,
}: {
  update: FeaturedUpdate;
  onOpen: (startIndex: number) => void;
}) {
  const images = update.images ?? [];
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => {
      setImgIndex((i) => (i + 1) % images.length);
    }, 4000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(imgIndex)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpen(imgIndex);
      }}
      className="group w-72 shrink-0 cursor-pointer snap-start overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-raised)] text-left"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--bg)]">
        <span className="absolute left-3 top-3 z-10 rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white">
          {update.kind}
        </span>

        {update.video && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={update.video.poster}
              alt={update.title}
              className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/55 text-white transition group-hover:bg-black/70">
                <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
              </span>
            </span>
          </>
        )}

        {images.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt={update.title}
            className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ${
              i === imgIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="p-4">
        <p className="text-xs text-[var(--fg-faint)]">{update.date}</p>
        <h3 className="mt-1 text-[15px] font-semibold leading-snug tracking-tight">
          {update.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--fg-muted)]">
          {update.body}
        </p>
        {update.link && (
          <a
            href={update.link.href}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-2 inline-block text-sm text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-2 hover:decoration-[var(--accent)]"
          >
            {update.link.label} ↗
          </a>
        )}
      </div>
    </div>
  );
}
