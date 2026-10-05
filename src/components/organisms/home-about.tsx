import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Portrait } from "@/components/atoms/portrait";
import { Reveal } from "@/components/atoms/reveal";
import { Headline, Lead } from "@/components/atoms/typography";
import { buttonVariants } from "@/components/ui/button";
import { ABOUT_PAGE } from "@/constants/about";
import { HOME_ABOUT } from "@/constants/home";

/** Portrait next to a short text and a link to the about page. */
export function HomeAbout() {
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
        <Link
          href={HOME_ABOUT.linkHref}
          className={buttonVariants({ variant: "outline", className: "px-5" })}
        >
          {HOME_ABOUT.linkLabel}
          <ArrowRight aria-hidden />
        </Link>
      </div>
    </Reveal>
  );
}
