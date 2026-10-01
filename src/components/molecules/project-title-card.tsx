import { Body, Display, Label } from "@/components/atoms/typography";
import { PROJECTS_SECTION } from "@/constants/projects";
import { cn } from "@/lib/utils";

export function ProjectTitleCard({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
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
