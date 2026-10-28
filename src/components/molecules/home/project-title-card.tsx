import { Display } from "@/components/atoms/typography";
import { PROJECTS_SECTION } from "@/constants/projects";

export function ProjectTitleCard() {
  return (
    <Display as="h2" size="md">
      {PROJECTS_SECTION.title}
    </Display>
  );
}
