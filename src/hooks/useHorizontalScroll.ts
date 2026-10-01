import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring, useTransform } from "motion/react";

import { useMediaQuery } from "@/hooks/useMediaQuery";

/** Share of the scroll distance during which the track stays put, so the title can be read first. */
const START_DELAY = 0.15;

/** Maps the vertical scroll through a tall section onto a sideways-moving track (desktop, motion allowed). */
export function useHorizontalScroll() {
  const wide = useMediaQuery("(min-width: 48rem)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const horizontal = wide && !reduced;

  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el || !horizontal) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [horizontal]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const target = useTransform(scrollYProgress, [START_DELAY, 1], [0, -distance]);
  const x = useSpring(target, { stiffness: 120, damping: 28, mass: 0.6 });

  return { horizontal, section, track, x, distance };
}
