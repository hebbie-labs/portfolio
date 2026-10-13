import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/atoms/button";
import { PROJECT_TEXT, type Project } from "@/constants/projects";

/** External links; only the ones the project has. */
export function ProjectActions({ url, repo }: Pick<Project, "url" | "repo">) {
  const links = [
    { href: url, label: PROJECT_TEXT.demoLabel },
    { href: repo, label: PROJECT_TEXT.repoLabel },
  ].filter(({ href }) => href);
  if (!links.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-3">
      {links.map(({ href, label }) => (
        <Button
          key={label}
          variant="outline"
          render={<a href={href} target="_blank" rel="noopener noreferrer" />}
          nativeButton={false}
          role="link"
          className="px-5"
        >
          {label}
          <ArrowUpRight aria-hidden />
        </Button>
      ))}
    </div>
  );
}
