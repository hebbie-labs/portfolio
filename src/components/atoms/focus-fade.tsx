"use client";

import { useEffect, useRef, type ComponentProps } from "react";

import { getFocusOpacity } from "@/lib/focus-fade";

/** Dims the element the further it is from the viewport's focus line (see `getFocusOpacity`). */
export function FocusFade(props: ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      element.style.opacity = String(getFocusOpacity(element.getBoundingClientRect(), innerHeight, scrollY));
    };
    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    addEventListener("scroll", scheduleUpdate, { passive: true });
    addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", scheduleUpdate);
      removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return <div ref={ref} {...props} />;
}
