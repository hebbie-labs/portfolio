"use client";

import dynamic from "next/dynamic";

import type { Project } from "@/types/project";

// three.js is heavy: loaded only on the client and only where a project with a scene is shown.
const SCENES = {
  homeserver: dynamic(
    () =>
      import("@/components/molecules/projects/homeserver-scene").then(
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
}: {
  scene: NonNullable<Project["scene"]>;
  step: number;
  label: string;
}) {
  const Scene = SCENES[scene];
  return <Scene step={step} label={label} />;
}
