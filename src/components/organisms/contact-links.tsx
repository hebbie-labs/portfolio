import { ArrowUpRight } from "lucide-react";

import { Label } from "@/components/atoms/typography";
import { SOCIAL_PROFILES } from "@/constants/site";

const featured = SOCIAL_PROFILES.filter((profile) => profile.featured);
const others = SOCIAL_PROFILES.filter((profile) => !profile.featured);

/** Main profiles as ruled rows, the rest as small links beneath. */
export function ContactLinks() {
  return (
    <div className="flex w-full flex-col gap-5">
      <ul className="divide-y divide-line border-y border-line">
        {featured.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between py-3 font-display text-xl font-semibold transition-colors hover:text-accent"
            >
              {label}
              <ArrowUpRight
                aria-hidden
                className="size-5 transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </li>
        ))}
      </ul>
      <Label className="flex flex-wrap gap-x-6 gap-y-1">
        {others.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="relative lnk after:absolute after:-inset-x-1 after:-inset-y-2 after:content-['']"
          >
            {label}
          </a>
        ))}
      </Label>
    </div>
  );
}
