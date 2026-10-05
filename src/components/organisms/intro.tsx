"use client";

import { useAnimate, type AnimationSequence } from "motion/react";
import { useEffect } from "react";
import { LogoIcon } from "@/components/atoms/logo";
import { HyperText } from "@/components/ui/hyper-text";
import { SITE_NAME } from "@/constants/site";
import { INTRO_KEY } from "@/lib/init-scripts";
import { getCssColor, setThemeColor } from "@/lib/theme-color";

/** Coupled to Nav: the startup ring lands on the logo inside `#menu` (see nav.tsx, logo.tsx). */
const NAV_LOGO = '#menu a[href="/"] svg';
const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
/** The sequence is written for 3s; recruiters scanning in minutes shouldn't wait for it. */
const SPEED = 1.4;

/** Geometry of the ring's flight to the nav logo; null while the nav isn't there. */
function measureLanding(scope: HTMLElement) {
  const logo = scope.querySelector("[data-logo]");
  const box = scope.querySelector<HTMLElement>("[data-box]");
  const target = document.querySelector(NAV_LOGO)?.getBoundingClientRect();
  const pill = document.getElementById("menu")?.getBoundingClientRect();
  if (!logo || !box || !target || !pill) return null;

  // The collapsed nav pill already sits where the ring has to land.
  const from = logo.getBoundingClientRect();
  return {
    fly: {
      x: target.left + target.width / 2 - (from.left + from.width / 2),
      y: target.top + target.height / 2 - (from.top + from.height / 2),
    },
    ringRadius: box.offsetWidth / 2,
    screenRadius: Math.hypot(innerWidth, innerHeight),
    pillSize: pill.height,
    logoScale: target.height / from.height,
  };
}

type Landing = NonNullable<ReturnType<typeof measureLanding>>;

/** The box resizes (not scales) so the ring border stays 1px; only the logo scales. */
const createSequence = (
  { fly, ringRadius, screenRadius, pillSize, logoScale }: Landing,
  bg: string,
  bg2: string,
): AnimationSequence => [
  ["[data-logo]", { opacity: [0, 1], scale: [0.9, 1] }, { duration: 0.8 }],
  ["[data-name]", { opacity: [0, 1] }, { at: 0.2, duration: 0.6 }],
  ["[data-name]", { opacity: 0 }, { at: 1.3, duration: 0.4 }],
  [
    "[data-screen]",
    {
      clipPath: [
        `circle(${screenRadius}px at 50% 50%)`,
        `circle(${ringRadius}px at 50% 50%)`,
      ],
    },
    { at: 1, duration: 0.8, ease: EASE_IN_OUT },
  ],
  // html/body start as --bg-2 (globals.css) and open up together with the screen.
  [
    document.documentElement,
    { backgroundColor: [bg2, bg] },
    { at: 1, duration: 0.8, ease: EASE_IN_OUT },
  ],
  [
    document.body,
    { backgroundColor: [bg2, bg] },
    { at: 1, duration: 0.8, ease: EASE_IN_OUT },
  ],
  // Once the screen has closed to the ring's size, the ring fades in on top, then the screen fades out under it.
  ["[data-ring]", { opacity: 1 }, { at: 1.8, duration: 0.1 }],
  ["[data-screen]", { opacity: 0 }, { at: 1.9, duration: 0.1 }],
  [
    "[data-box]",
    { ...fly, width: `${pillSize}px`, height: `${pillSize}px` },
    { at: 2, duration: 1, ease: EASE_IN_OUT },
  ],
  [
    "[data-logo]",
    { scale: logoScale },
    { at: 2, duration: 1, ease: EASE_IN_OUT },
  ],
];

export function Intro() {
  const [scope, animate] = useAnimate<HTMLDivElement>();

  useEffect(() => {
    const root = document.documentElement;
    const landing =
      root.dataset.intro === "logo" ? measureLanding(scope.current) : null;
    if (!landing) return;

    const pages = [root, document.body];
    setThemeColor("--bg-2");

    const timeline = animate(
      createSequence(landing, getCssColor("--bg"), getCssColor("--bg-2")),
    );

    timeline.speed = SPEED;
    const themeColor = setTimeout(() => setThemeColor(), 1000 / SPEED);
    const cleanup = () => {
      clearTimeout(themeColor);
      setThemeColor();
      pages.forEach((el) => el.style.removeProperty("background-color"));
    };

    timeline.then(() => {
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {
        // Storage blocked: the startup screen simply plays again on the next load.
      }
      root.dataset.intro = "done";
      cleanup();
    });
    return () => {
      timeline.cancel();
      cleanup();
    };
  }, [animate, scope]);

  // Not `fixed`: Safari tints its bars from fixed elements at the viewport edges, so the
  // full-screen overlay would keep them --bg-2 until the end. The page can't scroll meanwhile.
  // h-lvh: Safari 26 renders the page under its floating toolbar, below the small viewport.
  return (
    <div
      ref={scope}
      aria-hidden
      className="absolute inset-x-0 top-0 z-100 hidden h-lvh items-center justify-center in-data-[intro=logo]:flex"
    >
      <div data-screen className="absolute inset-0 bg-bg-2" />
      <div className="relative">
        <div
          data-box
          className="relative flex size-40 items-center justify-center md:size-54"
        >
          {/* Ring = the future nav pill (logo is ~0.6 of its size in both). */}
          <span
            data-ring
            style={{ opacity: 0 }}
            className="absolute inset-0 rounded-full border border-line bg-glass"
          />
          <span
            data-logo
            style={{ opacity: 0 }}
            className="relative flex shrink-0"
          >
            <LogoIcon className="h-24 md:h-32" />
          </span>
        </div>
        {/* Hangs below the box so the box itself stays centered under the clip circle. */}
        <div
          data-name
          style={{ opacity: 0 }}
          className="absolute top-full left-1/2 mt-6 -translate-x-1/2 text-muted"
        >
          <HyperText
            as="p"
            animateOnHover={false}
            delay={300}
            duration={1000}
            className="py-0 text-sm font-normal tracking-[0.3em] whitespace-nowrap"
          >
            {SITE_NAME}
          </HyperText>
        </div>
      </div>
    </div>
  );
}
