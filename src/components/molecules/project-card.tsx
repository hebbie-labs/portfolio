import { Body, Headline, Label } from "@/components/atoms/typography";
import type { Project } from "@/constants/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({
  nr,
  title,
  description,
  className,
}: Project & { className?: string }) {
  return (
    <article className={cn("flex flex-col gap-6", className)}>
      <Label>{nr}</Label>
      <Headline as="h3">{title}</Headline>
      <Body>{description}</Body>
    </article>
  );
}
