import { Body, Display, Label } from "@/components/atoms/typography";
import { PROJECTS_SECTION } from "@/constants/projects";

export function ProjectTitleCard() {
  return (
    <div className="flex flex-col gap-8">
      <Label>{PROJECTS_SECTION.eyebrow}</Label>
      <Display as="h2" size="md">
        {PROJECTS_SECTION.title}
      </Display>
      <Body muted className="max-w-md">
        {PROJECTS_SECTION.intro}
      </Body>
    </div>
  );
}
