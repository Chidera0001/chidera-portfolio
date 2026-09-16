"use client";

import { useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import type { FeaturedUpdate } from "@/lib/data";
import { FeaturedCard } from "@/components/FeaturedCard";
import { FeaturedLightbox } from "@/components/FeaturedLightbox";

export function FeaturedCarousel({ updates }: { updates: FeaturedUpdate[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [openState, setOpenState] = useState<{
    updateIndex: number;
    imageIndex: number;
  } | null>(null);

  function scrollNext() {
    scrollerRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
      >
        {updates.map((update, i) => (
          <FeaturedCard
            key={i}
            update={update}
            onOpen={(imageIndex) => setOpenState({ updateIndex: i, imageIndex })}
          />
        ))}
      </div>
      {updates.length > 1 && (
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Scroll featured items"
          className="absolute right-0 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-raised)] text-[var(--fg-muted)] shadow-md transition hover:text-[var(--fg)] sm:flex"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </button>
      )}

      {openState && (
        <FeaturedLightbox
          update={updates[openState.updateIndex]}
          index={openState.imageIndex}
          onIndexChange={(imageIndex) =>
            setOpenState((s) => (s ? { ...s, imageIndex } : s))
          }
          onClose={() => setOpenState(null)}
        />
      )}
    </div>
  );
}
