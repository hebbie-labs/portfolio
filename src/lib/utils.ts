import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** Custom font sizes from `globals.css` (`text-display`, `text-headline`, …). */
const CUSTOM_TEXT_SIZES = [
  "display",
  "display-hero",
  "display-lg",
  "display-md",
  "headline",
];

// twMerge must know them as font-size, otherwise it treats them as colors
// and drops them when a `text-<color>` class follows.
const twMerge = extendTailwindMerge({
  extend: { classGroups: { "font-size": [{ text: CUSTOM_TEXT_SIZES }] } },
});

/** Joins class names and resolves Tailwind conflicts (the last one wins). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
