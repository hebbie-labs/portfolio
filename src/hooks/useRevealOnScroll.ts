import { useEffect, type RefObject } from "react";

/** Triggers slightly before the element's bottom edge reaches the viewport's bottom. */
const TRIGGER_MARGIN = "0px 0px -10% 0px";

/** Sets `data-in` on the element once it enters the viewport; `data-load` too if it was already visible on the first check (page load). */
export function useRevealOnScroll(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element) return;

    let isFirstCheck = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visibleOnLoad = isFirstCheck;
        isFirstCheck = false;
        if (!entry.isIntersecting) return;
        if (visibleOnLoad) element.dataset.load = "";
        element.dataset.in = "";
        observer.disconnect();
      },
      { rootMargin: TRIGGER_MARGIN },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, enabled]);
}
