"use client";

import { Reveal } from "@/components/atoms/reveal";
import { Body } from "@/components/atoms/typography";
import { Highlighter } from "@/components/ui/highlighter";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ABOUT_BIO } from "@/constants/about";

/** Accent at 33%; the SVG stroke resolves the variable itself, so it follows the theme without JS. */
const MARKER = "color-mix(in srgb, var(--accent) 33%, transparent)";

/** Short CV as one paragraph with accent-marked words; the hint opens on hover, and on tap or Enter (touch has no hover). */
export function AboutBio({ className }: { className?: string }) {
  return (
    <Reveal scroll className={className}>
      <Body>
        {ABOUT_BIO.map((part, i) =>
          typeof part === "string" ? (
            part
          ) : (
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
          ),
        )}
      </Body>
    </Reveal>
  );
}
