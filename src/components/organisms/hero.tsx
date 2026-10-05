import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/atoms/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Display, Lead } from "@/components/atoms/typography";
import { HOME_HERO } from "@/constants/home";

export function Hero() {
  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col justify-end gap-7 page-x pt-nav pb-12 md:min-h-[calc(100dvh-6rem)] md:gap-3.5 md:pb-14">
      <Reveal>
        <Display
          as="h1"
          size="xl"
          translate="no"
          className="max-md:w-min max-md:text-[26vw]"
        >
          {`${HOME_HERO.title}.`}
        </Display>
      </Reveal>
      <Reveal variant="up" index={1} className="flex flex-col gap-6">
        <Lead className="max-w-xl">{HOME_HERO.lead}</Lead>
        <Link
          href={HOME_HERO.contactHref}
          className={buttonVariants({
            variant: "default",
            className: "self-start px-5",
          })}
        >
          {HOME_HERO.contactLabel}
          <ArrowRight aria-hidden />
        </Link>
      </Reveal>
    </div>
  );
}
