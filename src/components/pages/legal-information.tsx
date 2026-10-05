import { Reveal } from "@/components/atoms/reveal";
import { Body, Display, Headline } from "@/components/atoms/typography";
import { PageTemplate } from "@/components/templates/page-template";
import { LEGAL_PAGE } from "@/constants/legal";
import { EMAIL } from "@/constants/site";

export function LegalInformationPage() {
  const { owner, contactHeading, sections } = LEGAL_PAGE;
  return (
    <PageTemplate>
      <Reveal>
        <Display size="md">{LEGAL_PAGE.title}</Display>
      </Reveal>
      <div className="grid max-w-3xl gap-10">
        <Reveal index={1} className="grid gap-3">
          <Headline size="sm">{owner.heading}</Headline>
          <Body>
            {owner.lines.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </Body>
        </Reveal>
        <Reveal index={2} className="grid gap-3">
          <Headline size="sm">{contactHeading}</Headline>
          <Body>
            <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-accent">{EMAIL}</a>
          </Body>
        </Reveal>
        {sections.map(({ heading, text }, i) => (
          <Reveal key={heading} index={i + 3} className="grid gap-3">
            <Headline size="sm">{heading}</Headline>
            <Body muted>{text}</Body>
          </Reveal>
        ))}
      </div>
    </PageTemplate>
  );
}
