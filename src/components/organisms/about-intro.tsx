import { Reveal } from "@/components/atoms/reveal";
import { Headline, Lead } from "@/components/atoms/typography";
import { ABOUT_PAGE } from "@/constants/about";

/** Headline, then the intro sentence fading in word by word (CSS `reveal`, see globals.css). */
export function AboutIntro() {
  return (
    <header className="flex flex-col gap-6">
      <Reveal variant="blur">
        <Headline as="h1">{ABOUT_PAGE.title}</Headline>
      </Reveal>
      <Lead className="max-w-2xl text-3xl md:text-4xl">
        {ABOUT_PAGE.intro.split(" ").map((word, i) => (
          <span key={i} data-reveal="blur" style={{ "--i": 1 + i * 0.25 } as React.CSSProperties} className="inline-block">
            {word}
            {" "}
          </span>
        ))}
      </Lead>
    </header>
  );
}
