import type { ComponentProps, CSSProperties } from "react";

export type RevealVariant = "up" | "down" | "left" | "right" | "fade" | "scale" | "blur";

/** Reveals on every page load, after the startup screen if it plays (CSS in globals.css); `variant` picks the motion, `index` staggers siblings. */
export function Reveal({
  index = 0,
  variant = "up",
  ...props
}: ComponentProps<"div"> & { index?: number; variant?: RevealVariant }) {
  return <div data-reveal={variant} style={{ "--i": index } as CSSProperties} {...props} />;
}
