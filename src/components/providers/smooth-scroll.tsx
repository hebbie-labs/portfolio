"use client";

import { ReactLenis } from "lenis/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import "lenis/dist/lenis.css";

export function SmoothScroll() {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  if (reduced) return null;
  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: true, syncTouch: false }} />
  );
}
