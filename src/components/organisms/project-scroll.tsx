"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

import { Body, Display, Label } from "@/components/atoms/typography";
import { ARCHIVE_PROJECTS, FEATURED_PROJECTS } from "@/constants/projects";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

const pill = "inline-flex h-[52px] items-center gap-2.5 rounded-full border px-5 text-base";

/** Sticky section: on desktop the vertical scroll moves the track sideways; on mobile / reduced motion the panels just stack. */
export function ProjectScroll() {
  const wide = useMediaQuery("(min-width: 48rem)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const horizontal = wide && !reduced;

  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el || !horizontal) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [horizontal]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  const panel = horizontal ? "h-full shrink-0 pt-nav pb-14" : "";
  const divider = horizontal ? "border-l border-line px-12" : "border-t border-line pt-8";

  return (
    <section
      ref={section}
      aria-label="Projekte"
      style={horizontal ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className={cn(horizontal && "sticky top-0 h-screen overflow-hidden")}>
        <motion.div
          ref={track}
          style={horizontal ? { x } : undefined}
          className={cn(
            "flex",
            horizontal ? "h-full w-max px-20" : "flex-col gap-12 page-x py-16",
          )}
        >
          <div className={cn("flex flex-col justify-between gap-6", horizontal && "w-140 pl-0 pr-12", panel)}>
            <Label>(02) Projekte im Detail</Label>
            <Display as="h2" size="md" className={horizontal ? "wrap-anywhere" : undefined}>
              Ausgewählte Arbeiten
            </Display>
            <div className="flex flex-col gap-5">
              <Body muted className="max-w-95">
                Zwei Projekte ausführlich. Weitere findest du am Ende der Reihe.
              </Body>
              {horizontal && (
                <Label className="flex items-center gap-2.5 text-accent">
                  Seitwärts scrollen <ArrowRight className="size-4.5" aria-hidden />
                </Label>
              )}
            </div>
          </div>

          {FEATURED_PROJECTS.map((p) => (
            <article
              key={p.nr}
              className={cn("flex flex-col gap-6", divider, horizontal && "w-290", panel)}
            >
              <div className="flex justify-between">
                <Label>{p.nr}</Label>
                <Label>{p.meta}</Label>
              </div>
              <Display as="h3" size="lg" className={horizontal ? "text-[min(12vw,22vh,180px)]" : "text-[56px]"}>
                {p.title}
              </Display>
              <div className={cn("grid gap-6", horizontal && "grid-cols-[640px_minmax(0,1fr)] gap-x-10")}>
                <figure className="flex h-56 items-center justify-center rounded-2xl border border-line bg-ph md:h-[min(400px,42vh)]">
                  <Label>[Screenshot: {p.title}]</Label>
                </figure>
                <div className="flex min-w-0 flex-col justify-between gap-6">
                  <Body className="md:text-xl">{p.description}</Body>
                  <ul className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Label as="li" key={t} className="rounded-full border border-line px-3 py-1.5">
                        {t}
                      </Label>
                    ))}
                  </ul>
                  {"href" in p ? (
                    <Link href={p.href} className={cn(pill, "self-start border-fg")}>
                      Case Study ansehen <ArrowRight className="size-4.5" aria-hidden />
                    </Link>
                  ) : (
                    <span className={cn(pill, "self-start border-line text-muted")}>Case Study folgt</span>
                  )}
                </div>
              </div>
            </article>
          ))}

          <div className={cn("flex flex-col justify-between gap-8", divider, horizontal && "w-160 pr-0", panel)}>
            <div className="flex flex-col gap-5">
              <Label>Archiv</Label>
              <ul className="border-b border-line">
                {ARCHIVE_PROJECTS.map((a) => (
                  <li key={a.name} className="flex flex-col gap-1 border-t border-line py-4 md:flex-row md:items-baseline md:justify-between md:gap-4">
                    <span className="font-display text-[22px] font-semibold tracking-[-0.02em] md:text-[28px]">{a.name}</span>
                    <Label>{a.stack}</Label>
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/projekte" className="group flex items-end gap-4">
              <Display as="span" size="md" className="leading-[0.88]">
                Alle<br />Projekte
              </Display>
              <ArrowRight className="size-10 shrink-0 text-accent transition-transform group-hover:translate-x-1 md:size-16" aria-hidden />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
