"use client";

import {
  Cloudflare,
  Docker,
  GitHubDark,
  GitHubLight,
  PostgreSQL,
} from "developer-icons";
import { useCallback, useEffect, useRef } from "react";

import { ThreeCanvas, type SceneSetup } from "@/components/atoms/three-canvas";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTheme } from "@/hooks/use-theme";

import {
  buildServerScene,
  type SceneColors,
  type SceneLogos,
} from "./server-scene";

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

/** Order of the hidden logos below. */
const LOGOS = ["docker", "cloudflare", "github", "postgres"] as const;

/**
 * 3D homeserver in the project frame; `step` is the active view. Rebuilt in the new colors when the theme changes.
 * The logos render hidden as SVG, the scene turns their markup into textures.
 */
export function HomeserverScene({
  step,
  label,
}: {
  step: number;
  label: string;
}) {
  const theme = useTheme();
  const still = useMediaQuery("(prefers-reduced-motion: reduce)");
  const logos = useRef<HTMLDivElement>(null);
  // Read every frame, so a step change doesn't rebuild the scene.
  const current = useRef(step);
  useEffect(() => {
    current.current = step;
  }, [step]);

  const setup = useCallback<SceneSetup>(
    (scene, camera) => {
      const svgs = [...(logos.current?.children ?? [])].map((svg) =>
        new XMLSerializer().serializeToString(svg),
      );
      return buildServerScene(scene, camera, {
        colors: readColors(),
        logos: Object.fromEntries(
          LOGOS.map((name, i) => [name, svgs[i] ?? ""]),
        ) as SceneLogos,
        font: getComputedStyle(document.body)
          .getPropertyValue("--font-mono")
          .trim(),
        step: () => current.current,
        still,
      });
    },
    [still],
  );

  const GitHub = theme === "dark" ? GitHubLight : GitHubDark;
  return (
    <>
      <div ref={logos} hidden>
        <Docker size={256} />
        <Cloudflare size={256} />
        <GitHub size={256} />
        <PostgreSQL size={256} />
      </div>
      {/* A theme change remounts the canvas, so the scene is rebuilt in the new tokens. */}
      <ThreeCanvas key={theme} setup={setup} label={label} />
    </>
  );
}
