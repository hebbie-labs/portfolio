import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import { Body, Display, Lead } from "@/components/atoms/Typography";
import { ProjectActions } from "@/components/molecules/projects/ProjectActions";
import { PROJECT_TEXT, PROJECTS_SECTION } from "@/constants/projects";
import type { Project } from "@/types/project";

/** Head of a detail page: back to the index, title, one-liner with the external links, description. */
export function ProjectHero({
  title,
  summary,
  description,
  url,
  repo,
}: Pick<Project, "title" | "summary" | "description" | "url" | "repo">) {
  return (
    <header className="flex flex-col gap-8 md:gap-12">
      <Reveal>
        <Button
          variant="text"
          render={<Link href={PROJECTS_SECTION.allHref} />}
          nativeButton={false}
          role="link"
          className="w-fit gap-2 text-muted hover:text-fg"
        >
          <ArrowLeft aria-hidden />
          {PROJECT_TEXT.backLabel}
        </Button>
      </Reveal>
      <Reveal index={1} variant="blur" className="@container">
        {/* Capped to the width, so the longest name ("Homeserver", about 5.75em) stays on one line. */}
        <Display
          size="lg"
          className="text-[length:min(var(--text-display-lg),16cqw)] leading-[0.82] tracking-[-0.03em]"
        >
          {title}
        </Display>
      </Reveal>
      <div className="grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
        <Reveal index={2} className="flex flex-col items-start gap-6">
          <Lead>{summary}</Lead>
          <ProjectActions url={url} repo={repo} />
        </Reveal>
        <Reveal index={3} className="flex flex-col gap-4">
          {description.map((paragraph) => (
            <Body key={paragraph} muted>
              {paragraph}
            </Body>
          ))}
        </Reveal>
      </div>
    </header>
  );
}
