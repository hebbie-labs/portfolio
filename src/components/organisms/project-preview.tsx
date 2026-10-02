import Link from "next/link";

import { CornerArrow } from "@/components/atoms/corner-arrow";
import { Body, Display, Label } from "@/components/atoms/typography";
import { ProjectMedia } from "@/components/molecules/project-media";
import type { Project } from "@/constants/projects";

/** Start page teaser: number, media, title, one-liner; the whole card links to the case study. Title and summary reserve two lines so card heights match. */
export function ProjectPreview({ slug, nr, title, summary, device, url, image }: Project) {
  return (
    <article className="group relative flex flex-col gap-4 md:gap-6">
      <div className="flex items-center justify-between">
        <Label>{nr}</Label>
        <CornerArrow />
      </div>
      <div className="transition-transform duration-500 ease-spring group-hover:-translate-y-1">
        <ProjectMedia device={device} url={url} image={image} title={title} />
      </div>
      <Link
        href={`/projekte/${slug}`}
        className="rounded-2xl after:absolute after:inset-0 after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent"
      >
        <Display
          as="h3"
          size="md"
          className="min-h-[2.02em] text-balance transition-colors duration-300 group-hover:text-accent"
        >
          {title}
        </Display>
      </Link>
      <Body muted className="line-clamp-2 min-h-[2lh]">
        {summary}
      </Body>
    </article>
  );
}
