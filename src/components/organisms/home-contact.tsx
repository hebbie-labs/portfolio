import { Reveal } from "@/components/atoms/reveal";
import { Lead } from "@/components/atoms/typography";
import { CopyEmail } from "@/components/molecules/copy-email";
import { HOME_CONTACT } from "@/constants/home";
import { EMAIL } from "@/constants/site";

/** Closing block: question, the address as a huge mail link, copy button. */
export function HomeContact() {
  return (
    <Reveal scroll className="flex flex-col items-start gap-7 page-x py-16 md:py-32">
      <Lead className="text-muted">{HOME_CONTACT.text}</Lead>
      <a
        href={`mailto:${EMAIL}`}
        className="min-w-0 font-display text-display-md font-bold font-condensed wrap-anywhere transition-colors hover:text-accent"
      >
        {EMAIL}
      </a>
      <CopyEmail />
    </Reveal>
  );
}
