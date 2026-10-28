"use client";

import { Cloudflare, Docker, GitHubDark, GitHubLight } from "developer-icons";
import {
  Code,
  Cog,
  Container,
  Database,
  Globe,
  KeyRound,
  LayoutDashboard,
  Monitor,
  Pickaxe,
} from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

import { ThreeCanvas, type SceneSetup } from "@/components/atoms/three-canvas";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTheme } from "@/hooks/use-theme";

import {
  buildServerScene,
  type BayIcon,
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
const LOGOS = ["docker", "cloudflare", "github"] as const;

/** Bay icons, white so the scene can tint them; keyed like `BayIcon`. */
const ICONS = {
  globe: Globe,
  code: Code,
  monitor: Monitor,
  cog: Cog,
  database: Database,
  key: KeyRound,
  container: Container,
  dashboard: LayoutDashboard,
  pickaxe: Pickaxe,
} as const;

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
  const icons = useRef<HTMLDivElement>(null);
  // Read every frame, so a step change doesn't rebuild the scene.
  const current = useRef(step);
  useEffect(() => {
    current.current = step;
  }, [step]);

  const setup = useCallback<SceneSetup>(
    (scene, camera) => {
      const markup = (el: HTMLDivElement | null) =>
        [...(el?.children ?? [])].map((svg) =>
          new XMLSerializer().serializeToString(svg),
        );
      const svgs = markup(logos.current);
      const lines = markup(icons.current);
      return buildServerScene(scene, camera, {
        colors: readColors(),
        logos: Object.fromEntries(
          LOGOS.map((name, i) => [name, svgs[i] ?? ""]),
        ) as SceneLogos,
        icons: Object.fromEntries(
          Object.keys(ICONS).map((name, i) => [name, lines[i] ?? ""]),
        ) as Record<BayIcon, string>,
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
      </div>
      <div ref={icons} hidden>
        {Object.values(ICONS).map((Icon, i) => (
          <Icon key={i} size={128} color="#fff" strokeWidth={1.75} />
        ))}
      </div>
      {/* A theme change remounts the canvas, so the scene is rebuilt in the new tokens. */}
      <ThreeCanvas key={theme} setup={setup} label={label} />
    </>
  );
}
