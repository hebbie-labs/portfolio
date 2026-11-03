/** A point in % of the stage (the screenshot, or the whole scene). */
export type Point = { x: number; y: number };

/** One tour stop: index into `views`, the spot the arrow points at and where its text stands. */
export type Stop = { view: number; target?: Point; caption?: Point };

/** Text of a stop without target: bottom left. */
const CAPTION: Point = { x: 22, y: 80 };

/** Share of each leg (stop to stop) that holds still at either end, so every stop can be read. */
const HOLD = 0.2;

const clamp = (v: number, min = 0, max = 1) => Math.min(Math.max(v, min), max);
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
const lerp = (a: Point, b: Point, t: number): Point => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
});

/** Explicit, else on the side away from the target at its height, else bottom left. */
const captionOf = ({ caption, target }: Stop): Point =>
  caption ??
  (target
    ? { x: target.x >= 50 ? 22 : 78, y: clamp(target.y, 25, 75) }
    : CAPTION);

/** The two stops around tour position `s` (0 = first stop) and the eased progress between them. */
function legAt(stops: readonly Stop[], s: number) {
  const i = clamp(Math.floor(s), 0, Math.max(stops.length - 2, 0));
  const t = easeInOut(clamp((s - i - HOLD) / (1 - 2 * HOLD)));
  return { a: stops[i], b: stops[i + 1] ?? stops[i], t };
}

/** How much of view `view` shows at tour position `s`: a short crossfade where the stops change views. */
export function opacityAt(stops: readonly Stop[], s: number, view: number) {
  const { a, b, t } = legAt(stops, s);
  const fade = a.view === b.view ? 0 : clamp((t - 0.4) / 0.2);
  return (a.view === view ? 1 - fade : 0) + (b.view === view ? fade : 0);
}

/** Where the text stands at tour position `s`, gliding from stop to stop. */
export function captionAt(stops: readonly Stop[], s: number) {
  const { a, b, t } = legAt(stops, s);
  return lerp(captionOf(a), captionOf(b), t);
}

/** Size of the arrow's drawing, in the stage's 12:7 so it scales evenly. */
export const ARROW_BOX = { w: 1200, h: 700 };

/** Gap between the text's center and the arrow's start, about half the text block, in `ARROW_BOX` units. */
const START = { x: 175, y: 75 };

/**
 * The arrow at tour position `s`: a curve from beside the text to the target, its open head and its opacity
 * (it fades where a stop has no target). SVG path data in `ARROW_BOX` units.
 */
export function arrowAt(stops: readonly Stop[], s: number) {
  const { a, b, t } = legAt(stops, s);
  const target = lerp(a.target ?? b.target ?? CAPTION, b.target ?? a.target ?? CAPTION, t);
  const opacity = (a.target ? 1 - t : 0) + (b.target ? t : 0);
  const caption = captionAt(stops, s);
  const px = (p: Point) => ({ x: (p.x / 100) * ARROW_BOX.w, y: (p.y / 100) * ARROW_BOX.h });
  const [c, end] = [px(caption), px(target)];
  const [dx, dy] = [end.x - c.x, end.y - c.y];
  // Leaves the text on the edge facing the target: above or below it when the target is mostly up or down.
  const from =
    Math.abs(dy) * 1.5 > Math.abs(dx)
      ? { x: c.x, y: c.y + Math.sign(dy || 1) * START.y }
      : { x: c.x + Math.sign(dx || 1) * START.x, y: c.y };
  // Bows to one side by a fifth of its length, like a hand-drawn arc, and stops a little short of the target.
  const [lx, ly] = [end.x - from.x, end.y - from.y];
  const ctrl = {
    x: (from.x + end.x) / 2 - ly * 0.2,
    y: (from.y + end.y) / 2 + lx * 0.2,
  };
  const angle = Math.atan2(end.y - ctrl.y, end.x - ctrl.x);
  const tip = { x: end.x - Math.cos(angle) * 14, y: end.y - Math.sin(angle) * 14 };
  const wing = (turn: number) =>
    `${tip.x - Math.cos(angle + turn) * 18},${tip.y - Math.sin(angle + turn) * 18}`;
  return {
    path: `M${from.x},${from.y} Q${ctrl.x},${ctrl.y} ${tip.x},${tip.y}`,
    head: `M${wing(0.5)} L${tip.x},${tip.y} L${wing(-0.5)}`,
    opacity,
  };
}
