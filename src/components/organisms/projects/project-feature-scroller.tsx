"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";

import { Button } from "@/components/atoms/button";
import { MediaFrame } from "@/components/atoms/media-frame";
import { Reveal } from "@/components/atoms/reveal";
import { Body } from "@/components/atoms/typography";
import { ProjectActions } from "@/components/molecules/projects/project-actions";
import { ProjectCarousel } from "@/components/molecules/projects/project-carousel";
import { ProjectViewer } from "@/components/molecules/projects/project-viewer";
import { PROJECT_TEXT } from "@/constants/projects";
import { useActiveRow } from "@/hooks/use-active-row";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";

// three.js is heavy: loaded only on the client and only with a project that has a scene.
const SCENES = {
  homeserver: dynamic(
    () =>
      import("@/components/molecules/projects/homeserver-scene").then(
        (m) => m.HomeserverScene,
      ),
    { ssr: false },
  ),
};

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
 * from `md` each row fills 40vh, so the views change slowly.
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
  const Scene = scene && SCENES[scene];
  // Below `md` the frame is hidden (a carousel shows the views, a scene project its first view as a still); the
  // scene isn't even loaded there.
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

  const rows = useActiveRow<HTMLLIElement>(select, reset);

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
            Scene &&
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
                <Scene
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
                  {Scene && !wide ? (
                    // Nothing to switch to on a phone: the still below shows the whole setup.
                    <span className="block py-3">{text}</span>
                  ) : (
                    <Button
                      variant="text"
                      onClick={() => {
                        select(i);
                        const target = viewOf(i);
                        if (!wide && target >= 0) setJump({ view: target });
                      }}
                      // Highlighted only from `md`, where the frame follows the rows.
                      className={cn(
                        "w-full py-3 text-left transition-colors duration-300 md:py-0 lg:text-2xl",
                        i === feature
                          ? "text-fg"
                          : "md:text-muted md:hover:text-fg",
                      )}
                    >
                      {text}
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
        <Reveal scroll className="md:hidden">
          {Scene ? (
            <MediaFrame
              diagram={views[0]?.diagram}
              alt={PROJECT_TEXT.viewAlt(title, views[0]?.label)}
            />
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
