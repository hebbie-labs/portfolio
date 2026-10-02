import { Reveal } from "@/components/atoms/reveal";
import { Body } from "@/components/atoms/typography";
import { ProjectActions } from "@/components/molecules/project-actions";
import { TagList } from "@/components/molecules/tag-list";
import type { Project } from "@/constants/projects";

type Props = Pick<Project, "description" | "tags" | "url" | "repo">;

/** Description, tags and actions of a project, revealed on scroll as one block. */
export function ProjectDetails({ description, tags, url, repo }: Props) {
  return (
    <Reveal scroll index={2} className="flex min-w-0 flex-col gap-6">
      <Body>{description}</Body>
      <TagList tags={tags} />
      <ProjectActions url={url} repo={repo} />
    </Reveal>
  );
}
