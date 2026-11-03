"use client";

import { useRef, type ComponentProps, type CSSProperties } from "react";

import { useInView } from "@/hooks/useInView";

/** Triggers slightly before the element's bottom edge reaches the viewport's bottom. */
const TRIGGER_MARGIN = "0px 0px -10% 0px";

export type RevealVariant =
  "up" | "down" | "left" | "right" | "fade" | "scale" | "blur";

type Props = ComponentProps<"div"> & {
  index?: number;
  variant?: RevealVariant;
  scroll?: boolean;
};

/**
 * Reveals on every page load, after the startup screen if it plays (CSS in globals.css).
 * `variant` picks the motion, `index` staggers siblings; `scroll` reveals once the element enters
 * the viewport instead (after the load reveals if it is visible right away).
 */
export function Reveal({
  index = 0,
  variant = "up",
  scroll = false,
  ...props
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // Sets `data-in` once in view; `data-load` too if it was visible on the first check (page load).
  useInView(
    ref,
    ({ target, isIntersecting }, first) => {
      if (!isIntersecting) return;
      const element = target as HTMLElement;
      if (first) element.dataset.load = "";
      element.dataset.in = "";
    },
    { rootMargin: TRIGGER_MARGIN, once: true, enabled: scroll },
  );

  return (
    <div
      ref={ref}
      data-reveal={variant}
      data-scroll={scroll || undefined}
      style={{ "--i": index } as CSSProperties}
      {...props}
    />
  );
}
