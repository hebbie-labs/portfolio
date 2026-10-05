import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/atoms/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Display, Label, Lead } from "@/components/atoms/typography";
import { LocalTime } from "@/components/atoms/local-time";
import { StatusDot } from "@/components/atoms/status-dot";
import { HOME_HERO } from "@/constants/home";

export function Hero() {
  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col justify-between gap-7 page-x pt-nav pb-12 md:min-h-[calc(100dvh-6rem)] md:gap-3.5 md:pb-14">
      <Reveal variant="fade" className="flex items-center gap-2">
        <StatusDot className="size-1.5 animate-pulse shadow-[0_0_8px] shadow-accent" />
        <Label>
          {HOME_HERO.location} –{" "}
          <span className="tabular-nums">
            <LocalTime />
          </span>
        </Label>
      </Reveal>
      <Reveal index={1}>
        <Display
          as="h1"
          size="xl"
          translate="no"
          className="max-md:w-min max-md:text-[26vw]"
        >
          {`${HOME_HERO.title}.`}
        </Display>
      </Reveal>
      <Reveal variant="up" index={2} className="flex flex-col gap-6">
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
