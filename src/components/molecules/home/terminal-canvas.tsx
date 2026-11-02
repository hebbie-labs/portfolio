"use client";

import { JetBrains_Mono } from "next/font/google";
import { useCallback, useEffect, useRef } from "react";

import { ThreeCanvas, type SceneSetup } from "@/components/atoms/three-canvas";
import { HOME_HERO } from "@/constants/home";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTheme } from "@/hooks/use-theme";

import { buildTerminalScene, type TerminalColors } from "./terminal-scene";

// Code font of the window only; lives in this client chunk, so it loads with the scene.
const mono = JetBrains_Mono({ subsets: ["latin"], weight: "500" });

const readColors = (): TerminalColors => {
  const style = getComputedStyle(document.documentElement);
  const token = (name: string) => style.getPropertyValue(`--${name}`).trim();
  return {
    bg2: token("bg-2"),
    line: token("line"),
    muted: token("muted"),
    fg: token("fg"),
    accent: token("accent"),
  };
};

/** 3D code window of the hero; follows the pointer, rebuilt in the new colors when the theme changes. */
export function TerminalCanvas({ label }: { label: string }) {
  const theme = useTheme();
  const still = useMediaQuery("(prefers-reduced-motion: reduce)");
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (still) return;
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / innerWidth) * 2 - 1;
      pointer.current.y = 1 - (e.clientY / innerHeight) * 2;
    };
    addEventListener("pointermove", move, { passive: true });
    return () => removeEventListener("pointermove", move);
  }, [still]);

  const setup = useCallback<SceneSetup>(
    (scene, camera) =>
      buildTerminalScene(scene, camera, {
        colors: readColors(),
        font: mono.style.fontFamily,
        file: HOME_HERO.codeFile,
        code: HOME_HERO.code,
        pointer: pointer.current,
        still,
      }),
    [still],
  );

  // A theme change remounts the canvas, so the scene is rebuilt in the new tokens.
  return <ThreeCanvas key={theme} setup={setup} label={label} />;
}
