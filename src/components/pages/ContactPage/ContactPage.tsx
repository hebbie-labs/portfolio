import { Reveal } from "@/components/atoms/Reveal";
import { Display } from "@/components/atoms/Typography";
import { CopyEmail } from "@/components/molecules/contact/CopyEmail";
import { ContactForm } from "@/components/organisms/contact/ContactForm";
import { ContactLinks } from "@/components/organisms/contact/ContactLinks";
import { PageTemplate } from "@/components/templates/PageTemplate";
import { CONTACT_PAGE } from "@/constants/contact";
import { EMAIL } from "@/constants/site";

/** Order = priority: title, the form (the main way), then the direct channels; on desktop the form spans both rows on the right. */
export function ContactPage() {
  return (
    <PageTemplate>
      <div className="grid gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-16 lg:gap-x-20">
        <Reveal className="flex min-w-0 flex-col gap-6">
          <Display size="md">{CONTACT_PAGE.title}</Display>
        </Reveal>
        <Reveal
          index={1}
          className="min-w-0 md:col-start-2 md:row-span-2 md:row-start-1"
        >
          <ContactForm />
        </Reveal>
        <Reveal index={2} className="flex min-w-0 flex-col items-start gap-6">
          <a
            href={`mailto:${EMAIL}`}
            className="min-w-0 text-2xl font-semibold wrap-anywhere transition-colors hover:text-accent lg:text-3xl"
          >
            {EMAIL}
          </a>
          <CopyEmail />
          <ContactLinks />
        </Reveal>
      </div>
    </PageTemplate>
  );
}
