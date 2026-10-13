"use client";

import { useMemo } from "react";
import { Reveal } from "@/components/atoms/reveal";
import { IconCloud } from "@/components/ui/icon-cloud";
import { SKILLS } from "@/constants/skills";
import { useTheme } from "@/hooks/use-theme";

/**
 * Skills as a draggable 3D icon cloud (icons only, so it carries a single text alternative).
 * From `md` it floats right and the text after it wraps around the sphere; it must come before that text in the markup.
 * The canvas has a fixed 400px, so on mobile it is centered and the edges are cropped.
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
      className="my-6 flex justify-center overflow-hidden md:float-right md:my-0 md:ml-8 md:size-[400px] md:[shape-outside:circle(30%)]"
    >
      <div
        role="img"
        aria-label="Icon-Wolke mit den Technologien, mit denen ich arbeite"
      >
        <IconCloud icons={icons} showControl={false} />
      </div>
    </Reveal>
  );
}
