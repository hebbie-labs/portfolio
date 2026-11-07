import { useEffect, useEffectEvent, type RefObject } from "react";

type Options = {
  /** Narrows (negative) or widens the viewport, as in `IntersectionObserver`. */
  rootMargin?: string;
  /** Stops after the first report in which the element is in view. */
  once?: boolean;
  enabled?: boolean;
};

/**
 * Calls `onChange` once right away and then whenever the element enters or leaves the viewport; `first` marks the
 * initial report (page load). Always calls the latest `onChange`, so it needn't be stable.
 */
export function useInView(
  ref: RefObject<Element | null>,
  onChange: (entry: IntersectionObserverEntry, first: boolean) => void,
  { rootMargin, once = false, enabled = true }: Options = {},
) {
  const report = useEffectEvent(onChange);

  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element) return;

    let first = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        report(entry, first);
        first = false;
        if (once && entry.isIntersecting) observer.disconnect();
      },
      { rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin, once, enabled]);
}
