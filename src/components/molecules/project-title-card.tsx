import { Body, Display } from "@/components/atoms/typography";
import { PROJECTS_SECTION } from "@/constants/projects";

export function ProjectTitleCard() {
  return (
    <div className="flex flex-col gap-8">
      <Display as="h2" size="md">
        {PROJECTS_SECTION.title}
      </Display>
      <Body muted className="max-w-md">
        {PROJECTS_SECTION.intro}
      </Body>
    </div>
  );
}
