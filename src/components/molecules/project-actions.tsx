import { ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { PROJECT_TEXT, type Project } from "@/constants/projects";

const LINK = buttonVariants({ variant: "outline", className: "px-5" });

/** External links; only the ones the project has. */
export function ProjectActions({ url, repo }: Pick<Project, "url" | "repo">) {
  if (!url && !repo) return null;
  return (
    <div className="flex flex-wrap items-center gap-3">
      {url && (
        <a href={url} target="_blank" rel="noreferrer" className={LINK}>
          {PROJECT_TEXT.demoLabel}
          <ArrowUpRight aria-hidden />
        </a>
      )}
      {repo && (
        <a href={repo} target="_blank" rel="noreferrer" className={LINK}>
          {PROJECT_TEXT.repoLabel}
          <ArrowUpRight aria-hidden />
        </a>
      )}
    </div>
  );
}
