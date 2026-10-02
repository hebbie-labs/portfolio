import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/atoms/reveal";
import { Headline } from "@/components/atoms/typography";
import { buttonVariants } from "@/components/ui/button";
import { HOME_CONTACT } from "@/constants/home";

/** Closing block: question and a link to the contact page. */
export function HomeContact() {
  return (
    <Reveal scroll className="flex flex-col items-start gap-7 page-x py-16 md:py-32">
      <Headline as="h2">{HOME_CONTACT.text}</Headline>
      <Link href={HOME_CONTACT.linkHref} className={buttonVariants({ className: "h-13 px-6 text-base font-semibold" })}>
        {HOME_CONTACT.linkLabel}
        <ArrowRight aria-hidden />
      </Link>
    </Reveal>
  );
}
