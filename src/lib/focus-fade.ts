const MIN_OPACITY = 0.25;
/** Share of the element's height around the focus line that stays fully visible. */
const FULL_ZONE = 0.25;
/** Distance from the full zone to `MIN_OPACITY`, as a share of the viewport height. */
const FADE_DISTANCE = 0.5;
/** Focus line position as a share of the viewport height: starts low so the first element is visible on load, then glides to the center. */
const FOCUS_AT_TOP = 0.75;
const FOCUS_AT_REST = 0.5;

function getFocusLine(viewportHeight: number, scrollY: number) {
  const glide = Math.max(0, 1 - scrollY / viewportHeight);
  return viewportHeight * (FOCUS_AT_REST + (FOCUS_AT_TOP - FOCUS_AT_REST) * glide);
}

/** Opacity of an element from its distance to the focus line: 1 inside the full zone, `MIN_OPACITY` beyond the fade distance. */
export function getFocusOpacity(
  { top, height }: Pick<DOMRect, "top" | "height">,
  viewportHeight: number,
  scrollY: number,
) {
  const offset = Math.abs(top + height / 2 - getFocusLine(viewportHeight, scrollY));
  const fade = (offset - height * FULL_ZONE) / (viewportHeight * FADE_DISTANCE);
  return 1 - (1 - MIN_OPACITY) * Math.min(1, Math.max(0, fade));
}
