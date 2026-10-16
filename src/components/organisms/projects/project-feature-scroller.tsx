"use client";

import { useCallback, useState } from "react";

import { Button } from "@/components/atoms/button";
import { Reveal } from "@/components/atoms/reveal";
import { Body } from "@/components/atoms/typography";
import { ProjectActions } from "@/components/molecules/projects/project-actions";
import { ProjectViewer } from "@/components/molecules/projects/project-viewer";
import { useActiveRow } from "@/hooks/use-active-row";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";

type Props = Pick<
  Project,
  "title" | "description" | "features" | "url" | "repo" | "video" | "views"
> & {
  /** From `lg` the screen sits on the right, for rhythm between projects. */
  flip?: boolean;
};

/**
 * MediaFrame on the left, text on the right. From `lg` the frames stay pinned while the text scrolls;
 * the feature row in the middle of the viewport is highlighted and switches the screen to its view;
 * from `lg` each row fills 40vh, so the views change slowly.
 */
export function ProjectFeatureScroller({
  title,
  description,
  features,
  url,
  repo,
  video,
  views,
  flip,
}: Props) {
  const [view, setView] = useState(0);
  const [feature, setFeature] = useState(0);
  const select = useCallback(
    (index: number) => {
      setFeature(index);
      const target = views.findIndex(
        ({ label }) => label === features?.[index].view,
      );
      if (target >= 0) setView(target);
    },
    [features, views],
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
          ? "lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
          : "lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]",
      )}
    >
      <Reveal
        scroll
        variant="scale"
        className={cn(
          "lg:sticky lg:top-32 lg:self-start",
          flip && "lg:order-last",
        )}
      >
        <ProjectViewer
          title={title}
          video={video}
          views={views}
          active={view}
          onSelect={setView}
        />
      </Reveal>
      <div className="flex min-w-0 flex-col gap-6 md:gap-8 lg:self-center">
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
                  className="lg:flex lg:min-h-[40vh] lg:items-center"
                >
                  <Button
                    variant="text"
                    onClick={() => select(i)}
                    className={cn(
                      "w-full py-3 text-left transition-colors duration-300 lg:py-0 lg:text-2xl",
                      i === feature ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {text}
                  </Button>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
        <Reveal scroll className="flex flex-col gap-6">
          <ProjectActions url={url} repo={repo} />
        </Reveal>
      </div>
    </div>
  );
}
