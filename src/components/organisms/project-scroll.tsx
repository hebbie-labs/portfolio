"use client";

import { motion, type MotionStyle } from "motion/react";

import { ProjectEndCard } from "@/components/molecules/project-end-card";
import { ProjectTitleCard } from "@/components/molecules/project-title-card";
import { ProjectPreview } from "@/components/organisms/project-preview";
import { FEATURED_PROJECTS, PROJECTS_SECTION } from "@/constants/projects";
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll";
import { cn } from "@/lib/utils";

/**
 * From `md` (motion allowed) the vertical scroll moves the track sideways; otherwise the panels just stack.
 * Class names are spelled out in full so Tailwind finds them.
 */
const trackClasses = cn(
  "flex flex-col gap-12 page-x py-16",
  // track: one row, translated by the scroll progress
  "md:motion-safe:h-full md:motion-safe:w-max md:motion-safe:flex-row md:motion-safe:items-start md:motion-safe:gap-0 md:motion-safe:py-0",
  "md:motion-safe:translate-x-[calc(var(--distance,0px)*var(--progress,0)*-1)] md:motion-safe:will-change-[translate]",
  // panels: fixed widths, spacing after each, title and end card centered, projects hang from the nav
  "md:motion-safe:[&>*]:shrink-0 md:motion-safe:[&>*:not(:last-child)]:pr-12",
  "md:motion-safe:[&>*:first-child]:w-[30vw] md:motion-safe:[&>article]:w-[32vw]",
  "md:motion-safe:[&>:is(:first-child,:last-child)]:self-center md:motion-safe:[&>:not(:is(:first-child,:last-child))]:pt-nav",
);

/** Sticky section: the track of project previews moves sideways while scrolling. */
export function ProjectScroll() {
  const { section, track, progress, keepFocusInView } = useHorizontalScroll();

  return (
    <motion.section
      ref={section}
      aria-label={PROJECTS_SECTION.label}
      style={{ "--progress": progress } as MotionStyle}
      className="md:motion-safe:h-[calc(100vh+var(--distance,0px))]"
    >
      <div
        onScroll={keepFocusInView}
        className="md:motion-safe:sticky md:motion-safe:top-0 md:motion-safe:h-screen md:motion-safe:overflow-hidden"
      >
        <div ref={track} className={trackClasses}>
          <ProjectTitleCard />
          {FEATURED_PROJECTS.map((project) => (
            <ProjectPreview key={project.slug} {...project} />
          ))}
          <ProjectEndCard />
        </div>
      </div>
    </motion.section>
  );
}
