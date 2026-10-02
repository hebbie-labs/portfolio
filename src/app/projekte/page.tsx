import type { Metadata } from "next";

import { ProjectsPage } from "@/components/pages/projects";

export const metadata: Metadata = { title: "Projekte" };

export default function Page() {
  return <ProjectsPage />;
}
