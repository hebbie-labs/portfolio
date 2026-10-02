import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Custom `text-display*` sizes must be known as font-size, otherwise twMerge
// treats them as colors and drops them when a `text-<color>` class follows.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "display-lg", "display-md", "headline"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Cuts `text` at the last word boundary within `max` characters and appends "…"; shorter text is unchanged. */
export function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}
