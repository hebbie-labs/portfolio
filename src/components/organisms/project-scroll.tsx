"use client";

import { motion, type MotionStyle } from "motion/react";

import { ProjectCard } from "@/components/molecules/project-card";
import { ProjectEndCard } from "@/components/molecules/project-end-card";
import { ProjectTitleCard } from "@/components/molecules/project-title-card";
import { PROJECTS, PROJECTS_SECTION } from "@/constants/projects";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";

/** Sticky section: from `md` (motion allowed) the vertical scroll moves the track sideways; otherwise the panels just stack. */
export function ProjectScroll() {
  const { section, track, p } = useHorizontalScroll();

  return (
    <motion.section
      ref={section}
      aria-label={PROJECTS_SECTION.label}
      style={{ "--p": p } as MotionStyle}
      className="md:motion-safe:h-[calc(100vh+var(--distance,0px))]"
    >
      <div className="md:motion-safe:sticky md:motion-safe:top-0 md:motion-safe:h-screen md:motion-safe:overflow-hidden">
        <div
          ref={track}
          className="flex flex-col gap-12 page-x py-16 md:motion-safe:h-full md:motion-safe:w-max md:motion-safe:flex-row md:motion-safe:items-center md:motion-safe:gap-0 md:motion-safe:py-0 md:motion-safe:translate-x-[calc(var(--distance,0px)*var(--p,0)*-1)] md:motion-safe:will-change-[translate] md:motion-safe:[&>*]:shrink-0 md:motion-safe:[&>*:not(:last-child)]:pr-20 md:motion-safe:[&>*:first-child]:w-[40vw] md:motion-safe:[&>article]:w-[70vw]"
        >
          <ProjectTitleCard />
          {PROJECTS.map((project) => (
            <ProjectCard key={project.nr} {...project} />
          ))}
          <ProjectEndCard />
        </div>
      </div>
    </motion.section>
  );
}
