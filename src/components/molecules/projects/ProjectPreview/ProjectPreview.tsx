"use client";

import { MediaFrame } from "@/components/atoms/MediaFrame";
import { PROJECT_TEXT } from "@/constants/projects";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { Project } from "@/types/project";

/** The project's looping preview (only the poster with reduced motion); with a light recording, one per theme. */
export function ProjectPreview({
  title,
  preview,
}: Pick<Project, "title" | "preview">) {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { light } = preview;
  // A hidden frame's video never plays: ViewportVideo only plays what is on screen.
  return (
    <>
      <div className={light && "hidden dark:block"}>
        <MediaFrame
          video={reduced ? undefined : preview.video}
          image={preview.poster}
          alt={PROJECT_TEXT.viewAlt(title)}
        />
      </div>
      {light && (
        <div className="dark:hidden">
          <MediaFrame
            video={reduced ? undefined : light.video}
            image={light.poster}
            alt={PROJECT_TEXT.viewAlt(title)}
          />
        </div>
      )}
    </>
  );
}
