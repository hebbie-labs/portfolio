import { MediaFrame } from "@/components/molecules/shared/media-frame";
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
      alt={`Screenshot von ${title}`}
    />
  );
}
