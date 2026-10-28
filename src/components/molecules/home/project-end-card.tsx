import { ArrowTitleLink } from "@/components/atoms/arrow-title-link";
import { PROJECTS_SECTION } from "@/constants/projects";

export function ProjectEndCard() {
  return (
    <ArrowTitleLink href={PROJECTS_SECTION.allHref} narrow>
      {PROJECTS_SECTION.allLabel}
    </ArrowTitleLink>
  );
}
