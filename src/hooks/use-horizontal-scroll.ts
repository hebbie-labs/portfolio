import { useEffect, useRef, type UIEvent } from "react";
import { useScroll } from "motion/react";

/**
 * Feeds the sticky scroll section two CSS variables: `--distance` (px the track overflows the viewport)
 * and `--progress` (0–1 scroll progress). Whether they are used (desktop, motion allowed) is decided in CSS.
 * `keepFocusInView` goes on the clipping wrapper: tabbing to an off-screen panel makes the browser scroll
 * that wrapper sideways, so it is reset and the page is scrolled instead (1px of scroll = 1px of track).
 */
export function useHorizontalScroll() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const distance = useRef(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => {
      distance.current = Math.max(0, el.scrollWidth - window.innerWidth);
      section.current?.style.setProperty("--distance", `${distance.current}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress: progress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });

  const keepFocusInView = ({ currentTarget }: UIEvent<HTMLElement>) => {
    if (!distance.current || !currentTarget.scrollLeft) return;
    currentTarget.scrollLeft = 0;
    const focused = document.activeElement?.getBoundingClientRect();
    if (!focused) return;
    if (focused.left < 0) window.scrollBy(0, focused.left);
    else if (focused.right > window.innerWidth)
      window.scrollBy(0, focused.right - window.innerWidth);
  };

  return { section, track, progress, keepFocusInView };
}
