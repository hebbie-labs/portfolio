import { Body, Headline, Label } from "@/components/atoms/typography";
import type { Project } from "@/constants/projects";

export function ProjectCard({ nr, title, description }: Project) {
  return (
    <article className="flex flex-col gap-6">
      <Label>{nr}</Label>
      <Headline as="h3">{title}</Headline>
      <Body>{description}</Body>
    </article>
  );
}
