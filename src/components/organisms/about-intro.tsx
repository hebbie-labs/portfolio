import { Reveal } from "@/components/atoms/reveal";
import { Display, Lead } from "@/components/atoms/typography";
import { ABOUT_PAGE } from "@/constants/about";
import { hasPlaceholder } from "@/lib/utils";

/** Headline, then the intro sentence fading in word by word (CSS `reveal`, see globals.css). Hidden while it is a placeholder. */
export function AboutIntro() {
  return (
    <header className="space-y-6">
      <Reveal>
        <Display size="md">{ABOUT_PAGE.title}</Display>
      </Reveal>
      {!hasPlaceholder(ABOUT_PAGE.intro) && (
        <Lead className="max-w-2xl text-3xl md:text-4xl">
          {ABOUT_PAGE.intro.split(" ").map((word, i) => (
            <span
              key={i}
              data-reveal="blur"
              style={{ "--i": 1 + i * 0.25 } as React.CSSProperties}
              className="inline-block"
            >
              {word}
              {" "}
            </span>
          ))}
        </Lead>
      )}
    </header>
  );
}
