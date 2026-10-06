import { useEffect, useRef, type UIEvent } from "react";
import { useMotionValue, useScroll, useTransform } from "motion/react";

import { useMediaQuery } from "@/hooks/use-media-query";

/** Same breakpoint as the `lg:` classes of the track (see ProjectScroll). */
const DESKTOP_QUERY = "(min-width: 64rem)";

/**
 * Feeds the sticky scroll section the CSS variable `--distance` (px the track overflows the viewport, 0 unless desktop
 * and motion allowed) and returns `trackTransform`, the track's `transform`, set directly on the track so no CSS variable cascades through its children.
 * `keepFocusInView` goes on the clipping wrapper: tabbing to an off-screen panel makes the browser scroll
 * that wrapper sideways, so it is reset and the page is scrolled instead (1px of scroll = 1px of track).
 */
export function useHorizontalScroll() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const distance = useMotionValue(0);
  const desktop = useMediaQuery(DESKTOP_QUERY);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = desktop && !reduced;

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => {
      const d = enabled ? Math.max(0, el.scrollWidth - window.innerWidth) : 0;
      distance.set(d);
      section.current?.style.setProperty("--distance", `${d}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [distance, enabled]);

  const { scrollYProgress: progress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });

  const trackTransform = useTransform(
    [progress, distance],
    ([progress, distance]: number[]) =>
      distance ? `translate3d(${-progress * distance}px, 0, 0)` : "none",
  );

  const keepFocusInView = ({ currentTarget }: UIEvent<HTMLElement>) => {
    if (!distance.get() || !currentTarget.scrollLeft) return;
    currentTarget.scrollLeft = 0;
    const focused = document.activeElement?.getBoundingClientRect();
    if (!focused) return;
    if (focused.left < 0) window.scrollBy(0, focused.left);
    else if (focused.right > window.innerWidth)
      window.scrollBy(0, focused.right - window.innerWidth);
  };

  return { section, track, trackTransform, keepFocusInView };
}
