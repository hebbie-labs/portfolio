import { Reveal } from "@/components/atoms/reveal";
import { Headline } from "@/components/atoms/typography";
import { TitleLink } from "@/components/molecules/title-link";
import { CONTACT_CTA } from "@/constants/contact";

/** Closing block: question and a large link to the contact page. The parent provides the spacing. */
export function ContactCta() {
  return (
    <Reveal scroll className="flex flex-col items-start gap-7">
      <Headline as="h2">{CONTACT_CTA.text}</Headline>
      <TitleLink href={CONTACT_CTA.linkHref}>{CONTACT_CTA.linkLabel}</TitleLink>
    </Reveal>
  );
}
