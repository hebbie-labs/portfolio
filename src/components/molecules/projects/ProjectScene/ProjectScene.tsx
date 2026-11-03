"use client";

import dynamic from "next/dynamic";

import type { Theme } from "@/lib/theme";
import type { Project } from "@/types/project";

// three.js is heavy: loaded only on the client and only where a project with a scene is shown.
const SCENES = {
  homeserver: dynamic(
    () =>
      import("./HomeserverScene").then(
        (m) => m.HomeserverScene,
      ),
    { ssr: false },
  ),
};

/** The project's 3D scene (`Project.scene`) at `step`; fills its positioned parent. */
export function ProjectScene({
  scene,
  step,
  label,
  theme,
}: {
  scene: NonNullable<Project["scene"]>;
  step: number;
  label: string;
  /** Inside a `data-theme` subtree that differs from the page (e.g. the always dark tour). */
  theme?: Theme;
}) {
  const Scene = SCENES[scene];
  return <Scene step={step} label={label} theme={theme} />;
}
