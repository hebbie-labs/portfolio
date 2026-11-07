import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** Custom font sizes from `globals.css` (`text-display`, `text-headline`, …). */
const CUSTOM_TEXT_SIZES = ["display", "display-lg", "display-md", "headline"];

// twMerge must know them as font-size, otherwise it treats them as colors
// and drops them when a `text-<color>` class follows. Custom radii likewise,
// so `rounded-control` replaces the `ui/` defaults instead of sitting next to them.
const twMerge = extendTailwindMerge({
  extend: {
    theme: { radius: ["control", "panel"] },
    classGroups: { "font-size": [{ text: CUSTOM_TEXT_SIZES }] },
  },
});

/** Joins class names and resolves Tailwind conflicts (the last one wins). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
