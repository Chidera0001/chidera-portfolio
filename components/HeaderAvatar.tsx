"use client";

import { useEffect, useState } from "react";
import { profile, profilePhotos } from "@/lib/data";

const ROTATE_MS = 8000;

export function HeaderAvatar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (profilePhotos.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % profilePhotos.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (profilePhotos.length === 0) return;
    const link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (link) link.href = profilePhotos[index];
  }, [index]);

  if (profilePhotos.length === 0) return null;

  return (
    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--bg-raised)] sm:h-[72px] sm:w-[72px]">
      {profilePhotos.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={profile.name}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
