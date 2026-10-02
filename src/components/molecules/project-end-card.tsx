import { TitleLink } from "@/components/molecules/title-link";
import { PROJECTS_SECTION } from "@/constants/projects";

export function ProjectEndCard() {
  return (
    <TitleLink href={PROJECTS_SECTION.allHref} narrow>
      {PROJECTS_SECTION.allLabel}
    </TitleLink>
  );
}
