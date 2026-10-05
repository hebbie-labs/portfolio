import { Label } from "@/components/atoms/typography";
import Link from "next/link";
import { NAV_LINKS, OUTSIDE_NAV_LINKS } from "@/constants/nav";
import { LOCATION, SITE_NAME, SOCIAL_PROFILES } from "@/constants/site";

export function Footer() {
  return (
    <footer className="flex w-full flex-col gap-2.5 border-t border-line page-x py-4 font-mono text-xs text-muted md:grid md:grid-cols-3 md:items-center md:py-10 md:text-[13px]">
      <Label>
        © {new Date().getFullYear()} {SITE_NAME}, {LOCATION}
      </Label>
      <div className="flex gap-6 md:justify-self-center">
        <Link href={NAV_LINKS[3].href} className="lnk">
          {NAV_LINKS[3].label}
        </Link>
        {SOCIAL_PROFILES.slice(0, 2).map(({ label, href }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="lnk"
          >
            {label}
          </a>
        ))}
      </div>
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
