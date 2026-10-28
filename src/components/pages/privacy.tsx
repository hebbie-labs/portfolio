import { Reveal } from "@/components/atoms/reveal";
import { Body, Display, Headline } from "@/components/atoms/typography";
import { PageTemplate } from "@/components/templates/page-template";
import { PRIVACY_PAGE } from "@/constants/privacy";

export function PrivacyPage() {
  const { title, intro, sections } = PRIVACY_PAGE;
  return (
    <PageTemplate>
      <Reveal>
        <Display size="md">{title}</Display>
      </Reveal>
      <div className="grid max-w-3xl gap-10">
        <Reveal index={1}>
          <Body>{intro}</Body>
        </Reveal>
        {sections.map(({ heading, text }, i) => (
          <Reveal key={heading} index={i + 2} className="grid gap-3">
            <Headline size="sm">{heading}</Headline>
            <Body muted>{text}</Body>
          </Reveal>
        ))}
      </div>
    </PageTemplate>
  );
}
