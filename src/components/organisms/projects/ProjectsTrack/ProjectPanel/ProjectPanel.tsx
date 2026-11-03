import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ViewTransition } from "react";

import { Body, Display } from "@/components/atoms/Typography";
import { ProjectPreview } from "@/components/molecules/projects/ProjectPreview";
import type { Project } from "@/types/project";

/** One project on the index track: its looping preview, title and one-liner; the whole panel links to the detail page, where the preview morphs into the tour. */
export function ProjectPanel({
  slug,
  title,
  summary,
  preview,
}: Pick<Project, "slug" | "title" | "summary" | "preview">) {
  return (
    <article className="group relative flex flex-col gap-4 md:gap-6">
      <ViewTransition
        name={`project-${slug}`}
        share="project-morph"
        default="none"
      >
        <div className="transition-transform duration-300 ease-out group-hover:scale-[1.015] motion-reduce:transform-none">
          <ProjectPreview title={title} preview={preview} />
        </div>
      </ViewTransition>
      <div className="@container flex items-end justify-between gap-6">
        <div className="flex min-w-0 flex-col gap-2 md:gap-3">
          <Link
            href={`/projekte/${slug}`}
            className="rounded-panel after:absolute after:inset-0 after:rounded-panel focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent"
          >
            <Display
              as="h2"
              size="md"
              // Capped to the panel, so the longest name ("Homeserver", about 5.75em) stays on one line.
              className="text-[length:min(var(--text-display-md),16cqw)] leading-[0.86] tracking-[-0.03em] transition-colors duration-150 group-hover:text-accent"
            >
              {title}
            </Display>
          </Link>
          <Body muted className="line-clamp-2 max-w-xl">
            {summary}
          </Body>
        </div>
        <ArrowRight
          aria-hidden
          className="mb-1 size-7 shrink-0 text-muted transition duration-200 ease-out group-hover:translate-x-1 group-hover:text-accent motion-reduce:transform-none"
        />
      </div>
    </article>
  );
}
