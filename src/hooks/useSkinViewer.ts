import { useEffect, useRef, type RefObject } from "react";
import { IdleAnimation, SkinViewer, type PlayerObject } from "skinview3d";

import { useInView } from "@/hooks/useInView";
import { useWindowEvent } from "@/hooks/useWindowEvent";

type Look = { x: number; y: number };

/** Where the head looks while the pointer is outside the look area: down left, towards the hero's contact button. */
const REST: Look = { x: -0.6, y: 0.6 };

/** Head rotation (radians) for a look (-1…1 per axis). */
const turn = ({ x, y }: Look) => ({ x: y * 0.4, y: x * 0.7 });

/**
 * skinview3d's idle sway, plus the head easing towards `look`. It starts at `REST`, turns slowly (~1.5 s) the first
 * time the pointer moves in and follows quickly after that.
 */
class LookAnimation extends IdleAnimation {
  private last = 0;
  private firstMove?: number;

  constructor(private readonly look: RefObject<Look>) {
    super();
  }

  protected animate(player: PlayerObject) {
    super.animate(player);
    if (this.firstMove === undefined && this.look.current !== REST)
      this.firstMove = this.progress;
    const rate =
      this.firstMove !== undefined && this.progress - this.firstMove < 1.5
        ? 2
        : 8;
    // Frame-rate independent: eases by the seconds since the last frame. Snaps until the first move.
    const ease =
      this.firstMove === undefined
        ? 1
        : 1 - Math.exp(-(this.progress - this.last) * rate);
    this.last = this.progress;
    const { head } = player.skin;
    const target = turn(this.look.current);
    head.rotation.x += (target.x - head.rotation.x) * ease;
    head.rotation.y += (target.y - head.rotation.y) * ease;
  }
}

/**
 * Renders the Minecraft skin at `skin` (slim model) into the canvas with skinview3d, sized to the canvas and paused
 * out of view, turned towards the hero's contact button. With `animate`, it sways idly and turns its head towards the
 * pointer while the pointer is inside the canvas' closest `lookArea` (back to the button outside it); otherwise it
 * stands still (reduced motion). Disposes the viewer on unmount.
 */
export function useSkinViewer(
  ref: RefObject<HTMLCanvasElement | null>,
  skin: string,
  lookArea: string,
  animate: boolean,
) {
  const viewer = useRef<SkinViewer>(null);
  const look = useRef<Look>(REST);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const instance = new SkinViewer({
      canvas,
      width: canvas.clientWidth,
      height: canvas.clientHeight,
      skin,
      model: "slim",
      enableControls: false,
      animation: animate ? new LookAnimation(look) : undefined,
    });
    // Turned ~20° to the viewer's left, towards the hero's contact button.
    instance.playerObject.rotation.y = -0.35;
    const { x, y } = turn(REST);
    instance.playerObject.skin.head.rotation.set(x, y, 0);
    viewer.current = instance;

    const resize = new ResizeObserver(() => {
      if (canvas.clientWidth && canvas.clientHeight)
        instance.setSize(canvas.clientWidth, canvas.clientHeight);
    });
    resize.observe(canvas);

    return () => {
      resize.disconnect();
      instance.dispose();
      viewer.current = null;
    };
  }, [ref, skin, animate]);

  useInView(ref, ({ isIntersecting }) => {
    if (viewer.current) viewer.current.renderPaused = !isIntersecting;
  });

  useWindowEvent(
    "pointermove",
    (e) => {
      const canvas = ref.current;
      const area = canvas?.closest(lookArea);
      if (!canvas || !area?.contains(e.target as Node)) {
        look.current = REST;
        return;
      }
      // Relative to the head, roughly the canvas' upper quarter.
      const box = canvas.getBoundingClientRect();
      const clamp = (v: number) => Math.max(-1, Math.min(1, v));
      look.current = {
        x: clamp((e.clientX - box.left - box.width / 2) / (innerWidth / 2)),
        y: clamp((e.clientY - box.top - box.height / 4) / (innerHeight / 2)),
      };
    },
    animate,
  );
}
