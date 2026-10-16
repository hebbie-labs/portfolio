import { Fragment } from "react";

import { Reveal } from "@/components/atoms/reveal";
import { Display } from "@/components/atoms/typography";
import { ProjectFeatureScroller } from "@/components/organisms/projects/project-feature-scroller";
import { PageTemplate } from "@/components/templates/page-template";
import { Separator } from "@/components/ui/separator";
import { PROJECTS, PROJECTS_PAGE } from "@/constants/projects";

/** All projects stacked, separated by hairlines: each title is the hero, below it the showcase (screen and text). */
export function ProjectsPage() {
  return (
    <PageTemplate>
      {/* The nav pill already names the page, and each project title is its heading. */}
      <h1 className="sr-only">{PROJECTS_PAGE.title}</h1>
      <div className="flex flex-col gap-16 md:gap-24">
        {PROJECTS.map(({ slug, ...project }, i) => (
          <Fragment key={slug}>
            {i > 0 && (
              <Reveal scroll variant="fade">
                <Separator />
              </Reveal>
            )}
            <article
              id={slug}
              className="flex scroll-mt-24 flex-col gap-8 md:gap-12"
            >
              <Reveal scroll variant="blur">
                <Display as="h2" size="lg" className="min-w-0 break-words">
                  {project.title}
                </Display>
              </Reveal>
              <ProjectFeatureScroller {...project} flip={i % 2 === 1} />
            </article>
          </Fragment>
        ))}
      </div>
    </PageTemplate>
  );
}
