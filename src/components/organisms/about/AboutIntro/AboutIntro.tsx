"use client";

import { Fragment, useRef, type CSSProperties } from "react";

import { Reveal } from "@/components/atoms/Reveal";
import { RichText } from "@/components/atoms/RichText";
import { Sticker } from "@/components/atoms/Sticker";
import { Body, Display, Lead } from "@/components/atoms/Typography";
import { AboutBio } from "@/components/molecules/about/AboutBio";
import { SkillCloud } from "@/components/molecules/about/SkillCloud";
import { ABOUT_PAGE, ABOUT_STORY } from "@/constants/about";
import { useStickyOffset } from "@/hooks/useStickyOffset";
import { cn } from "@/lib/utils";

/** From the left page edge out of the centered column, `--w` wide (html's padding-right holds the scroll ruler). */
const BLEED = "ml-[calc(50%_-_50vw_+_var(--ruler-w)_/_2)] w-(--w)";

/**
 * Headline, intro (fading in word by word, CSS `reveal` in globals.css), story with the skill cloud and bio, next to
 * the cut-out portrait lying on its side. From `md` the portrait sticks below the nav until the text ends, and the
 * text wraps around its silhouette while scrolling past: an invisible float with its outline (`shape-outside`)
 * follows it, pushed down by a spacer as high as `--sticky-offset`. On mobile the portrait sits above, full width.
 */
export function AboutIntro() {
  const root = useRef<HTMLDivElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  useStickyOffset(root, sticky);
  const { sticker, stickerShape } = ABOUT_PAGE;
  const { before, after } = ABOUT_STORY;

  // Outer div: may contain the floats (e.g. as a flex item). Inner div: the sticky's container, which must not
  // grow with the portrait's float, or the offset would push it down without end.
  return (
    <div>
      <div
        ref={root}
        className="[--w:calc(50%_+_50vw_-_var(--ruler-w)_/_2)] md:[--w:calc(5%_+_50vw_-_var(--ruler-w)_/_2)]"
        style={{ "--ratio": sticker.height / sticker.width } as CSSProperties}
      >
        <div
          ref={sticky}
          className={cn(
            BLEED,
            "relative z-10 mb-10 md:sticky md:top-24 md:mb-0",
          )}
        >
          <Reveal variant="scale">
            <Sticker
              src={sticker}
              alt={ABOUT_PAGE.portraitAlt}
              sizes="(min-width: 768px) 55vw, 100vw"
              preload
              className="w-full"
            />
          </Reveal>
        </div>
        {/* From `md` pulled up by the portrait's height, so the text flows around the float below instead of
            starting under the portrait (a negative margin on the sticky itself would let it stick past the text). */}
        <header className="md:mt-[calc(var(--w)_*_-1_*_var(--ratio))]">
          <div
            aria-hidden
            className="hidden h-(--sticky-offset,0px) w-0 md:float-left md:block"
          />
          <div
            aria-hidden
            className={cn(
              BLEED,
              "hidden md:float-left md:clear-left md:block md:[shape-margin:2rem]",
            )}
            style={{
              aspectRatio: `${sticker.width} / ${sticker.height}`,
              shapeOutside: stickerShape,
            }}
          />
          <Reveal>
            <Display size="md">{ABOUT_PAGE.title}</Display>
          </Reveal>
          <Lead className="mt-6 text-3xl md:text-4xl">
            {ABOUT_PAGE.intro.split(" ").map((word, i) => (
              <Fragment key={i}>
                {i > 0 && " "}
                <span
                  data-reveal="blur"
                  style={{ "--i": 1 + i * 0.25 } as CSSProperties}
                  className="inline-block"
                >
                  {word}
                </span>
              </Fragment>
            ))}
          </Lead>
        </header>
        {/* Plain blocks from `md`, so the portrait's float wraps them too; the skill cloud sits between the paragraphs. */}
        <div className="mt-8 flex flex-col gap-6 md:block">
          <Reveal scroll>
            <Body>
              <RichText parts={before} />
            </Body>
            <SkillCloud />
            <Body className="md:mt-6">
              <RichText parts={after} />
            </Body>
          </Reveal>
          <AboutBio className="md:mt-6" />
        </div>
      </div>
    </div>
  );
}
