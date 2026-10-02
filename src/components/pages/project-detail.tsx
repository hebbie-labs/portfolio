import { NextProjectLink } from "@/components/molecules/next-project-link";
import { CaseStudyHeader } from "@/components/organisms/case-study-header";
import { CaseStudyOverview } from "@/components/organisms/case-study-overview";
import { CaseStudySections } from "@/components/organisms/case-study-sections";
import { PageTemplate } from "@/components/templates/page-template";
import type { Project } from "@/constants/projects";

/** Case study. `next` is the project linked at the bottom. */
export function ProjectDetailPage({ project, next }: { project: Project; next: Project }) {
  return (
    <PageTemplate>
      <CaseStudyHeader {...project} />
      <CaseStudyOverview {...project} />
      <CaseStudySections {...project} />
      <NextProjectLink {...next} />
    </PageTemplate>
  );
}
