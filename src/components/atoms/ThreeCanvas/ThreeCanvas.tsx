"use client";

import { useRef } from "react";

import { useThreeScene, type SceneSetup } from "@/hooks/useThreeScene";

export type { SceneSetup };

/**
 * three.js canvas filling its (positioned) parent, rendered by `useThreeScene`. Transparent, so the parent's surface
 * shows. Pass a stable `setup` (`useCallback`), or the scene is rebuilt on every render.
 */
export function ThreeCanvas({
  setup,
  label,
}: {
  setup: SceneSetup;
  /** Describes the scene for screen readers. */
  label: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useThreeScene(ref, setup);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label={label}
      className="absolute inset-0 size-full"
    />
  );
}
