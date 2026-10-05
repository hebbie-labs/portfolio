"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/atoms/reveal";
import { Body } from "@/components/atoms/typography";
import { ProjectActions } from "@/components/molecules/project-actions";
import { ProjectGallery } from "@/components/organisms/project-gallery";
import type { Project } from "@/constants/projects";
import { cn } from "@/lib/utils";

type Props = Pick<
  Project,
  "title" | "description" | "features" | "url" | "repo" | "video" | "views"
>;

/**
 * Screen on the left, text on the right. From `lg` the frames stay pinned while the text scrolls;
 * the feature row in the middle of the viewport is highlighted and switches the screen to its view;
 * from `lg` each row with a view fills 40vh, so the views change slowly; rows without a view stay compact.
 */
export function ProjectShowcase({
  title,
  description,
  features,
  url,
  repo,
  video,
  views,
}: Props) {
  const [view, setView] = useState(0);
  const [feature, setFeature] = useState(0);
  const rows = useRef<(HTMLLIElement | null)[]>([]);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = rows.current.indexOf(entry.target as HTMLLIElement);
          if (entry.isIntersecting && index >= 0) select(index);
          // scrolled back above the list: first view and first row again
          else if (
            index === 0 &&
            entry.boundingClientRect.top > innerHeight / 2
          ) {
            setView(0);
            setFeature(0);
          }
        }
      },
      { rootMargin: "-49% 0px -50% 0px" },
    );
    rows.current.forEach((row) => row && observer.observe(row));
    return () => observer.disconnect();
  }, [select]);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
      <Reveal
        scroll
        variant="scale"
        className="lg:sticky lg:top-32 lg:self-start"
      >
        <ProjectGallery
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
              {features.map(({ text, view }, i) => (
                <li
                  key={text}
                  ref={(el) => {
                    rows.current[i] = el;
                  }}
                  className={cn(
                    "lg:flex lg:items-center",
                    view && "lg:min-h-[40vh]",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => select(i)}
                    className={cn(
                      "w-full py-3 text-left transition-colors duration-300 lg:py-0 lg:text-2xl",
                      i === feature ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {text}
                  </button>
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
