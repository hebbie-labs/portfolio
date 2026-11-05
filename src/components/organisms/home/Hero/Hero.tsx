import Link from "next/link";

import { Button } from "@/components/atoms/Button";
import { MenuPunkt } from "@/components/atoms/MenuPunkt";
import { Reveal } from "@/components/atoms/Reveal";
import { TypedText } from "@/components/atoms/TypedText";
import { Display, Lead } from "@/components/atoms/Typography";
import { HOME_HERO } from "@/constants/home";

/**
 * First name across the full width, its full stop opens the menu (`MenuPunkt`); below it an empty slot overlapping the name, flanked by the lead with the
 * contact button (left) and the typed focus areas (right). Stacked on mobile: name, slot, text, focus.
 * `@container`, so the name and the overlap are sized by the content width (`cqw`).
 */
export function Hero() {
  return (
    <div className="@container relative flex flex-col gap-8 page-x pt-12 pb-12 md:gap-0 md:pb-16">
      <Reveal>
        <Display as="h1" size="hero" translate="no">
          {HOME_HERO.name}
          <MenuPunkt />
        </Display>
      </Reveal>
      <div className="flex flex-col gap-8 md:grid md:flex-1 md:grid-cols-[1fr_1.9fr_1fr] md:gap-6">
        {/*<Reveal
          variant="fade"
          index={2}
          className="relative z-10 flex aspect-[7/5] w-full items-center justify-center md:col-start-2 md:row-start-1 md:-mt-[10cqw] md:self-start"
        ></Reveal>*/}
        {/*For later middle item*/}
        <Reveal
          variant="up"
          index={1}
          className="flex flex-col gap-6 md:col-start-1 md:row-start-1 md:self-end"
        >
          <Lead className="max-w-md">{HOME_HERO.lead}</Lead>
          <Button
            variant="interactive"
            render={<Link href={HOME_HERO.contactHref} />}
            className="self-start"
          >
            {HOME_HERO.contactLabel}
          </Button>
        </Reveal>
        <Reveal
          variant="up"
          index={2}
          className="md:col-start-3 md:row-start-1 md:self-end md:justify-self-end"
        >
          <TypedText items={HOME_HERO.focus} />
        </Reveal>
      </div>
    </div>
  );
}
