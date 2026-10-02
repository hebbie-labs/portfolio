"use client";

import { motion, type MotionStyle } from "motion/react";

import { ProjectEndCard } from "@/components/molecules/project-end-card";
import { ProjectTitleCard } from "@/components/molecules/project-title-card";
import { ProjectPreview } from "@/components/organisms/project-preview";
import { FEATURED_PROJECTS, PROJECTS_SECTION } from "@/constants/projects";
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll";
import { cn } from "@/lib/utils";

/**
 * From `lg` (motion allowed) the vertical scroll moves the track sideways; otherwise the panels just stack.
 * Class names are spelled out in full so Tailwind finds them.
 */
const trackClasses = cn(
  "flex flex-col gap-12 page-x py-16",
  // track: one row, translated by the scroll progress
  "lg:motion-safe:h-full lg:motion-safe:w-max lg:motion-safe:flex-row lg:motion-safe:items-start lg:motion-safe:gap-0 lg:motion-safe:py-0",
  "lg:motion-safe:translate-x-[calc(var(--distance,0px)*var(--progress,0)*-1)] lg:motion-safe:will-change-[translate]",
  // panels: fixed widths, spacing after each, title and end card centered, projects hang from the nav
  "lg:motion-safe:[&>*]:shrink-0 lg:motion-safe:[&>*:not(:last-child)]:pr-12",
  "lg:motion-safe:[&>*:first-child]:w-[40vw] lg:motion-safe:[&>article]:w-[32vw]",
  "lg:motion-safe:[&>:is(:first-child,:last-child)]:self-center lg:motion-safe:[&>:not(:is(:first-child,:last-child))]:pt-nav",
);

/** Sticky section: the track of project previews moves sideways while scrolling. */
export function ProjectScroll() {
  const { section, track, progress, keepFocusInView } = useHorizontalScroll();

  return (
    <motion.section
      ref={section}
      aria-label={PROJECTS_SECTION.label}
      style={{ "--progress": progress } as MotionStyle}
      className="lg:motion-safe:h-[calc(100vh+var(--distance,0px))]"
    >
      <div
        onScroll={keepFocusInView}
        className="lg:motion-safe:sticky lg:motion-safe:top-0 lg:motion-safe:h-screen lg:motion-safe:overflow-hidden"
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
