"use client";

import { motion } from "motion/react";

import { ProjectPanel } from "@/components/organisms/projects/ProjectsTrack/ProjectPanel";
import { PROJECTS, PROJECTS_PAGE } from "@/constants/projects";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";

/**
 * Like the start page's ProjectsScroller: from `lg` (motion allowed) the vertical scroll moves the track sideways,
 * otherwise the panels stack. Panels are as wide as the height allows (preview 12:7 plus title and summary below
 * the nav). Class names are spelled out in full so Tailwind finds them.
 */
const trackClasses = [
  "flex flex-col gap-16 page-x pt-nav pb-16",
  "lg:motion-safe:h-full lg:motion-safe:w-max lg:motion-safe:flex-row lg:motion-safe:items-center lg:motion-safe:gap-0 lg:motion-safe:pb-0 lg:motion-safe:pt-[calc(var(--nav-top)+var(--nav-h))]",
  "lg:motion-safe:will-change-transform",
  "lg:motion-safe:[&>*]:shrink-0 lg:motion-safe:[&>*:not(:last-child)]:pr-16",
  "lg:motion-safe:[&>*]:w-[min(70vw,calc((100svh-21rem)*12/7))]",
].join(" ");

/** All projects as large panels on a sideways track. */
export function ProjectsTrack() {
  const { section, track, trackTransform, keepFocusInView } =
    useHorizontalScroll();

  return (
    <section
      ref={section}
      aria-label={PROJECTS_PAGE.title}
      className="lg:motion-safe:h-[calc(100vh+var(--distance,0px))]"
    >
      <div
        onScroll={keepFocusInView}
        className="lg:motion-safe:sticky lg:motion-safe:top-0 lg:motion-safe:h-screen lg:motion-safe:overflow-hidden"
      >
        <motion.div
          ref={track}
          style={{ transform: trackTransform }}
          className={trackClasses}
        >
          {PROJECTS.map((project) => (
            <ProjectPanel key={project.slug} {...project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
