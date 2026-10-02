"use client";

import { useRef, type ComponentProps, type CSSProperties } from "react";

import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";

export type RevealVariant = "up" | "down" | "left" | "right" | "fade" | "scale" | "blur";

type Props = ComponentProps<"div"> & { index?: number; variant?: RevealVariant; scroll?: boolean };

/**
 * Reveals on every page load, after the startup screen if it plays (CSS in globals.css).
 * `variant` picks the motion, `index` staggers siblings; `scroll` reveals once the element enters
 * the viewport instead (after the load reveals if it is visible right away).
 */
export function Reveal({ index = 0, variant = "up", scroll = false, ...props }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useRevealOnScroll(ref, scroll);

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
