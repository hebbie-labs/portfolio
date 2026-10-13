"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/atoms/reveal";
import { Body, Display } from "@/components/atoms/typography";
import { useTimelinePhoto } from "@/components/providers/timeline-photo";
import type { TimelineItem } from "@/constants/about";
import { cn, hasPlaceholder } from "@/lib/utils";

/** Observes the horizontal line in the middle of the viewport. */
const MIDDLE_LINE = { rootMargin: "-49% 0px -50% 0px" };

/**
 * Ruled rows: the period as a large number left, station, text and optional detail lines right. The row in the
 * middle of the viewport lights up its period and, from `md`, puts its photo in the sticky portrait frame
 * (`PortraitStack`); below `md` the photo sits in the row instead.
 */
export function Timeline({
  title,
  items: all,
}: {
  title: string;
  items: readonly TimelineItem[];
}) {
  // Unfinished stations stay hidden; placeholder detail lines are dropped.
  const items = all
    .filter((i) => !hasPlaceholder(i.period, i.title, i.text))
    .map((i) => ({
      ...i,
      details: i.details?.filter((d) => !hasPlaceholder(d)),
    }));
  const [active, setActive] = useState(0);
  const { setPhoto } = useTimelinePhoto();
  const list = useRef<HTMLOListElement>(null);
  const rows = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const rowObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const index = rows.current.indexOf(entry.target as HTMLLIElement);
        if (!entry.isIntersecting || index < 0) continue;
        setActive(index);
        setPhoto((entry.target as HTMLElement).dataset.photo ?? null);
      }
    }, MIDDLE_LINE);
    // Back to the portrait once the list no longer crosses the middle line.
    const listObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setPhoto(null);
    }, MIDDLE_LINE);
    rows.current.forEach((row) => row && rowObserver.observe(row));
    if (list.current) listObserver.observe(list.current);
    return () => {
      rowObserver.disconnect();
      listObserver.disconnect();
      setPhoto(null);
    };
  }, [setPhoto]);

  return (
    <Reveal scroll>
      <h2 className="sr-only">{title}</h2>
      <ol ref={list} className="divide-y divide-line border-y border-line">
        {items.map(({ period, title, text, details, image }, i) => (
          <li
            key={title}
            ref={(el) => {
              rows.current[i] = el;
            }}
            data-photo={image?.src}
            className="grid gap-3 py-8 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-8 md:py-10"
          >
            <Display
              as="p"
              size="md"
              className={cn(
                "transition-colors duration-300",
                i === active ? "text-accent" : "text-muted",
              )}
            >
              {period}
            </Display>
            <div className="flex flex-col gap-2 md:pt-2">
              <span className="font-display text-2xl font-semibold md:text-3xl">
                {title}
              </span>
              <Body muted>{text}</Body>
              {details && (
                <ul className="mt-1 flex flex-col gap-1 text-muted">
                  {details.map((d) => (
                    <li key={d} className="flex gap-2 text-sm md:text-base">
                      <span
                        aria-hidden
                        className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent"
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              )}
              {image && (
                <div className="relative mt-3 aspect-[4/5] w-full max-w-xs overflow-hidden rounded-xl bg-bg-2 md:hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="20rem"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
