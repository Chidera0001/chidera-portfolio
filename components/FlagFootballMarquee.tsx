"use client";

import { useState } from "react";
import { ImageLightbox } from "@/components/ImageLightbox";

export function FlagFootballMarquee({ images }: { images: string[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <p className="text-sm text-[var(--fg-muted)]">
        Photos from Sunday games coming soon.
      </p>
    );
  }

  return (
    <>
      <div
        className="marquee-track relative w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
        }}
      >
        <div
          className="animate-marquee-slow flex w-max items-center gap-4"
          style={{ animationPlayState: openIndex !== null ? "paused" : undefined }}
        >
          {[...images, ...images].map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setOpenIndex(i % images.length)}
              className="block shrink-0 cursor-pointer"
              aria-label="Open photo"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className="h-64 w-80 shrink-0 rounded-xl border border-[var(--border)] object-cover object-top transition duration-300 hover:opacity-90 sm:h-72 sm:w-[26rem]"
              />
            </button>
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <ImageLightbox
          images={images}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}
