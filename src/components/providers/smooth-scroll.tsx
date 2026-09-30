"use client";

import { ReactLenis } from "lenis/react";
import { useSyncExternalStore } from "react";
import "lenis/dist/lenis.css";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

export function SmoothScroll() {
  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );

  if (reduced) return null;
  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: true, syncTouch: false }} />
  );
}
