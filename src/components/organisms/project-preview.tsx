import Link from "next/link";

import { Body, Display } from "@/components/atoms/typography";
import { ProjectMedia } from "@/components/molecules/project-media";
import type { Project } from "@/constants/projects";

/** Start page teaser: media, title, one-liner; the whole card links to its entry on the projects page. */
export function ProjectPreview({
  slug,
  title,
  summary,
  views,
}: Project) {
  return (
    <article className="group @container relative flex flex-col gap-3 md:gap-4">
      <div className="transition-transform duration-500 ease-spring group-hover:-translate-y-1">
        <ProjectMedia views={views} title={title} />
      </div>
      <Link
        href={`/projekte#${slug}`}
        className="rounded-2xl after:absolute after:inset-0 after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent"
      >
        <Display
          as="h3"
          size="md"
          className="text-balance transition-colors duration-300 group-hover:text-accent"
        >
          {title}
        </Display>
      </Link>
      <Body muted className="line-clamp-2">
        {summary}
      </Body>
    </article>
  );
}
