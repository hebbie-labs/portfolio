import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/atoms/reveal";
import { Headline } from "@/components/atoms/typography";
import { buttonVariants } from "@/components/ui/button";
import { CONTACT_CTA } from "@/constants/contact";

/** Closing block: question and a link to the contact page. The parent provides the spacing. */
export function ContactCta() {
  return (
    <Reveal scroll className="flex flex-col items-start gap-7">
      <Headline as="h2">{CONTACT_CTA.text}</Headline>
      <Link href={CONTACT_CTA.linkHref} className={buttonVariants({ className: "h-13 px-6 text-base font-semibold" })}>
        {CONTACT_CTA.linkLabel}
        <ArrowRight aria-hidden />
      </Link>
    </Reveal>
  );
}
