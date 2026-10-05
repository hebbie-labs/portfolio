import { Reveal } from "@/components/atoms/reveal";
import { Display } from "@/components/atoms/typography";
import { ProjectShowcase } from "@/components/organisms/project-showcase";
import type { Project } from "@/constants/projects";

/**
 * One project on the projects page: the title is the hero, below it the showcase (screen and text).
 */
export function ProjectCard({
  slug,
  title,
  description,
  features,
  url,
  repo,
  video,
  views,
}: Project) {
  return (
    <article id={slug} className="flex scroll-mt-24 flex-col gap-8 md:gap-12">
      <Reveal scroll variant="blur">
        <Display as="h2" size="lg" className="min-w-0 break-words">
          {title}
        </Display>
      </Reveal>
      <ProjectShowcase
        title={title}
        description={description}
        features={features}
        url={url}
        repo={repo}
        video={video}
        views={views}
      />
    </article>
  );
}
