import { Reveal } from "@/components/atoms/Reveal";
import { Display } from "@/components/atoms/Typography";
import { ContactForm } from "@/components/organisms/contact/ContactForm";
import { ContactLinks } from "@/components/organisms/contact/ContactLinks";
import { PageTemplate } from "@/components/templates/PageTemplate";
import { CONTACT_PAGE } from "@/constants/contact";

/** Order = priority: title, the form (the main way), then the direct channels; the form is full width on mobile, centered at 2/3 from md. */
export function ContactPage() {
  return (
    <PageTemplate>
      <Reveal className="flex min-w-0 flex-col gap-5">
        <Display size="md">{CONTACT_PAGE.title}</Display>
      </Reveal>
      <Reveal index={1} className="mx-auto w-full md:w-2/3">
        <ContactForm />
      </Reveal>
      <ContactLinks />
    </PageTemplate>
  );
}
