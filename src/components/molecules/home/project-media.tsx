import { MediaFrame } from "@/components/atoms/media-frame";
import { PROJECT_TEXT } from "@/constants/projects";
import type { Project } from "@/types/project";

/** Start page teaser: the first screenshot or diagram; an empty surface until it is set. */
export function ProjectMedia({
  views,
  title,
}: Pick<Project, "views" | "title">) {
  return (
    <MediaFrame
      image={views[0]?.image}
      diagram={views[0]?.diagram}
      alt={PROJECT_TEXT.viewAlt(title, views[0]?.label)}
    />
  );
}
