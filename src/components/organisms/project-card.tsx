import { Reveal } from "@/components/atoms/reveal";
import { Display, Label } from "@/components/atoms/typography";
import { ProjectVideo } from "@/components/molecules/project-video";
import { ProjectShowcase } from "@/components/organisms/project-showcase";
import type { Project } from "@/constants/projects";

/**
 * One project on the projects page: the title is the hero, below it the showcase (frames and text).
 */
export function ProjectCard({
  slug,
  categories,
  title,
  description,
  features,
  tags,
  url,
  repo,
  video,
  views,
  phone,
}: Project) {
  return (
    <article id={slug} className="flex scroll-mt-24 flex-col gap-8 md:gap-12">
      <Reveal
        scroll
        variant="blur"
        className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-8"
      >
        <Display as="h2" size="lg" className="min-w-0 break-words">
          {title}
        </Display>
        <div className="flex flex-wrap gap-x-4 md:flex-col md:items-end md:pb-2">
          {categories.map((category) => (
            <Label key={category}>{category}</Label>
          ))}
        </div>
      </Reveal>
      {video && (
        <Reveal scroll variant="scale">
          <ProjectVideo
            src={video}
            poster={views[0]?.image}
            url={url}
            title={title}
          />
        </Reveal>
      )}
      <ProjectShowcase
        title={title}
        description={description}
        features={features}
        tags={tags}
        url={url}
        repo={repo}
        views={views}
        phone={phone}
      />
    </article>
  );
}
