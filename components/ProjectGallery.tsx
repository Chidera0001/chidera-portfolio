"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { GalleryItem } from "@/lib/data";
import { VideoLightbox } from "@/components/VideoLightbox";

export function ProjectGallery({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  if (items.length === 0) return null;
  const current = items[index];

  function goTo(i: number) {
    setIndex(i);
    setVideoOpen(false);
  }

  function step(delta: number) {
    goTo((index + delta + items.length) % items.length);
  }

  return (
    <div className="mt-12">
      <h2 className="text-xs uppercase tracking-[0.14em] text-[var(--fg-faint)]">more</h2>

      <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-raised)] p-4 sm:p-6">
        {current.video ? (
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            className="group relative mx-auto block"
            aria-label={`Play video: ${current.caption}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.image}
              alt={current.caption}
              className="mx-auto block max-h-[520px] w-auto max-w-full rounded-xl border border-[var(--border)] transition duration-500 group-hover:scale-[1.01]"
            />
            <span className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/10 transition group-hover:bg-black/20">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/55 text-white transition group-hover:bg-black/70">
                <Play className="ml-1 h-5 w-5" fill="currentColor" />
              </span>
            </span>
          </button>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={current.image}
            alt={current.caption}
            className="mx-auto block max-h-[520px] w-auto max-w-full rounded-xl border border-[var(--border)]"
          />
        )}
      </div>

      {videoOpen && current.video && (
        <VideoLightbox
          src={current.video}
          poster={current.image}
          onClose={() => setVideoOpen(false)}
        />
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[var(--fg-muted)]">{current.caption}</p>

        {items.length > 1 && (
          <div className="flex shrink-0 items-center gap-3 text-sm text-[var(--fg-faint)]">
            <span className="whitespace-nowrap">
              {index + 1} / {items.length}
            </span>
            <div className="flex items-center gap-1.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-5 bg-[var(--accent)]" : "w-1.5 bg-[var(--border)]"
                  }`}
                />
              ))}
            </div>
            <div className="ml-1 flex items-center gap-1 border-l border-[var(--border)] pl-3">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous screenshot"
                className="rounded-full p-1 text-[var(--fg-muted)] transition hover:text-[var(--fg)]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next screenshot"
                className="rounded-full p-1 text-[var(--fg-muted)] transition hover:text-[var(--fg)]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {items.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {items.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show screenshot ${i + 1}`}
              className={`shrink-0 overflow-hidden rounded-lg border-2 transition ${
                i === index ? "border-[var(--accent)]" : "border-transparent"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt=""
                className="h-16 w-24 object-cover sm:h-20 sm:w-28"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
