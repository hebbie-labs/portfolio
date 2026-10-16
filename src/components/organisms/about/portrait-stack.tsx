"use client";

import { Portrait } from "@/components/atoms/portrait";
import { useTimelinePhoto } from "@/components/providers/timeline-photo";
import { ABOUT_PAGE, ABOUT_TIMELINE } from "@/constants/about";
import { cn } from "@/lib/utils";
import type { TimelineItem } from "@/types/about";

const stations: readonly TimelineItem[] = ABOUT_TIMELINE.items;

/** Portrait that cross-fades to the photo of the timeline station in view, and back to the portrait. */
export function PortraitStack() {
  const { photo } = useTimelinePhoto();
  // One layer per photo: stations sharing a file would otherwise stack on each other.
  const layers = [
    { src: ABOUT_PAGE.portrait, alt: ABOUT_PAGE.portraitAlt },
    ...stations.flatMap((item) => (item.image ? [item.image] : [])),
  ].filter((layer, i, all) => all.findIndex((l) => l.src === layer.src) === i);
  const current = photo ?? ABOUT_PAGE.portrait;

  return (
    <div className="relative aspect-[4/5] w-full">
      {layers.map((layer, i) => (
        <div
          key={layer.src}
          aria-hidden={layer.src !== current}
          className={cn(
            "absolute inset-0 transition-opacity duration-300 motion-reduce:transition-none",
            // Below `md` the portrait doesn't stick; the photos sit in the timeline rows instead.
            i > 0 && "max-md:hidden",
            layer.src === current
              ? "opacity-100"
              : "pointer-events-none opacity-0",
          )}
        >
          <Portrait src={layer.src} alt={layer.alt} />
        </div>
      ))}
    </div>
  );
}
