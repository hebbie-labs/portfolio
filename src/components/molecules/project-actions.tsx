import { ArrowLink } from "@/components/atoms/arrow-link";
import { ProjectLinks } from "@/components/molecules/project-links";
import type { Project } from "@/constants/projects";

export function ProjectActions({ slug, url, repo }: Pick<Project, "slug" | "url" | "repo">) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <ArrowLink href={`/projekte/${slug}`}>Case Study ansehen</ArrowLink>
      <ProjectLinks url={url} repo={repo} />
    </div>
  );
}
