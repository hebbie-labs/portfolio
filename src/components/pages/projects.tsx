import { ProjectList } from "@/components/organisms/project-list";
import { PageTemplate } from "@/components/templates/page-template";
import { PROJECTS_PAGE } from "@/constants/projects";

export function ProjectsPage() {
  return (
    <PageTemplate>
      {/* The nav pill already names the page, and each project title is its heading. */}
      <h1 className="sr-only">{PROJECTS_PAGE.title}</h1>
      <ProjectList />
    </PageTemplate>
  );
}
