import { Reveal } from "@/components/atoms/reveal";
import { Label } from "@/components/atoms/typography";
import { TitleLink } from "@/components/molecules/title-link";
import type { Project } from "@/constants/projects";

export function NextProjectLink({ slug, title }: Pick<Project, "slug" | "title">) {
  return (
    <Reveal scroll className="flex flex-col gap-4">
      <Label>Nächstes Projekt</Label>
      <TitleLink href={`/projekte/${slug}`}>{title}</TitleLink>
    </Reveal>
  );
}
