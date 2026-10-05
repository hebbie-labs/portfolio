import { ArrowRight } from "lucide-react";

import type { DiagramRow } from "@/constants/projects";

/** Lanes of stations joined by arrows; sized by the container (`Screen` is an `@container`), so it scales like a screenshot. */
export function StackDiagram({ rows }: { rows: readonly DiagramRow[] }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-[3.5cqw] p-[4cqw] text-[clamp(10px,2.1cqw,16px)] leading-tight">
      {rows.map(({ label, flow }) => (
        <div key={label} className="flex items-center gap-[1.2cqw]">
          <span className="w-[5.5em] shrink-0 font-mono text-muted @max-md:hidden">
            {label}
          </span>
          {flow.map((station, i) => (
            <span key={i} className="contents">
              {i > 0 && (
                <ArrowRight
                  aria-hidden
                  className="size-[1.2em] shrink-0 text-accent"
                />
              )}
              <span className="rounded-full border border-line bg-bg px-[0.7em] py-[0.45em] whitespace-nowrap">
                {station}
              </span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
