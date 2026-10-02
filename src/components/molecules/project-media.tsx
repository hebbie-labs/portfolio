import { Safari } from "@/components/ui/safari";
import type { Project } from "@/constants/projects";

/** Start page teaser: the first screenshot in a browser frame; empty frame until it is set. */
export function ProjectMedia({
  url,
  views,
  title,
}: Pick<Project, "url" | "views" | "title">) {
  return (
    <Safari
      url={url}
      imageSrc={views[0]?.image}
      imageAlt={`Screenshot von ${title}`}
      mode="simple"
    />
  );
}
