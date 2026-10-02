import { BackLink } from "@/components/atoms/back-link";
import { Reveal } from "@/components/atoms/reveal";
import { Display, Lead } from "@/components/atoms/typography";
import { ProjectLinks } from "@/components/molecules/project-links";
import type { Project } from "@/constants/projects";

export function CaseStudyHeader({ title, summary, url, repo }: Pick<Project, "title" | "summary" | "url" | "repo">) {
  return (
    <Reveal variant="blur" className="flex flex-col items-start gap-6">
      <BackLink href="/projekte">Alle Arbeiten</BackLink>
      <Display as="h1" size="lg">
        {title}
      </Display>
      <Lead className="max-w-xl">{summary}</Lead>
      <div className="flex gap-6">
        <ProjectLinks url={url} repo={repo} />
      </div>
    </Reveal>
  );
}
