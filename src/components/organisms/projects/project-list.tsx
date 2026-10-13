import { Fragment } from "react";

import { Reveal } from "@/components/atoms/reveal";
import { ProjectEntry } from "@/components/organisms/projects/project-entry";
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
          <ProjectEntry {...project} flip={i % 2 === 1} />
        </Fragment>
      ))}
    </div>
  );
}
