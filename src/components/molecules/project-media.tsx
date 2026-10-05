import { Screen } from "@/components/molecules/screen";
import type { Project } from "@/constants/projects";

/** Start page teaser: the first screenshot or diagram; an empty surface until it is set. */
export function ProjectMedia({
  views,
  title,
}: Pick<Project, "views" | "title">) {
  return (
    <Screen
      image={views[0]?.image}
      diagram={views[0]?.diagram}
      alt={`Screenshot von ${title}`}
    />
  );
}
