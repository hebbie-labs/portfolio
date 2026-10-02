import { StatusDot } from "@/components/atoms/status-dot";
import { Reveal } from "@/components/atoms/reveal";
import { Body, Display, Lead } from "@/components/atoms/typography";
import { DividerLabel } from "@/components/molecules/divider-label";
import { EmailLink } from "@/components/molecules/email-link";
import { ContactForm } from "@/components/organisms/contact-form";
import { ContactLinks } from "@/components/organisms/contact-links";
import { PageTemplate } from "@/components/templates/page-template";
import { CONTACT_PAGE } from "@/constants/contact";

/** Order = priority: intro, the form (the main way), then the direct channels; on desktop the form spans both rows on the right. */
export function ContactPage() {
  return (
    <PageTemplate>
      <div className="grid gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-16 lg:gap-x-20">
        <Reveal className="flex min-w-0 flex-col gap-6">
          <Display size="md">{CONTACT_PAGE.title}</Display>
          <Lead className="text-muted">{CONTACT_PAGE.lead}</Lead>
          <Body className="flex items-center gap-3">
            <StatusDot className="size-2.5" />
            {CONTACT_PAGE.status}
          </Body>
        </Reveal>
        <Reveal index={1} className="min-w-0 md:col-start-2 md:row-span-2 md:row-start-1">
          <ContactForm />
        </Reveal>
        <Reveal index={2} className="flex min-w-0 flex-col items-start gap-6">
          <DividerLabel>{CONTACT_PAGE.direct}</DividerLabel>
          <EmailLink size="md" copyVariant="outline" />
          <ContactLinks />
        </Reveal>
      </div>
    </PageTemplate>
  );
}
