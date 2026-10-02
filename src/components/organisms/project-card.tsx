import { ArrowLink } from "@/components/atoms/arrow-link";
import { Body, Display } from "@/components/atoms/typography";
import { ProjectMedia } from "@/components/molecules/project-media";
import { ProjectMeta } from "@/components/molecules/project-meta";
import { TagList } from "@/components/molecules/tag-list";
import type { Project } from "@/constants/projects";

export function ProjectCard({ nr, title, category, description, tags, href }: Project) {
  return (
    <article className="flex flex-col gap-6 md:gap-8">
      <ProjectMeta nr={nr} category={category} />
      <Display as="h3" size="lg">
        {title}
      </Display>
      <div className="grid gap-6 md:grid-cols-[3fr_2fr] md:gap-10">
        <ProjectMedia title={title} />
        <div className="flex min-w-0 flex-col justify-between gap-6">
          <Body>{description}</Body>
          <TagList tags={tags} />
          <ArrowLink href={href} className="self-start">
            Case Study ansehen
          </ArrowLink>
        </div>
      </div>
    </article>
  );
}
