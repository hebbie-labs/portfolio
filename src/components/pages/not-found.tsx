"use client";

import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/atoms/reveal";
import { Body, Display, Headline } from "@/components/atoms/typography";
import { buttonVariants } from "@/components/ui/button";
import { NOT_FOUND_PAGE } from "@/constants/not-found";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NotFoundPage() {
  const pathname = usePathname();

  return (
    <Reveal className="flex min-h-[calc(100dvh-7rem)] flex-col items-center justify-center gap-4 px-4 text-center">
      <Display as="p" size="xl" className="text-muted/30" aria-hidden>
        404
      </Display>
      <Headline as="h1" size="sm">
        {NOT_FOUND_PAGE.title}
      </Headline>
      <Body muted>
        <code className="rounded bg-bg-2 px-2 py-1 text-sm break-all">
          {pathname}
        </code>{" "}
        {NOT_FOUND_PAGE.missing}
      </Body>
      <Link href="/" className={buttonVariants({ variant: "default", className: "mt-4 h-13 px-6 text-base font-semibold" })}>
        <ArrowLeft aria-hidden />
        {NOT_FOUND_PAGE.backLabel}
      </Link>
    </Reveal>
  );
}
