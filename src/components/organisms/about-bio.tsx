"use client";

import { Reveal } from "@/components/atoms/reveal";
import { Body } from "@/components/atoms/typography";
import { Highlighter } from "@/components/ui/highlighter";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ABOUT_BIO } from "@/constants/about";

/** Accent at 33%; the SVG stroke resolves the variable itself, so it follows the theme without JS. */
const MARKER = "color-mix(in srgb, var(--accent) 33%, transparent)";

/** Short CV as one paragraph with accent-marked words; the hint shows in a tooltip on hover or keyboard focus. */
export function AboutBio({ className }: { className?: string }) {
  return (
    <Reveal scroll className={className}>
      <TooltipProvider>
        <Body>
          {ABOUT_BIO.map((part, i) =>
            typeof part === "string" ? (
              part
            ) : (
              <Tooltip key={i}>
                <TooltipTrigger type="button" className="relative cursor-help">
                  <Highlighter action="highlight" color={MARKER} iterations={1} padding={3}>
                    {part.text}
                  </Highlighter>
                </TooltipTrigger>
                <TooltipContent>{part.hint}</TooltipContent>
              </Tooltip>
            ),
          )}
        </Body>
      </TooltipProvider>
    </Reveal>
  );
}
