"use client";

import { useMemo } from "react";
import {
  Docker,
  Git,
  GitHubDark,
  GitHubLight,
  Java,
  NextJs,
  React,
  Spring,
  TailwindCSS,
  TypeScript,
} from "developer-icons";

import { Reveal } from "@/components/atoms/reveal";
import { IconCloud } from "@/components/ui/icon-cloud";
import { ABOUT_SKILLS } from "@/constants/about";
import { useTheme } from "@/hooks/use-theme";

/** Skills as a draggable 3D icon cloud; the names stay in the DOM for screen readers. */
export function SkillCloud() {
  const theme = useTheme();
  const GitHub = theme === "light" ? GitHubDark : GitHubLight;
  // The cloud rasterizes icons at 100px (scaled to 40px); a new array makes it redraw on theme change.
  const icons = useMemo(
    () =>
      [Java, Spring, React, TypeScript, NextJs, TailwindCSS, Docker, GitHub, Git].map((Icon, i) => (
        <Icon key={i} size={100} />
      )),
    [GitHub],
  );

  return (
    <Reveal scroll className="-ml-24">
      <div aria-hidden>
        <IconCloud icons={icons} showControl={false} />
      </div>
      <ul className="sr-only">
        {ABOUT_SKILLS.items.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </Reveal>
  );
}
