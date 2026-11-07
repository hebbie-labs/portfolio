import { Reveal } from "@/components/atoms/Reveal";
import { Sticker } from "@/components/atoms/Sticker";
import { Headline, Lead } from "@/components/atoms/Typography";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { ABOUT_PAGE } from "@/constants/about";
import { HOME_ABOUT } from "@/constants/home";

/** The cut-out portrait (as on the about page) next to a short text and a link to the about page. */
export function AboutTeaser() {
  return (
    <Reveal
      scroll
      className="grid items-center gap-8 page-x py-16 md:grid-cols-[16rem_1fr] md:gap-16 md:py-24"
    >
      <Sticker
        src={ABOUT_PAGE.sticker}
        alt={ABOUT_PAGE.portraitAlt}
        sizes="(min-width: 768px) 16rem, 12rem"
        className="w-48 md:w-full"
      />
      <div className="flex flex-col items-start gap-6">
        <Headline>{HOME_ABOUT.title}</Headline>
        <Lead className="max-w-3xl text-muted">{HOME_ABOUT.text}</Lead>
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
