"use client";

import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/atoms/reveal";
import { Body, Display } from "@/components/atoms/typography";
import type { TimelineItem } from "@/constants/about";
import { cn } from "@/lib/utils";

/** Ruled rows: the period as a large number left, station, text and optional detail lines right. The row in the middle of the viewport lights up its period. */
export function Timeline({ title, items }: { title: string; items: readonly TimelineItem[] }) {
  const [active, setActive] = useState(0);
  const rows = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = rows.current.indexOf(entry.target as HTMLLIElement);
          if (entry.isIntersecting && index >= 0) setActive(index);
        }
      },
      { rootMargin: "-49% 0px -50% 0px" },
    );
    rows.current.forEach((row) => row && observer.observe(row));
    return () => observer.disconnect();
  }, []);

  return (
    <Reveal scroll>
      <h2 className="sr-only">{title}</h2>
      <ol className="divide-y divide-line border-y border-line">
        {items.map(({ period, title, text, details }, i) => (
          <li
            key={title}
            ref={(el) => {
              rows.current[i] = el;
            }}
            className="grid gap-3 py-8 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-8 md:py-10"
          >
            <Display
              as="p"
              size="md"
              className={cn("transition-colors duration-500", i === active ? "text-accent" : "text-muted")}
            >
              {period}
            </Display>
            <div className="flex flex-col gap-2 md:pt-2">
              <span className="font-display text-2xl font-semibold md:text-3xl">{title}</span>
              <Body muted>{text}</Body>
              {details && (
                <ul className="mt-1 flex flex-col gap-1 text-muted">
                  {details.map((d) => (
                    <li key={d} className="flex gap-2 text-sm md:text-base">
                      <span aria-hidden className="text-accent">–</span>
                      {d}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
