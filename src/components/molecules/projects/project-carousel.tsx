"use client";

import { MediaFrame } from "@/components/atoms/media-frame";
import { Iphone } from "@/components/ui/iphone";
import { PROJECT_TEXT } from "@/constants/projects";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { Project } from "@/types/project";

/**
 * Mobile showcase: the video (poster only with reduced motion) and every view side by side, swiped with native
 * scroll snap. It bleeds to the screen edges, so the next slide peeks in and invites a swipe.
 */
export function ProjectCarousel({
  title,
  video,
  views,
}: Pick<Project, "title" | "video" | "views">) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const slides = [
    ...(video
      ? [{ label: PROJECT_TEXT.videoLabel, video, image: views[0]?.image }]
      : []),
    ...views,
  ];

  return (
    <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 [scrollbar-width:none] gap-4 overflow-x-auto overscroll-x-contain px-4 md:-mx-10 md:scroll-px-10 md:px-10">
      {slides.map((slide) => (
        <figure
          key={slide.label}
          className="flex w-[85%] shrink-0 snap-start flex-col gap-3 md:w-[70%]"
        >
          {"portrait" in slide && slide.portrait ? (
            <div className="flex aspect-[12/7] justify-center">
              <div className="aspect-[433/882] h-full">
                <Iphone
                  src={slide.image}
                  alt={PROJECT_TEXT.viewAlt(title, slide.label)}
                />
              </div>
            </div>
          ) : (
            <MediaFrame
              image={slide.image}
              video={
                "video" in slide && !reducedMotion ? slide.video : undefined
              }
              diagram={"diagram" in slide ? slide.diagram : undefined}
              alt={PROJECT_TEXT.viewAlt(title, slide.label)}
            />
          )}
          <figcaption className="font-mono text-sm text-muted">
            {slide.label}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
