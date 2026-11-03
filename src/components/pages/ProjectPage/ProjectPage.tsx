import { ProjectHero } from "@/components/organisms/projects/ProjectHero";
import { ProjectTour } from "@/components/organisms/projects/ProjectTour";
import { PageTemplate } from "@/components/templates/PageTemplate";
import type { Project } from "@/types/project";

/** Detail page of one project: the head, then the tour through its features, edge to edge. */
export function ProjectPage({ project }: { project: Project }) {
  return (
    <>
      <PageTemplate>
        <ProjectHero {...project} />
      </PageTemplate>
      <ProjectTour {...project} />
    </>
  );
}
