import { Polaroid } from "@/components/atoms/Polaroid";
import { Reveal } from "@/components/atoms/Reveal";
import { Body } from "@/components/atoms/Typography";
import { EfzProgress } from "@/components/molecules/about/EfzProgress";
import { cn } from "@/lib/utils";
import type { Apprenticeship, TimelineItem } from "@/types/about";

/**
 * The Lehre's progress bar on top, then ruled rows: period, station, text and optional detail lines, with the
 * station's photo as a polaroid beside them, alternately right and left and tilted (below on mobile).
 */
export function Timeline({
  title,
  lehre,
  items,
}: {
  title: string;
  lehre: Apprenticeship;
  items: readonly TimelineItem[];
}) {
  return (
    <Reveal scroll className="group flex flex-col gap-10">
      <h2 className="sr-only">{title}</h2>
      <EfzProgress {...lehre} />
      <ol className="divide-y divide-line border-y border-line">
        {items.map(({ period, title, text, details, image }, i) => (
          <li
            key={title}
            className={cn(
              "flex flex-col gap-6 py-8 sm:items-start sm:justify-between sm:gap-10 md:py-10",
              i % 2 ? "sm:flex-row" : "sm:flex-row-reverse",
            )}
          >
            <div className="flex flex-col gap-2">
              <span className="text-sm text-accent tabular-nums">
                {period}
              </span>
              <span className="text-2xl font-semibold md:text-3xl">
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
            </div>
            {image && (
              <Polaroid
                src={image.src}
                alt={image.alt}
                caption={period}
                className={cn(
                  "ml-2 w-40 shrink-0 sm:mt-2 sm:ml-0 sm:w-44",
                  i % 2 ? "rotate-2" : "-rotate-3",
                )}
              />
            )}
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
