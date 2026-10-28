"use client";

import { useCallback, useEffect, useRef } from "react";

import { ThreeCanvas, type SceneSetup } from "@/components/atoms/three-canvas";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTheme } from "@/hooks/use-theme";

import { buildServerScene, type SceneColors } from "./server-scene";

const readColors = (): SceneColors => {
  const style = getComputedStyle(document.documentElement);
  const token = (name: string) => style.getPropertyValue(`--${name}`).trim();
  return {
    bg: token("bg"),
    line: token("line"),
    muted: token("muted"),
    accent: token("accent"),
  };
};

/** 3D homeserver in the project frame; `step` is the active view. Rebuilt in the new colors when the theme changes. */
export function HomeserverScene({
  step,
  label,
}: {
  step: number;
  label: string;
}) {
  const theme = useTheme();
  const still = useMediaQuery("(prefers-reduced-motion: reduce)");
  // Read every frame, so a step change doesn't rebuild the scene.
  const current = useRef(step);
  useEffect(() => {
    current.current = step;
  }, [step]);

  const setup = useCallback<SceneSetup>(
    (scene, camera) =>
      buildServerScene(scene, camera, {
        colors: readColors(),
        step: () => current.current,
        still,
      }),
    [still],
  );

  // A theme change remounts the canvas, so the scene is rebuilt in the new tokens.
  return <ThreeCanvas key={theme} setup={setup} label={label} />;
}
