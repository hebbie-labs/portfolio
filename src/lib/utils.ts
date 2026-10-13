import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

import type { RichPart } from "@/types/rich-text";

// Custom `text-display*` sizes must be known as font-size, otherwise twMerge
// treats them as colors and drops them when a `text-<color>` class follows.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["display", "display-lg", "display-md", "headline"] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** True if any text still holds a `[bracketed]` placeholder; such blocks stay hidden until they are filled in. */
export function hasPlaceholder(...texts: string[]) {
  return texts.some((text) => /\[[^\]]*\]/.test(text));
}

/** All strings of rich-text `parts` (text and hint or href), for `hasPlaceholder`. */
export const richStrings = (parts: readonly RichPart[]) =>
  parts.flatMap((part) =>
    typeof part === "string"
      ? part
      : [part.text, "hint" in part ? part.hint : part.href],
  );

/** Cuts `text` at the last word boundary within `max` characters and appends "…"; shorter text is unchanged. */
export function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}
