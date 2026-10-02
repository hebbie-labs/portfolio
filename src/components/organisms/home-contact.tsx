import { Reveal } from "@/components/atoms/reveal";
import { Lead } from "@/components/atoms/typography";
import { EmailLink } from "@/components/molecules/email-link";
import { HOME_CONTACT } from "@/constants/home";

/** Closing block: question, the address as a huge mail link, copy button. */
export function HomeContact() {
  return (
    <Reveal scroll className="flex flex-col items-start gap-7 page-x py-16 md:py-32">
      <Lead as="h2" className="text-muted">{HOME_CONTACT.text}</Lead>
      <EmailLink size="lg" />
    </Reveal>
  );
}
