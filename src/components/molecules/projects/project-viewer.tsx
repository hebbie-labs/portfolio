"use client";

import { useState } from "react";

import { MediaFrame } from "@/components/atoms/media-frame";
import { Iphone } from "@/components/ui/iphone";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PROJECT_TEXT } from "@/constants/projects";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { Project } from "@/types/project";

type Props = Pick<Project, "title" | "video" | "views"> & {
  /** Index into `views`. */
  active: number;
  onSelect: (index: number) => void;
};

/**
 * MediaFrame showing the active view (the first one plays the project's video, the poster only with
 * reduced motion); a portrait view sits in a phone frame without a surrounding frame. The tabs only show below `lg`,
 * where the frame does not stay in sight while the features scroll by; there the video gets its own tab, so the first view shows its screenshot.
 */
export function ProjectViewer({
  title,
  video,
  views,
  active,
  onSelect,
}: Props) {
  const view = views[active] ?? views[0];
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const playable = video && !reducedMotion ? video : undefined;
  // The first view plays the video until a view tab is picked (mobile), then it shows its screenshot.
  const [screenshot, setScreenshot] = useState(false);
  const showVideo = playable !== undefined && active === 0 && !screenshot;

  return (
    <div className="flex flex-col gap-4">
      {view?.portrait ? (
        <div
          key={active}
          className="flex aspect-[12/7] justify-center transition-opacity duration-200 ease-out starting:opacity-0"
        >
          <div className="aspect-[433/882] h-full">
            <Iphone
              src={view.image}
              alt={PROJECT_TEXT.viewAlt(title, view.label)}
            />
          </div>
        </div>
      ) : (
        <MediaFrame
          image={view?.image}
          diagram={view?.diagram}
          video={showVideo ? playable : undefined}
          alt={PROJECT_TEXT.viewAlt(title, view?.label)}
          fadeKey={showVideo ? "video" : active}
        />
      )}
      {views.length > 1 && (
        <Tabs
          value={showVideo ? "video" : active}
          onValueChange={(value) => {
            setScreenshot(value !== "video");
            onSelect(value === "video" ? 0 : Number(value));
          }}
          className="lg:hidden"
        >
          <TabsList
            variant="line"
            className="h-auto w-full flex-wrap justify-start gap-x-6 gap-y-2 p-0"
          >
            {[
              ...(playable
                ? [{ label: PROJECT_TEXT.videoLabel, value: "video" }]
                : []),
              ...views.map(({ label }, i) => ({ label, value: i })),
            ].map(({ label, value }) => (
              <TabsTrigger
                key={label}
                value={value}
                className="h-auto flex-none rounded-none border-0 p-0 py-2 font-mono text-sm text-muted transition-colors duration-300 after:hidden hover:text-fg data-active:text-fg"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}
    </div>
  );
}
