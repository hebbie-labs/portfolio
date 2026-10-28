import { Reveal } from "@/components/atoms/reveal";
import { Headline } from "@/components/atoms/typography";
import { ArrowTitleLink } from "@/components/atoms/arrow-title-link";
import { CONTACT_CTA } from "@/constants/contact";

/** Closing block: question and a large link to the contact page. The parent provides the spacing. */
export function ContactTeaser() {
  return (
    <Reveal scroll className="flex flex-col items-start gap-7">
      <Headline as="h2">{CONTACT_CTA.text}</Headline>
      <ArrowTitleLink href={CONTACT_CTA.linkHref}>
        {CONTACT_CTA.linkLabel}
      </ArrowTitleLink>
    </Reveal>
  );
}
