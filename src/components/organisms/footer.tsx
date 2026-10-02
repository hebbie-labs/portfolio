import { Label } from "@/components/atoms/typography";
import Link from "next/link";
import { NAV_LINKS, OUTSIDE_NAV_LINKS } from "@/constants/nav";
import { SITE_NAME } from "@/constants/site";

export function Footer() {
  return (
    <footer className="flex w-full flex-col gap-2.5 border-t border-line py-4 page-x font-mono text-xs text-muted md:grid md:grid-cols-3 md:items-center md:py-10 md:text-[13px]">
      <Label>© 2026 {SITE_NAME}</Label>
      <Link href={NAV_LINKS[3].href} className="lnk w-fit md:justify-self-center">
        {NAV_LINKS[3].label}
      </Link>
      <Link href={OUTSIDE_NAV_LINKS[0].href} className="lnk w-fit md:justify-self-end">
        {OUTSIDE_NAV_LINKS[0].label}
      </Link>
    </footer>
  );
}
