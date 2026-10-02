import { Fragment } from "react";

import { Reveal } from "@/components/atoms/reveal";
import { ProjectCard } from "@/components/organisms/project-card";
import { Separator } from "@/components/ui/separator";
import { PROJECTS } from "@/constants/projects";

/** All projects stacked, separated by hairlines. */
export function ProjectList() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {PROJECTS.map((project, i) => (
        <Fragment key={project.slug}>
          {i > 0 && (
            <Reveal scroll variant="fade">
              <Separator />
            </Reveal>
          )}
          <ProjectCard {...project} />
        </Fragment>
      ))}
    </div>
  );
}
