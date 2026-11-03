import {
  useEffect,
  useEffectEvent,
  useRef,
  useSyncExternalStore,
  type RefObject,
} from "react";

import { useWindowEvent } from "@/hooks/useWindowEvent";

/** Pixels between two ticks. */
const GAP = 8;

function subscribeResize(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}

/**
 * Drives the scroll ruler (`atoms/ScrollRuler`): keeps `--pos` (scroll position in ticks) on the element and sets
 * `data-active` while scrolling and for a second after. Returns the tick count, which follows the window height.
 */
export function useScrollRuler(ref: RefObject<HTMLElement | null>) {
  const count = useSyncExternalStore(
    subscribeResize,
    () => Math.floor(window.innerHeight / GAP),
    () => 0,
  );
  const timer = useRef(0);

  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    ref.current?.style.setProperty(
      "--pos",
      String(max > 0 ? (window.scrollY / max) * (count - 1) : -99),
    );
  };

  // After every render, as the tick count changes with the window height.
  useEffect(update);

  // Page height changes (route change, images loading) move the position without a scroll event.
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

  return count;
}
