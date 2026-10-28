import type { Metadata } from "next";

import { JsonLd } from "@/components/atoms/json-ld";
import { ProjectsPage } from "@/components/pages/projects";
import { PROJECTS_PAGE } from "@/constants/projects";
import { PROJECTS_JSON_LD, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(PROJECTS_PAGE.meta, "/projekte");

export default function Page() {
  return (
    <>
      <JsonLd data={PROJECTS_JSON_LD} />
      <ProjectsPage />
    </>
  );
}
