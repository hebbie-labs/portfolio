"use client";

import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/atoms/reveal";
import { Body, Display, Headline } from "@/components/atoms/typography";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NotFoundPage() {
  const pathname = usePathname();

  return (
    <Reveal className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
      <Display size="xl" className="text-muted/30">
        404
      </Display>
      <Headline as="h1" size="sm">
        Seite nicht gefunden
      </Headline>
      <Body muted>
        <code className="rounded bg-bg-2 px-2 py-1 text-sm break-all">
          {pathname}
        </code>{" "}
        existiert nicht.
      </Body>
      <Link href="/" className="group flex flex-row items-center lnk">
        <ArrowLeft className="size-0 -translate-x-2 opacity-0 transition-all duration-400 group-hover:mr-1 group-hover:size-4.5 group-hover:translate-x-0 group-hover:opacity-100" />
        Zurück zur Startseite
      </Link>
    </Reveal>
  );
}
