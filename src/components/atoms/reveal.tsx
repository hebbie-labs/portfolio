import type { ComponentProps, CSSProperties } from "react";

/** Slides up after the startup screen (CSS in globals.css); `index` staggers siblings. */
export function Reveal({ index = 0, ...props }: ComponentProps<"div"> & { index?: number }) {
  return <div data-reveal style={{ "--i": index } as CSSProperties} {...props} />;
}
