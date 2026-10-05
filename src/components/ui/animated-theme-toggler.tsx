"use client";

import { useCallback, useEffect, useRef } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";

import { useTheme } from "@/hooks/use-theme";
import { setTheme } from "@/lib/theme";
import { getCssColor, setThemeColor } from "@/lib/theme-color";

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
}

// Based on the MagicUI animated theme toggler, reduced to the circular reveal. All coordinates are
// percentages of the snapshot reference box: Chrome renders absolute px clip-path coordinates on
// ::view-transition-new(root) unscaled on fractional display scales (e.g. Windows 150%).
function getClipPaths(
  cx: number,
  cy: number,
  maxRadius: number,
  width: number,
  height: number,
): [string, string] {
  const at = `${(cx / width) * 100}% ${(cy / height) * 100}%`;
  // circle() percentage radii resolve against hypot(w, h) / sqrt(2) of the reference box.
  const radius = (maxRadius / (Math.hypot(width, height) / Math.SQRT2)) * 100;
  return [`circle(0% at ${at})`, `circle(${radius}% at ${at})`];
}

/** Switches the theme with a circle expanding from the button; without View Transitions it switches instantly. */
export const AnimatedThemeToggler = ({
  duration = 400,
  children,
  ...props
}: AnimatedThemeTogglerProps) => {
  const isDark = useTheme() === "dark";
  const buttonRef = useRef<HTMLButtonElement>(null);
  const activeAnimRef = useRef<Animation | null>(null);

  const cancelAnim = useCallback(() => {
    activeAnimRef.current?.cancel();
    activeAnimRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      cancelAnim();
      const root = document.documentElement;
      if (root.dataset.magicuiThemeVt !== "active") return;
      delete root.dataset.magicuiThemeVt;
      root.style.removeProperty("--magicui-theme-toggle-vt-duration");
      root.style.removeProperty("--magicui-theme-vt-clip-from");
      root.style.removeProperty("background-color");
      document.body.style.removeProperty("background-color");
    };
  }, [cancelAnim]);

  const toggleTheme = useCallback(() => {
    const button = buttonRef.current;
    const root = document.documentElement;
    if (!button || root.dataset.magicuiThemeVt === "active") return;

    // innerWidth/innerHeight (not visualViewport): percentages must resolve
    // against the snapshot reference box, which includes classic scrollbars.
    const { innerWidth: width, innerHeight: height } = window;
    const { top, left, width: w, height: h } = button.getBoundingClientRect();
    const x = left + w / 2;
    const y = top + h / 2;
    const maxRadius = Math.hypot(
      Math.max(x, width - x),
      Math.max(y, height - y),
    );

    const applyTheme = () => setTheme(isDark ? "light" : "dark");

    // Read before applyTheme switches `data-theme`; the bar color is read after it.
    const oldColor = getCssColor("--bg");

    if (
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof document.startViewTransition !== "function"
    ) {
      applyTheme();
      setThemeColor();
      return;
    }

    const clipPath = getClipPaths(x, y, maxRadius, width, height);

    root.dataset.magicuiThemeVt = "active";
    root.style.setProperty(
      "--magicui-theme-toggle-vt-duration",
      `${duration}ms`,
    );
    // Pin the collapsed clip-path via CSS so Firefox does not paint the new
    // theme unclipped between snapshot and the ready.then() JS animation.
    root.style.setProperty("--magicui-theme-vt-clip-from", clipPath[0]);
    // Keep the canvas (visible under Safari's bars, outside the snapshot) on the old color until
    // the reveal finishes. Body paints the live (already switched) theme under the snapshot,
    // which Safari also samples for its bars, so pin it to the old color as well.
    root.style.backgroundColor = oldColor;
    document.body.style.backgroundColor = oldColor;
    // Release the pins slightly before the reveal ends and fade them, so the
    // area outside the snapshot (bars, footer safe-area) blends instead of snapping.
    const FADE_MS = 250;
    const release = () => {
      for (const el of [root, document.body]) {
        el.style.transition = `background-color ${FADE_MS}ms ease-out`;
        el.style.removeProperty("background-color");
        setTimeout(() => el.style.removeProperty("transition"), FADE_MS);
      }
      setThemeColor();
    };
    const releaseTimer = setTimeout(release, duration * 0.65);
    const cleanup = () => {
      clearTimeout(releaseTimer);
      release();
      delete root.dataset.magicuiThemeVt;
      root.style.removeProperty("--magicui-theme-toggle-vt-duration");
      root.style.removeProperty("--magicui-theme-vt-clip-from");
      cancelAnim();
    };

    // Toggle synchronously so the snapshot inside the callback shows the new theme.
    const transition = document.startViewTransition(() => {
      flushSync(applyTheme);
    });
    transition.finished.finally(cleanup).catch(() => {});
    transition.ready
      .then(() => {
        activeAnimRef.current = root.animate(
          { clipPath },
          {
            duration,
            easing: "cubic-bezier(0.77, 0, 0.175, 1)", // = --ease-in-out (WAAPI can't read the token)
            fill: "forwards",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {});
  }, [duration, isDark, cancelAnim]);

  return (
    <button type="button" ref={buttonRef} onClick={toggleTheme} {...props}>
      {isDark ? <Sun /> : <Moon />}
      {children ?? <span className="sr-only">Toggle theme</span>}
    </button>
  );
};
