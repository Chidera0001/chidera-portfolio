"use client";

import { useState } from "react";

export function MapThumbnail({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);
  if (errored) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className="mt-3 h-36 w-full rounded-lg border border-[var(--border)] object-cover sm:h-44"
    />
  );
}
