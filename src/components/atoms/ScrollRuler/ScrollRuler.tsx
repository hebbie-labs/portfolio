"use client";

import { useLenis } from "lenis/react";
import { useRef, type CSSProperties, type PointerEvent } from "react";

import { useScrollRuler } from "@/hooks/useScrollRuler";

/**
 * Custom page scrollbar: a ruler of ticks that magnify around the scroll position and the cursor
 * (CSS in globals.css). Click jumps, drag scrolls; keyboard and screen readers keep the native scroll.
 */
export function ScrollRuler() {
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const count = useScrollRuler(ref);

  const scrollToPointer = (e: PointerEvent, immediate: boolean) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const top = (e.clientY / window.innerHeight) * max;
    if (lenis) lenis.scrollTo(top, { immediate });
    else window.scrollTo({ top, behavior: "instant" });
  };

  return (
    <div
      ref={ref}
      data-ruler
      aria-hidden
      className="fixed inset-y-0 right-0 z-40 flex w-6 cursor-pointer touch-none flex-col justify-around pr-0.5 select-none pointer-coarse:w-3"
      onPointerDown={(e) => {
        e.preventDefault();
        e.currentTarget.setPointerCapture(e.pointerId);
        scrollToPointer(e, false);
      }}
      onPointerMove={(e) => {
        // Tick i sits at (i + 0.5) / count of the height (justify-around).
        if (e.pointerType === "mouse")
          e.currentTarget.style.setProperty(
            "--hover",
            String((e.clientY / window.innerHeight) * count - 0.5),
          );
        if (e.currentTarget.hasPointerCapture(e.pointerId))
          scrollToPointer(e, true);
      }}
      onPointerLeave={(e) => e.currentTarget.style.removeProperty("--hover")}
    >
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          data-major={i % 10 === 0 || undefined}
          style={{ "--i": i } as CSSProperties}
        />
      ))}
    </div>
  );
}
