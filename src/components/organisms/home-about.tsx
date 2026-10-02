import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/atoms/reveal";
import { Headline, Lead } from "@/components/atoms/typography";
import { buttonVariants } from "@/components/ui/button";
import { HOME_ABOUT } from "@/constants/home";

/** Short text and a link to the about page. */
export function HomeAbout() {
  return (
    <Reveal scroll className="flex flex-col items-start gap-6 page-x py-16 md:py-24">
      <Headline>{HOME_ABOUT.title}</Headline>
      <Lead className="max-w-3xl text-muted">{HOME_ABOUT.text}</Lead>
      <Link href={HOME_ABOUT.linkHref} className={buttonVariants({ variant: "outline", className: "px-5" })}>
        {HOME_ABOUT.linkLabel}
        <ArrowRight aria-hidden />
      </Link>
    </Reveal>
  );
}
