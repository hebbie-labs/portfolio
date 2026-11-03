import { ProjectsTrack } from "@/components/organisms/projects/ProjectsTrack";
import { PROJECTS_PAGE } from "@/constants/projects";

/** Index of all projects on a sideways track; each panel links to its detail page. */
export function ProjectsPage() {
  return (
    <>
      {/* The nav pill already names the page, and each project title is its panel's heading. */}
      <h1 className="sr-only">{PROJECTS_PAGE.title}</h1>
      <ProjectsTrack />
    </>
  );
}
