import { useEffect, useRef } from "react";

/** Observes the horizontal line in the middle of the viewport. */
export const MIDDLE_LINE = { rootMargin: "-49% 0px -50% 0px" };

/**
 * Calls `onEnter` for the row crossing the middle of the viewport, and `onAbove` once the list is scrolled back
 * below it (the first row leaves downwards). Attach the returned ref per row: `ref={(el) => { rows.current[i] = el }}`.
 * Pass stable callbacks (`useCallback`), or the observer is rebuilt on every render.
 */
export function useActiveRow<T extends HTMLElement>(
  onEnter: (index: number, row: T) => void,
  onAbove?: () => void,
) {
  const rows = useRef<(T | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const row = entry.target as T;
        const index = rows.current.indexOf(row);
        if (index < 0) continue;
        if (entry.isIntersecting) onEnter(index, row);
        else if (index === 0 && entry.boundingClientRect.top > innerHeight / 2)
          onAbove?.();
      }
    }, MIDDLE_LINE);
    rows.current.forEach((row) => row && observer.observe(row));
    return () => observer.disconnect();
  }, [onEnter, onAbove]);

  return rows;
}
