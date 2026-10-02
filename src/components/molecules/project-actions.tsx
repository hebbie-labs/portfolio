import { ProjectLinks } from "@/components/molecules/project-links";
import type { Project } from "@/constants/projects";

export function ProjectActions({ url, repo }: Pick<Project, "url" | "repo">) {
  if (!url && !repo) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <ProjectLinks url={url} repo={repo} />
    </div>
  );
}
