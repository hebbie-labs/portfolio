import { ArrowUpRight } from "lucide-react";

import Button from "@/components/atoms/button";
import { PROJECT_TEXT, type Project } from "@/constants/projects";

/** External links; only the ones the project has. */
export function ProjectActions({ url, repo }: Pick<Project, "url" | "repo">) {
  if (!url && !repo) return null;
  return (
    <div className="flex flex-wrap items-center gap-3">
      {url && (
        <Button
          variant="outline"
          render={<a href={url} target="_blank" rel="noopener noreferrer" />}
          nativeButton={false}
          role="link"
          className="px-5"
        >
          {PROJECT_TEXT.demoLabel}
          <ArrowUpRight aria-hidden />
        </Button>
      )}
      {repo && (
        <Button
          variant="outline"
          render={<a href={repo} target="_blank" rel="noopener noreferrer" />}
          nativeButton={false}
          role="link"
          className="px-5"
        >
          {PROJECT_TEXT.repoLabel}
          <ArrowUpRight aria-hidden />
        </Button>
      )}
    </div>
  );
}
