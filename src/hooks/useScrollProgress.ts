import { useEffect, useEffectEvent, useRef, type RefObject } from "react";

import { useWindowEvent } from "@/hooks/useWindowEvent";

/**
 * Drives the custom scrollbar (`atoms/ScrollCan`): keeps `--p` (scroll progress, 0 at the top to 1 at the end)
 * on the element and sets `data-active` while scrolling and for a second after.
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const timer = useRef(0);

  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    ref.current?.style.setProperty(
      "--p",
      String(max > 0 ? Math.min(1, window.scrollY / max) : 0),
    );
  };

  useEffect(update);

  // Page height changes (route change, images loading) move the progress without a scroll event.
  const onResize = useEffectEvent(update);
  useEffect(() => {
    const observer = new ResizeObserver(() => onResize());
    observer.observe(document.body);
    return () => {
      observer.disconnect();
      clearTimeout(timer.current);
    };
  }, []);

  useWindowEvent("scroll", () => {
    update();
    const el = ref.current;
    if (!el) return;
    el.dataset.active = "";
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => delete el.dataset.active, 1000);
  });
}
