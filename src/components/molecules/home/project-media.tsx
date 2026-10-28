import { MediaFrame } from "@/components/atoms/media-frame";
import { PROJECT_TEXT } from "@/constants/projects";
import type { Project } from "@/types/project";

/** Start page teaser: the first screenshot, or `children` (a scene) instead. */
export function ProjectMedia({
  views,
  title,
  children,
}: Pick<Project, "views" | "title"> & { children?: React.ReactNode }) {
  return (
    <MediaFrame
      image={views[0]?.image}
      alt={PROJECT_TEXT.viewAlt(title, views[0]?.label)}
    >
      {children}
    </MediaFrame>
  );
}
