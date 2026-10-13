"use client";

import Link from "next/link";

import { Highlighter } from "@/components/ui/highlighter";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { RichPart } from "@/types/rich-text";

/** Accent at 33%; the SVG stroke resolves the variable itself, so it follows the theme without JS. */
const MARKER = "color-mix(in srgb, var(--accent) 33%, transparent)";

/**
 * Inline text. A string is plain text; `{ text, hint }` is an accent-marked word whose hint opens on hover, tap
 * or Enter (touch has no hover); `{ text, href }` is a hyperlink underlined by the Highlighter (client-side `Link` if it starts with `/` or `#`, else a new tab).
 */
export function RichText({ parts }: { parts: readonly RichPart[] }) {
  return parts.map((part, i) => {
    if (typeof part === "string") return part;
    if ("href" in part) {
      const text = (
        <Highlighter
          action="underline"
          color="var(--accent)"
          iterations={1}
          padding={1}
        >
          {part.text}
        </Highlighter>
      );
      return /^\/(?!\/)|^#/.test(part.href) ? (
        <Link key={i} href={part.href} className="relative">
          {text}
        </Link>
      ) : (
        <a
          key={i}
          href={part.href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative"
        >
          {text}
        </a>
      );
    }
    return (
      <Popover key={i}>
        <PopoverTrigger
          openOnHover
          delay={0}
          type="button"
          className="relative cursor-help"
        >
          <Highlighter
            action="highlight"
            color={MARKER}
            iterations={1}
            padding={3}
          >
            {part.text}
          </Highlighter>
        </PopoverTrigger>
        <PopoverContent>{part.hint}</PopoverContent>
      </Popover>
    );
  });
}
