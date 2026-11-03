"use client";

import { useMemo } from "react";
import { Reveal } from "@/components/atoms/Reveal";
import { IconCloud } from "@/components/ui/icon-cloud";
import { SKILLS, SKILLS_LABEL } from "@/constants/skills";
import { useTheme } from "@/hooks/useTheme";

/**
 * Skills as a draggable 3D icon cloud (icons only, so it carries a single text alternative).
 * A block of its own (`overflow-hidden` makes it a BFC): next to a float in the text, e.g. the about portrait, it sits
 * beside it while the 400px canvas fits, below it otherwise. On mobile it is centered and the edges are cropped.
 */
export function SkillCloud() {
  const theme = useTheme();
  const icons = useMemo(
    () =>
      SKILLS.map((skill, i) => {
        const Icon = "light" in skill ? skill[theme] : skill;
        return <Icon key={i} size={100} />;
      }),
    [theme],
  );

  return (
    <Reveal
      scroll
      className="my-6 flex justify-center overflow-hidden"
    >
      <div role="img" aria-label={SKILLS_LABEL}>
        <IconCloud icons={icons} showControl={false} />
      </div>
    </Reveal>
  );
}
