import { Reveal } from "@/components/atoms/reveal";
import { Display, Label, Lead } from "@/components/atoms/typography";
import { LocalTime } from "@/components/atoms/local-time";
import { StatusDot } from "@/components/atoms/status-dot";
import { HOME_HERO } from "@/constants/home";

export function Hero() {
  return (
    <div className="flex flex-col gap-7 page-x pt-nav pb-12 min-h-[calc(100dvh-4rem)] justify-between md:gap-3.5 md:pb-14 md:min-h-[calc(100dvh-6rem)]">
      <Reveal variant="fade" className="flex items-center gap-2">
        <StatusDot className="size-1.5 animate-pulse shadow-[0_0_8px] shadow-accent" />
        <Label>
          {HOME_HERO.location} –{" "}
          <span className="tabular-nums">
            <LocalTime />
          </span>
        </Label>
      </Reveal>
      <Reveal variant="blur" index={1}>
        <Display
          as="h1"
          size="xl"
          translate="no"
          className="max-md:w-min max-md:text-[26vw] text-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
        >
          {`${HOME_HERO.title}.`}
        </Display>
      </Reveal>
      <Reveal variant="up" index={2}>
        <Lead className="max-w-xl">{HOME_HERO.lead}</Lead>
      </Reveal>
    </div>
  );
}
