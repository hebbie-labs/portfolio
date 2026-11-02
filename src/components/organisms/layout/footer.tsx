import Link from "next/link";

import { GitHubIcon, LinkedInIcon } from "@/components/atoms/brand-icons";
import { Logo } from "@/components/atoms/logo";
import { CONTACT_LINK, OUTSIDE_NAV_LINKS } from "@/constants/nav";
import {
  EMAIL,
  EMPLOYER,
  EMPLOYER_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  ROLE,
  SITE_NAME,
} from "@/constants/site";

const SOCIALS = [
  { label: "GitHub", href: GITHUB_URL, Icon: GitHubIcon },
  { label: "LinkedIn", href: LINKEDIN_URL, Icon: LinkedInIcon },
];

// Accent links with an accent underline (`lnk` sets the hover).
const LINK = "lnk border-accent-text/40 text-accent-text";

/** Contact | logo | profiles, then copyright and legal links; stacked logo-first on mobile. */
export function Footer() {
  return (
    <footer className="w-full border-t border-line text-sm">
      <div className="flex flex-col items-center gap-8 page-x py-16 md:grid md:grid-cols-3 md:justify-items-center md:py-24">
        <div className="order-2 flex flex-col items-center md:order-none">
          <a href={`mailto:${EMAIL}`} className={LINK}>
            {EMAIL}
          </a>
          <Link href={CONTACT_LINK.href} className={LINK}>
            {CONTACT_LINK.label}
          </Link>
        </div>
        <Logo className="order-1 size-auto *:h-12 md:order-none" />
        <div className="order-3 flex gap-5 md:order-none">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-accent-text transition-colors hover:text-fg"
            >
              <Icon className="size-5" />
            </a>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 border-t border-line page-x py-8 text-center text-xs text-muted md:text-[13px]">
        <p>
          © {new Date().getFullYear()} {SITE_NAME}. {ROLE} bei{" "}
          <a
            href={EMPLOYER_URL}
            target="_blank"
            rel="noreferrer"
            className={LINK}
          >
            {EMPLOYER}
          </a>
        </p>
        <div className="flex gap-4">
          {OUTSIDE_NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className={LINK}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
