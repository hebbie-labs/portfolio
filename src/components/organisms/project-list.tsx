import { FocusFade } from "@/components/atoms/focus-fade";
import { Reveal } from "@/components/atoms/reveal";
import { ProjectCard } from "@/components/organisms/project-card";
import { Separator } from "@/components/ui/separator";
import { PROJECTS } from "@/constants/projects";

/** All projects stacked, separated by hairlines. */
export function ProjectList() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {PROJECTS.map((project, i) => (
        <div key={project.slug} className="flex flex-col gap-16 md:gap-24">
          {i > 0 && (
            <Reveal scroll variant="fade">
              <Separator />
            </Reveal>
          )}
          <FocusFade>
            <ProjectCard {...project} />
          </FocusFade>
        </div>
      ))}
    </div>
  );
}
