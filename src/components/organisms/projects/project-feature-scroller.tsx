"use client";

import { useCallback, useRef, useState } from "react";

import { Button } from "@/components/atoms/button";
import { MediaFrame } from "@/components/atoms/media-frame";
import { Reveal } from "@/components/atoms/reveal";
import { SlideDots } from "@/components/atoms/slide-dots";
import { Body } from "@/components/atoms/typography";
import { ProjectActions } from "@/components/molecules/projects/project-actions";
import { ProjectCarousel } from "@/components/molecules/projects/project-carousel";
import { ProjectScene } from "@/components/molecules/projects/project-scene";
import { ProjectViewer } from "@/components/molecules/projects/project-viewer";
import { PROJECT_TEXT } from "@/constants/projects";
import { useActiveRow } from "@/hooks/use-active-row";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";

type Props = Pick<
  Project,
  | "title"
  | "description"
  | "features"
  | "url"
  | "repo"
  | "video"
  | "views"
  | "scene"
> & {
  /** From `md` the screen sits on the right, for rhythm between projects. */
  flip?: boolean;
};

/**
 * MediaFrame on the left, text on the right. From `md` the frames stay pinned while the text scrolls;
 * the feature row in the middle of the viewport is highlighted and switches the screen to its view;
 * from `md` each row fills 40vh, so the views change slowly. Below `md` the views sit in a carousel under the
 * features; a scene project shows its scene there instead, stepped by the features, the dots or a swipe.
 */
export function ProjectFeatureScroller({
  title,
  description,
  features,
  url,
  repo,
  video,
  views,
  scene,
  flip,
}: Props) {
  // Below `md` the frame is hidden; the scene renders in only one place, so there's never a second canvas.
  const wide = useMediaQuery("(min-width: 48rem)");
  const [view, setView] = useState(0);
  const [feature, setFeature] = useState(0);
  // Mobile: a tapped feature jumps the carousel to its view (a new object each tap, so the same one jumps again).
  const [jump, setJump] = useState<{ view: number }>();
  const viewOf = useCallback(
    (index: number) =>
      views.findIndex(({ label }) => label === features?.[index].view),
    [features, views],
  );
  const select = useCallback(
    (index: number) => {
      setFeature(index);
      const target = viewOf(index);
      if (target >= 0) setView(target);
    },
    [viewOf],
  );

  // scrolled back above the list: first view and first row again
  const reset = useCallback(() => {
    setView(0);
    setFeature(0);
  }, []);

  // The middle line drives the frame only from `md`; below it the features are tapped.
  const rows = useActiveRow<HTMLLIElement>(
    useCallback((index: number) => wide && select(index), [wide, select]),
    useCallback(() => wide && reset(), [wide, reset]),
  );

  // Mobile scene: a dot or a swipe picks a step, and the feature naming it lights up.
  const sceneBox = useRef<HTMLDivElement>(null);
  const swipeStart = useRef(0);
  const showStep = (index: number) => {
    const step = Math.min(Math.max(index, 0), views.length - 1);
    setView(step);
    setFeature(
      features?.findIndex(({ view }) => view === views[step].label) ?? -1,
    );
  };

  return (
    <div
      className={cn(
        "grid gap-10 lg:gap-16",
        flip
          ? "md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
          : "md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]",
      )}
    >
      <Reveal
        scroll
        variant="scale"
        className={cn(
          "md:sticky md:top-32 md:self-start",
          flip && "md:order-last",
          "max-md:hidden",
        )}
      >
        <ProjectViewer
          title={title}
          video={video}
          views={views}
          active={view}
          scene={
            scene &&
            wide && (
              // Bleeds past the frame: up and down, a little to the outside and into the text column, so
              // the floor runs under the features.
              <div
                className={cn(
                  "pointer-events-none absolute inset-x-0 -inset-y-[30%]",
                  flip
                    ? "-right-[12%] -left-[45%]"
                    : "-right-[45%] -left-[12%]",
                )}
              >
                <ProjectScene
                  scene={scene}
                  step={view}
                  label={PROJECT_TEXT.sceneAlt(title, views[view]?.label)}
                />
              </div>
            )
          }
        />
      </Reveal>
      <div className="flex min-w-0 flex-col gap-6 md:gap-8 md:self-center">
        <Reveal scroll className="flex flex-col gap-4">
          {description.map((paragraph) => (
            <Body key={paragraph}>{paragraph}</Body>
          ))}
        </Reveal>
        {features && (
          <Reveal scroll>
            <ul className="divide-y divide-line border-y border-line">
              {features.map(({ text }, i) => (
                <li
                  key={text}
                  ref={(el) => {
                    rows.current[i] = el;
                  }}
                  className="md:flex md:min-h-[40vh] md:items-center"
                >
                  <Button
                    variant="text"
                    onClick={() => {
                      select(i);
                      const target = viewOf(i);
                      if (wide || target < 0) return;
                      if (scene)
                        sceneBox.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "nearest",
                        });
                      else setJump({ view: target });
                    }}
                    // Highlighted from `md`, where the frame follows the rows, and with a scene, which a row steps.
                    className={cn(
                      "w-full py-3 text-left transition-colors duration-300 md:py-0 lg:text-2xl",
                      i === feature
                        ? "text-fg"
                        : scene
                          ? "text-muted hover:text-fg"
                          : "md:text-muted md:hover:text-fg",
                    )}
                  >
                    {text}
                  </Button>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
        <Reveal scroll className="md:hidden">
          {scene ? (
            !wide && (
              <div
                ref={sceneBox}
                className="flex scroll-my-24 flex-col gap-2"
                onTouchStart={(e) => {
                  swipeStart.current = e.touches[0].clientX;
                }}
                onTouchEnd={(e) => {
                  const dx = e.changedTouches[0].clientX - swipeStart.current;
                  if (Math.abs(dx) > 40) showStep(view + (dx < 0 ? 1 : -1));
                }}
              >
                <MediaFrame>
                  <div className="pointer-events-none absolute inset-x-0 -inset-y-[15%]">
                    <ProjectScene
                      scene={scene}
                      step={view}
                      label={PROJECT_TEXT.sceneAlt(title, views[view]?.label)}
                    />
                  </div>
                </MediaFrame>
                <SlideDots
                  labels={views.map(({ label }, i) =>
                    PROJECT_TEXT.slideLabel(i + 1, views.length, label),
                  )}
                  current={view}
                  onSelect={showStep}
                />
              </div>
            )
          ) : (
            <ProjectCarousel
              title={title}
              video={video}
              views={views}
              jump={jump}
            />
          )}
        </Reveal>
        <Reveal scroll className="flex flex-col gap-6">
          <ProjectActions url={url} repo={repo} />
        </Reveal>
      </div>
    </div>
  );
}
