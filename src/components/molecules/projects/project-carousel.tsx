"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/atoms/button";
import { MediaFrame } from "@/components/atoms/media-frame";
import { Iphone } from "@/components/ui/iphone";
import { PROJECT_TEXT } from "@/constants/projects";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";

type Props = Pick<Project, "title" | "video" | "views"> & {
  /** Scrolls to this view (index into `views`) whenever a new object is passed, e.g. from a tapped feature. */
  jump?: { view: number };
};

/**
 * Mobile showcase: the video (poster only with reduced motion) and every view side by side, swiped with native
 * scroll snap. It bleeds to the screen edges, so the next slide peeks in; the dots below show the current slide
 * and jump to one.
 */
export function ProjectCarousel({ title, video, views, jump }: Props) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const slides = [
    ...(video
      ? [{ label: PROJECT_TEXT.videoLabel, video, image: views[0]?.image }]
      : []),
    ...views,
  ];
  const offset = video ? 1 : 0;
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [current, setCurrent] = useState(0);

  const show = (index: number) =>
    refs.current[index]?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      // `nearest` also brings the carousel into view when it was scrolled off (a tapped feature above it).
      block: "nearest",
      inline: "start",
    });

  // The slide that is mostly in view is the current one.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting)
            setCurrent(refs.current.indexOf(entry.target as HTMLElement));
      },
      { root: refs.current[0]?.parentElement, threshold: 0.6 },
    );
    refs.current.forEach((slide) => slide && observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (jump) show(jump.view + offset);
    // Only a new `jump` scrolls; `show` changes with reduced motion alone.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jump]);

  return (
    <div className="flex flex-col gap-2">
      <div
        tabIndex={0}
        role="region"
        aria-label={PROJECT_TEXT.carouselLabel(title)}
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 [scrollbar-width:none] gap-4 overflow-x-auto overscroll-x-contain px-4 md:-mx-10 md:scroll-px-10 md:px-10"
      >
        {slides.map((slide, i) => (
          <figure
            key={slide.label}
            ref={(el) => {
              refs.current[i] = el;
            }}
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
      <div className="flex justify-center">
        {slides.map((slide, i) => (
          <Button
            key={slide.label}
            variant="text"
            onClick={() => show(i)}
            aria-label={PROJECT_TEXT.slideLabel(
              i + 1,
              slides.length,
              slide.label,
            )}
            aria-current={i === current}
            className="size-8 justify-center"
          >
            <span
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 ease-out",
                i === current ? "w-4 bg-fg" : "w-1.5 bg-muted",
              )}
            />
          </Button>
        ))}
      </div>
    </div>
  );
}
