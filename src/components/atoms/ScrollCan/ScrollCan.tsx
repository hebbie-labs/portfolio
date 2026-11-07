"use client";

import { useLenis } from "lenis/react";
import Image, { type StaticImageData } from "next/image";
import { useRef, type PointerEvent } from "react";

import { useScrollProgress } from "@/hooks/useScrollProgress";

/**
 * Custom page scrollbar: a drink can (cut-out PNG) riding down a dotted track with the scroll position. Click
 * jumps, drag scrolls; keyboard and screen readers keep the native scroll.
 */
export function ScrollCan({ src }: { src: StaticImageData }) {
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  useScrollProgress(ref);

  const scrollToPointer = (e: PointerEvent, immediate: boolean) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const top = (e.clientY / window.innerHeight) * max;
    if (lenis) lenis.scrollTo(top, { immediate });
    else window.scrollTo({ top, behavior: "instant" });
  };

  return (
    <div
      ref={ref}
      aria-hidden
      className="group fixed inset-y-0 right-0 z-40 w-(--scrollbar-w) cursor-pointer touch-none select-none [--p:0] pointer-coarse:w-3"
      onPointerDown={(e) => {
        e.preventDefault();
        e.currentTarget.setPointerCapture(e.pointerId);
        scrollToPointer(e, false);
      }}
      onPointerMove={(e) => {
        if (e.currentTarget.hasPointerCapture(e.pointerId))
          scrollToPointer(e, true);
      }}
    >
      <span className="absolute inset-y-2 left-1/2 w-1 -translate-x-1/2 bg-[radial-gradient(circle,var(--line)_1.5px,transparent_2px)] bg-size-[100%_10px]" />
      <div className="absolute top-0 left-1/2 w-[calc(100%-6px)] translate-x-[-50%] translate-y-[calc(var(--p)*(100dvh-100%))] transition-[scale] duration-200 ease-spring group-hover:scale-110 group-data-active:scale-110 motion-reduce:transition-none">
        <Image src={src} alt="" sizes="32px" className="h-auto w-full" />
      </div>
    </div>
  );
}
