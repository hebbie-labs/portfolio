import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Display } from "@/components/atoms/typography";
import { PROJECTS_SECTION } from "@/constants/projects";

export function ProjectEndCard() {
  return (
    <Link href={PROJECTS_SECTION.allHref} className="group flex items-end gap-4">
      <Display as="span" size="md" className="w-min">
        {PROJECTS_SECTION.allLabel}
      </Display>
      <ArrowRight
        className="size-10 shrink-0 text-accent transition-transform group-hover:translate-x-1 md:size-16"
        aria-hidden
      />
    </Link>
  );
}
