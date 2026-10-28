import Link from "next/link";

import { Body, Display } from "@/components/atoms/typography";
import { ProjectMedia } from "@/components/molecules/home/project-media";
import { ProjectScene } from "@/components/molecules/projects/project-scene";
import { PROJECT_TEXT } from "@/constants/projects";
import type { Project } from "@/types/project";

/** Start page teaser: media, title, one-liner; the whole card links to its entry on the projects page. */
export function ProjectTeaser({ slug, title, summary, views, scene }: Project) {
  return (
    <article className="group @container relative flex flex-col gap-3 md:gap-4">
      <div className="transition-transform duration-200 ease-out group-hover:-translate-y-1">
        <ProjectMedia views={views} title={title}>
          {scene && (
            <div className="pointer-events-none absolute inset-0">
              <ProjectScene
                scene={scene}
                step={0}
                label={PROJECT_TEXT.sceneAlt(title)}
              />
            </div>
          )}
        </ProjectMedia>
      </div>
      <Link
        href={`/projekte#${slug}`}
        className="rounded-2xl after:absolute after:inset-0 after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent"
      >
        <Display
          as="h3"
          size="md"
          className="text-balance transition-colors duration-150 group-hover:text-accent"
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
