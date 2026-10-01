import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Display } from "@/components/atoms/typography";
import { PROJECTS_SECTION } from "@/constants/projects";
import { cn } from "@/lib/utils";

export function ProjectEndCard({ className }: { className?: string }) {
  const [first, second] = PROJECTS_SECTION.allLabel;
  return (
    <Link href={PROJECTS_SECTION.allHref} className={cn("group flex items-end gap-4", className)}>
      <Display as="span" size="md" className="leading-[0.88]">
        {first}<br />{second}
      </Display>
      <ArrowRight
        className="size-10 shrink-0 text-accent transition-transform group-hover:translate-x-1 md:size-16"
        aria-hidden
      />
    </Link>
  );
}
