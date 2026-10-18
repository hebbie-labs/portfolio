import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/atoms/reveal";
import Link from "next/link";
import { Button } from "@/components/atoms/button";
import { CircularText } from "@/components/atoms/circular-text";
import { Display, Lead } from "@/components/atoms/typography";
import { HeroDotGrid } from "@/components/molecules/home/hero-dot-grid";
import { HOME_HERO } from "@/constants/home";

export function Hero() {
  return (
    <div className="relative isolate flex min-h-[calc(100dvh-9rem)] flex-col justify-end gap-7 page-x pt-nav pb-12 md:min-h-[calc(100dvh-6rem)] md:gap-7 md:pb-20">
      <HeroDotGrid className="absolute inset-0 -z-10" />
      <Reveal>
        <Display as="h1" size="hero" translate="no">
          {`${HOME_HERO.title}.`}
        </Display>
      </Reveal>
      <Reveal
        variant="up"
        index={1}
        className="flex items-end justify-between gap-6"
      >
        <div className="flex flex-col gap-6 md:gap-8">
          <Lead className="max-w-xl">{HOME_HERO.lead}</Lead>
          <Button
            variant="default"
            render={<Link href={HOME_HERO.contactHref} />}
            nativeButton={false}
            role="link"
            className="self-start px-5"
          >
            {HOME_HERO.contactLabel}
            <ArrowRight aria-hidden />
          </Button>
        </div>
        <CircularText className="max-lg:hidden">
          {HOME_HERO.circleText}
        </CircularText>
      </Reveal>
    </div>
  );
}
