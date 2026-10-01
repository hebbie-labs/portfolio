"use client";

import { motion } from "motion/react";

import { ProjectCard } from "@/components/molecules/project-card";
import { ProjectEndCard } from "@/components/molecules/project-end-card";
import { ProjectTitleCard } from "@/components/molecules/project-title-card";
import { PROJECTS, PROJECTS_SECTION } from "@/constants/projects";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import { cn } from "@/lib/utils";

/** Sticky section: on desktop the vertical scroll moves the track sideways; on mobile / reduced motion the panels just stack. */
export function ProjectScroll() {
  const { horizontal, section, track, x, distance } = useHorizontalScroll();

  return (
    <section
      ref={section}
      aria-label={PROJECTS_SECTION.label}
      style={horizontal ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className={cn(horizontal && "sticky top-0 h-screen overflow-hidden")}>
        <motion.div
          ref={track}
          style={horizontal ? { x } : undefined}
          className={cn("flex", horizontal ? "h-full w-max items-center px-20 will-change-transform" : "flex-col gap-12 page-x py-16")}
        >
          <ProjectTitleCard className={cn(horizontal && "w-[40vw] shrink-0 pr-20")} />
          {PROJECTS.map((p) => (
            <ProjectCard key={p.nr} {...p} className={cn(horizontal && "w-[70vw] shrink-0 pr-20")} />
          ))}
          <ProjectEndCard className={cn(horizontal && "shrink-0")} />
        </motion.div>
      </div>
    </section>
  );
}
