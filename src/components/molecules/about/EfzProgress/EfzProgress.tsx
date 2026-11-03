"use client";

import { useSyncExternalStore, type CSSProperties } from "react";

import { cn } from "@/lib/utils";
import type { Apprenticeship } from "@/types/about";

const noop = () => () => {};

/**
 * The Lehre as a bar from start to end, filled up to today and split into its years. The server renders it
 * empty (the page is prerendered), the client fills in today's value; the fill grows once the surrounding
 * `Reveal` (with `group`) is in view.
 */
export function EfzProgress({ title, start, end, years }: Apprenticeship) {
  const from = Date.parse(start);
  const to = Date.parse(end);
  // Rounded so the snapshot stays the same between renders.
  const progress = useSyncExternalStore(
    noop,
    () =>
      Math.round(
        Math.min(1, Math.max(0, (Date.now() - from) / (to - from))) * 1000,
      ) / 1000,
    () => 0,
  );
  const current = Math.min(
    years.length - 1,
    Math.floor(progress * years.length),
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-semibold">{title}</span>
        <span className="text-sm text-muted tabular-nums">
          {start.slice(0, 4)}–{end.slice(0, 4)}
        </span>
      </div>
      <div
        role="progressbar"
        aria-label={title}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        className="relative h-2 overflow-hidden rounded-full bg-line"
      >
        <div
          className="h-full origin-left scale-x-0 bg-accent transition-transform delay-300 duration-1000 ease-out group-data-in:scale-x-(--p) motion-reduce:transition-none"
          style={{ "--p": progress } as CSSProperties}
        />
        <div aria-hidden className="absolute inset-0 grid grid-cols-4">
          {years.map((year) => (
            <span key={year} className="border-l-2 border-bg first:border-0" />
          ))}
        </div>
      </div>
      <ol className="grid grid-cols-4 text-xs md:text-sm">
        {years.map((year, i) => (
          <li
            key={year}
            className={cn(
              "transition-colors duration-300",
              i === current
                ? "text-accent"
                : i < current
                  ? "text-fg"
                  : "text-muted",
            )}
          >
            {year}
          </li>
        ))}
      </ol>
    </div>
  );
}
