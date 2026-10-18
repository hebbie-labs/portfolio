"use client";

import dynamic from "next/dynamic";

import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

// WebGL, client only; loaded on the start page alone.
const DotGrid = dynamic(() => import("@/components/ui/dot-grid"), {
  ssr: false,
});

// Empty on the server; the grid itself only renders on the client anyway.
const token = (name: string) =>
  typeof document === "undefined"
    ? ""
    : getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/**
 * Decorative React Bits dot grid behind the hero: dots in `--line` that light up in `--accent` near the cursor.
 * `useTheme` re-renders on a theme switch, so the tokens are read again.
 */
export function HeroDotGrid({ className }: { className?: string }) {
  useTheme();

  return (
    <div aria-hidden className={cn("pointer-events-none", className)}>
      <DotGrid
        baseColor={token("--line")}
        activeColor={token("--accent")}
        dotSize={3}
        gap={24}
        fade={0.6}
        clickShock={false}
      />
    </div>
  );
}
