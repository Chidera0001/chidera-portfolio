"use client";

import { useState } from "react";
import Link from "next/link";
import { Play } from "lucide-react";
import type { Project } from "@/lib/data";
import { ParallaxImage } from "@/components/ParallaxImage";
import { VideoLightbox } from "@/components/VideoLightbox";

export function ProjectCard({
  project,
  aside,
  side,
}: {
  project: Project;
  aside?: { label: string; note: string };
  side: "left" | "right";
}) {
  const [videoOpen, setVideoOpen] = useState(false);
  const asidePosition =
    side === "left" ? "right-full mr-6 text-right" : "left-full ml-6 text-left";

  const arrow = (
    <svg
      width="54"
      height="32"
      viewBox="0 0 54 32"
      fill="none"
      className={`mt-1 shrink-0 ${side === "left" ? "scale-x-[-1]" : ""}`}
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
  );

  function openVideo(e: React.MouseEvent | React.KeyboardEvent) {
    e.preventDefault();
    e.stopPropagation();
    setVideoOpen(true);
  }

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative mt-16 block first:mt-0"
    >
      {aside && (
        <div
          className={`pointer-events-none absolute top-1/2 z-10 hidden w-64 -translate-y-1/2 items-start gap-2.5 min-[1240px]:flex ${asidePosition}`}
        >
          {side === "right" && arrow}
          <div className="w-56">
            <p className="font-handwriting text-lg font-bold leading-tight text-[var(--note)]">
              {aside.label}
            </p>
            <p className="font-handwriting mt-1 text-[17px] font-medium leading-snug text-[var(--note)] opacity-90">
              {aside.note}
            </p>
          </div>
          {side === "left" && arrow}
        </div>
      )}

      <div className="relative aspect-[16/9.5] w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-raised)]">
        <ParallaxImage
          src={project.image}
          alt={`${project.name} preview`}
          fit={project.mediaFit}
          background={project.mediaBackground}
        />

        {project.video && (
          <div
            role="button"
            tabIndex={0}
            aria-label={`Play video: ${project.name}`}
            onClick={openVideo}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") openVideo(e);
            }}
            className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-black/10 transition group-hover:bg-black/20"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/55 text-white transition group-hover:bg-black/70">
              <Play className="ml-1 h-5 w-5" fill="currentColor" />
            </span>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-baseline justify-between gap-4">
        <h3 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
          {project.name}
          <span className="text-[var(--fg-faint)] transition group-hover:translate-x-0.5 group-hover:text-[var(--accent)]">
            →
          </span>
        </h3>
        <span className="shrink-0 text-sm text-[var(--fg-faint)]">{project.year}</span>
      </div>

      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--fg)]">
        {project.narrative}
      </p>

      <p className="mt-3 text-sm text-[var(--fg-muted)]">{project.stat}</p>

      {videoOpen && project.video && (
        <VideoLightbox
          src={project.video}
          poster={project.image}
          onClose={() => setVideoOpen(false)}
        />
      )}
    </Link>
  );
}
