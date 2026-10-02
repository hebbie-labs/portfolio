import { PageHeading } from "@/components/molecules/page-heading";
import { ProjectList } from "@/components/organisms/project-list";
import { PageTemplate } from "@/components/templates/page-template";
import { PROJECTS_PAGE } from "@/constants/projects";

export function ProjectsPage() {
  return (
    <PageTemplate>
      <PageHeading {...PROJECTS_PAGE} />
      <ProjectList />
    </PageTemplate>
  );
}
