"use client";

import { createPortal } from "react-dom";
import { X } from "lucide-react";

export function VideoLightbox({
  src,
  poster,
  onClose,
}: {
  src: string;
  poster?: string;
  onClose: () => void;
}) {
  // Portaled to <body> so this never ends up nested inside a parent <a>
  // (e.g. a project card Link) — keeps clicks here from also triggering
  // that link's navigation, and avoids nesting interactive elements.
  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>
      <video
        src={src}
        poster={poster}
        controls
        autoPlay
        playsInline
        className="max-h-[85vh] max-w-[92vw] rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    document.body
  );
}
