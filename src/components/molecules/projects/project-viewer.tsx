"use client";

import { MediaFrame } from "@/components/atoms/media-frame";
import { Iphone } from "@/components/ui/iphone";
import { PROJECT_TEXT } from "@/constants/projects";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { Project } from "@/types/project";

type Props = Pick<Project, "title" | "video" | "views"> & {
  /** Index into `views`. */
  active: number;
  /** Shown in the frame instead of the views (see `Project.scene`). */
  scene?: React.ReactNode;
};

/**
 * MediaFrame showing the active view (the first one plays the project's video, the poster only with
 * reduced motion); a portrait view sits in a phone frame without a surrounding frame. From `md` only: below it
 * the frame can't stay in sight while the features scroll by, there `ProjectCarousel` shows the views instead.
 */
export function ProjectViewer({ title, video, views, active, scene }: Props) {
  const view = views[active] ?? views[0];
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const playable = video && !reducedMotion ? video : undefined;
  const showVideo = playable !== undefined && active === 0;

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
          video={showVideo ? playable : undefined}
          alt={PROJECT_TEXT.viewAlt(title, view?.label)}
          fadeKey={showVideo ? "video" : active}
        >
          {scene}
        </MediaFrame>
      )}
    </div>
  );
}
