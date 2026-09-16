"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function ParallaxImage({
  src,
  alt,
  fit = "cover",
  background,
}: {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
  background?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  if (fit === "contain") {
    // Portrait/mobile media: no crop-and-shift parallax (it assumes an
    // oversized cover crop), just centered contain over the brand backdrop.
    // Padding only makes sense when there's a background to show through —
    // otherwise it just shrinks the image for no reason.
    const padding = background ? "p-4 sm:p-6" : "";
    return (
      <div ref={ref} className="relative h-full w-full overflow-hidden" style={{ background }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={`absolute inset-0 h-full w-full object-contain transition duration-500 group-hover:scale-[1.02] ${padding}`}
        />
      </div>
    );
  }

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="absolute -top-[8%] h-[116%] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
      />
    </div>
  );
}
