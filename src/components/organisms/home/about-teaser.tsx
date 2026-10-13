import { Portrait } from "@/components/atoms/portrait";
import { Reveal } from "@/components/atoms/reveal";
import { Headline, Lead } from "@/components/atoms/typography";
import Link from "next/link";
import { Button } from "@/components/atoms/button";
import { ABOUT_PAGE } from "@/constants/about";
import { HOME_ABOUT } from "@/constants/home";

/** Portrait next to a short text and a link to the about page. */
export function AboutTeaser() {
  return (
    <Reveal
      scroll
      className="grid items-center gap-8 page-x py-16 md:grid-cols-[16rem_1fr] md:gap-16 md:py-24"
    >
      <Portrait
        src={ABOUT_PAGE.portrait}
        alt={ABOUT_PAGE.portraitAlt}
        className="max-w-48 md:max-w-none"
      />
      <div className="flex flex-col items-start gap-6">
        <Headline>{HOME_ABOUT.title}</Headline>
        {HOME_ABOUT.text && (
          <Lead className="max-w-3xl text-muted">{HOME_ABOUT.text}</Lead>
        )}
        <Button
          variant="interactive"
          render={<Link href={HOME_ABOUT.linkHref} />}
        >
          {HOME_ABOUT.linkLabel}
        </Button>
      </div>
    </Reveal>
  );
}
