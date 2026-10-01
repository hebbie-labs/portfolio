import { useEffect, useRef } from "react";
import { useScroll, useTransform } from "motion/react";

/** Share of the scroll distance during which the track stays put, so the title can be read first. */
const START_DELAY = 0.15;

/**
 * Feeds the sticky scroll section two CSS variables: `--distance` (px the track overflows the viewport)
 * and `--p` (0–1 scroll progress). Whether they are used (desktop, motion allowed) is decided in CSS.
 */
export function useHorizontalScroll() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () =>
      section.current?.style.setProperty(
        "--distance",
        `${Math.max(0, el.scrollWidth - window.innerWidth)}px`,
      );
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const p = useTransform(scrollYProgress, [START_DELAY, 1], [0, 1]);

  return { section, track, p };
}
