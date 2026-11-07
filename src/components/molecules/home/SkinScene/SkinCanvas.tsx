"use client";

import { useRef } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSkinViewer } from "@/hooks/useSkinViewer";

/** Leon's Minecraft skin, filling its parent; idles and looks at the pointer inside `lookArea` (still on reduced motion). */
export function SkinCanvas({
  skin,
  label,
  lookArea,
}: {
  skin: string;
  label: string;
  /** Selector of the ancestor in which the head follows the pointer. */
  lookArea: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const still = useMediaQuery("(prefers-reduced-motion: reduce)");

  useSkinViewer(ref, skin, lookArea, !still);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label={label}
      className="pointer-events-none size-full"
    />
  );
}
