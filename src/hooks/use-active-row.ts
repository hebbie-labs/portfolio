import { useEffect, useRef } from "react";

/** Observes the horizontal line in the middle of the viewport. */
export const MIDDLE_LINE = { rootMargin: "-49% 0px -50% 0px" };

const atPageEnd = () =>
  innerHeight + scrollY >= document.documentElement.scrollHeight - 2;

/**
 * Calls `onEnter` for the row crossing the middle of the viewport, and `onAbove` once the list is scrolled back
 * below it (a row leaves while the first row sits below the middle). Attach the returned ref per row: `ref={(el) => { rows.current[i] = el }}`.
 * On tall screens the last rows can't reach the middle before the page ends: there the last row counts instead.
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
        if (entry.isIntersecting) {
          if (!atPageEnd()) onEnter(index, row);
        }
        // Any row leaving counts, not just the first: a jump to the top skips the first row's own exit.
        else if ((rows.current[0]?.getBoundingClientRect().top ?? 0) > innerHeight / 2)
          onAbove?.();
      }
    }, MIDDLE_LINE);
    rows.current.forEach((row) => row && observer.observe(row));

    // Entering the page end picks the last row; leaving it hands back to the row on the middle line, which the
    // observer won't report again as it never left.
    let atEnd = false;
    const onScroll = () => {
      if (atEnd === atPageEnd()) return;
      atEnd = !atEnd;
      const index = atEnd
        ? rows.current.length - 1
        : rows.current.findIndex((row) => {
            const rect = row?.getBoundingClientRect();
            return !!rect && rect.top <= innerHeight / 2 && rect.bottom > innerHeight / 2;
          });
      const row = rows.current[index];
      // Only the list in sight: on a page with several lists, the others keep their row.
      const rect = row?.getBoundingClientRect();
      if (row && rect && rect.bottom > 0 && rect.top < innerHeight) onEnter(index, row);
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      removeEventListener("scroll", onScroll);
    };
  }, [onEnter, onAbove]);

  return rows;
}
