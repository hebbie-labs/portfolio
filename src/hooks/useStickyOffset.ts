import { useEffect, type RefObject } from "react";

import { useWindowEvent } from "@/hooks/useWindowEvent";

/**
 * Keeps `--sticky-offset` on `root`: how far the `position: sticky` element has moved down inside it, in px.
 * Lets a float in the text follow the sticky element, so the text wraps around where it is now.
 */
export function useStickyOffset(
  root: RefObject<HTMLElement | null>,
  sticky: RefObject<HTMLElement | null>,
) {
  const update = () => {
    if (!root.current || !sticky.current) return;
    const offset =
      sticky.current.getBoundingClientRect().top -
      root.current.getBoundingClientRect().top;
    root.current.style.setProperty("--sticky-offset", `${offset}px`);
  };

  useEffect(update);
  useWindowEvent("scroll", update);
  useWindowEvent("resize", update);
}
