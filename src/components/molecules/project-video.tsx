"use client";

import { useReducedMotion } from "motion/react";

import { Safari } from "@/components/ui/safari";

type Props = { src: string; poster?: string; url?: string; title: string };

/** Browser frame, as wide as still fits on one screen (bottom edge visible), with a muted looping video; with reduced motion it shows the poster instead. */
export function ProjectVideo({ src, poster, url, title }: Props) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="mx-auto max-w-first-screen">
      <Safari
        url={url}
        videoSrc={reducedMotion ? undefined : src}
        imageSrc={poster}
        imageAlt={`Screenshot von ${title}`}
        mode="simple"
      />
    </div>
  );
}
