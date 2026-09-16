"use client";

import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function ImageLightbox({
  images,
  index,
  onIndexChange,
  onClose,
}: {
  images: string[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}) {
  const hasMultiple = images.length > 1;

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (hasMultiple && e.key === "ArrowRight") {
        onIndexChange((index + 1) % images.length);
      }
      if (hasMultiple && e.key === "ArrowLeft") {
        onIndexChange((index - 1 + images.length) % images.length);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [index, images.length, hasMultiple, onIndexChange, onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>

      <div
        className="relative flex max-h-[85vh] max-w-[92vw] items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[index]}
          alt=""
          className="max-h-[85vh] max-w-[92vw] rounded-lg object-contain"
        />
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={() => onIndexChange((index - 1 + images.length) % images.length)}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => onIndexChange((index + 1) % images.length)}
              aria-label="Next image"
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-white/70">
              {index + 1} / {images.length}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
