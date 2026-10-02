import { Reveal } from "@/components/atoms/reveal";
import { Body, Headline, Label } from "@/components/atoms/typography";
import type { TimelineItem } from "@/constants/about";

/** Ruled rows: period left, station, text and optional detail lines right. */
export function Timeline({ title, items }: { title: string; items: readonly TimelineItem[] }) {
  return (
    <div className="flex flex-col gap-10">
      <Reveal scroll>
        <Headline>{title}</Headline>
      </Reveal>
      <Reveal scroll>
        <ol className="divide-y divide-line border-y border-line">
          {items.map(({ period, title, text, details }) => (
            <li key={title} className="grid gap-2 py-6 md:grid-cols-[10rem_1fr] md:gap-8">
              <Label className="md:pt-2">{period}</Label>
              <div className="flex flex-col gap-2">
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
    </div>
  );
}
