import type { Metadata } from "next";

import { ProjectsPage } from "@/components/pages/projects";
import { PROJECTS_PAGE } from "@/constants/projects";

export const metadata: Metadata = PROJECTS_PAGE.meta;

export default function Page() {
  return <ProjectsPage />;
}
