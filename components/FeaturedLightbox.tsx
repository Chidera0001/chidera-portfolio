"use client";

import type { FeaturedUpdate } from "@/lib/data";
import { ImageLightbox } from "@/components/ImageLightbox";
import { VideoLightbox } from "@/components/VideoLightbox";

export function FeaturedLightbox({
  update,
  index,
  onIndexChange,
  onClose,
}: {
  update: FeaturedUpdate;
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}) {
  if (!update.video) {
    return (
      <ImageLightbox
        images={update.images ?? []}
        index={index}
        onIndexChange={onIndexChange}
        onClose={onClose}
      />
    );
  }

  return (
    <VideoLightbox src={update.video.src} poster={update.video.poster} onClose={onClose} />
  );
}
