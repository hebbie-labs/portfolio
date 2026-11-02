import { ArrowTitleLink } from "@/components/molecules/home/ArrowTitleLink";
import { PROJECTS_SECTION } from "@/constants/projects";

export function ProjectEndCard() {
  return (
    <ArrowTitleLink href={PROJECTS_SECTION.allHref} narrow>
      {PROJECTS_SECTION.allLabel}
    </ArrowTitleLink>
  );
}
