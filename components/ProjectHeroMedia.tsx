"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { VideoLightbox } from "@/components/VideoLightbox";

export function ProjectHeroMedia({
  image,
  alt,
  video,
  fit = "cover",
  background,
}: {
  image: string;
  alt: string;
  video?: string;
  fit?: "cover" | "contain";
  background?: string;
}) {
  const [open, setOpen] = useState(false);
  // Padding only makes sense when there's a background to show through —
  // otherwise it just shrinks the image for no reason.
  const containPadding = background ? "p-6 sm:p-10" : "";
  const imageClass =
    fit === "contain"
      ? `h-full w-full object-contain transition duration-500 group-hover:scale-[1.02] ${containPadding}`
      : "h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]";

  return (
    <div
      className="relative mt-8 aspect-[3/2] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-raised)]"
      style={{ background }}
    >
      {video ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Play video: ${alt}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={alt} className={imageClass} />
          <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition group-hover:bg-black/20">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/55 text-white transition group-hover:bg-black/70">
              <Play className="ml-1 h-6 w-6" fill="currentColor" />
            </span>
          </span>
        </button>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={alt} className={fit === "contain" ? imageClass : "h-full w-full object-cover"} />
      )}

      {open && video && (
        <VideoLightbox src={video} poster={image} onClose={() => setOpen(false)} />
      )}
    </div>
  );
}
