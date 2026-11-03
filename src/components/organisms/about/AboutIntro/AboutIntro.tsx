import { Fragment } from "react";

import { Reveal } from "@/components/atoms/Reveal";
import { Sticker } from "@/components/atoms/Sticker";
import { Display, Lead } from "@/components/atoms/Typography";
import { ABOUT_PAGE } from "@/constants/about";

/**
 * The cut-out portrait, from `md` large and floating left: the headline, the intro and the story after it (same
 * block flow, see `AboutPage`) wrap around its silhouette (`shape-outside`). From 82rem, where only the bio's
 * last line would end up under it, `mb-8` lets the shape's tail keep that line beside it (below, the margin box
 * clips the tail). Then the headline and the intro sentence fading in word by word (CSS `reveal`, see globals.css).
 */
export function AboutIntro() {
  return (
    <header>
      <Reveal
        variant="scale"
        className="mx-auto mb-10 w-45 md:float-left md:mb-0 md:w-[28.8%] md:[shape-margin:1.5rem] min-[82rem]:mb-8"
        style={{ shapeOutside: ABOUT_PAGE.stickerShape }}
      >
        <Sticker
          src={ABOUT_PAGE.sticker}
          alt={ABOUT_PAGE.portraitAlt}
          sizes="(min-width: 1280px) 21rem, (min-width: 768px) 29vw, 11.25rem"
          preload
          className="w-full"
        />
      </Reveal>
      <Reveal>
        <Display size="md">{ABOUT_PAGE.title}</Display>
      </Reveal>
      <Lead className="mt-6 text-3xl md:text-4xl">
        {ABOUT_PAGE.intro.split(" ").map((word, i) => (
          <Fragment key={i}>
            {i > 0 && " "}
            <span
              data-reveal="blur"
              style={{ "--i": 1 + i * 0.25 } as React.CSSProperties}
              className="inline-block"
            >
              {word}
            </span>
          </Fragment>
        ))}
      </Lead>
    </header>
  );
}
