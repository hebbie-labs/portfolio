import { Label } from "@/components/atoms/typography";
import Link from "next/link";
import { NAV_LINKS, OUTSIDE_NAV_LINKS } from "@/constants/nav";
import { SITE_NAME } from "@/constants/site";

export function Footer() {
  return (
    <footer className="flex w-full flex-col gap-2.5 border-t border-line page-x py-4 font-mono text-xs text-muted md:grid md:grid-cols-3 md:items-center md:py-10 md:text-[13px]">
      <Label>© 2026 {SITE_NAME}</Label>
      <Link
        href={NAV_LINKS[3].href}
        className="w-fit lnk md:justify-self-center"
      >
        {NAV_LINKS[3].label}
      </Link>
      <div className="flex gap-6 md:justify-self-end">
        {OUTSIDE_NAV_LINKS.map(({ href, label }) => (
          <Link key={href} href={href} className="lnk">
            {label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
