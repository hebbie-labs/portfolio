import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/atoms/reveal";
import { ABOUT_LINKS } from "@/constants/about";

const row =
  "group flex items-center justify-between py-4 font-display text-2xl font-semibold transition-colors hover:text-accent md:text-3xl";
const arrow = "size-6 transition-transform duration-300 ease-spring";

/** One ruled row per profile; contact is the last, accented row. */
export function AboutLinks() {
  return (
    <Reveal scroll>
      <ul className="divide-y divide-line border-y border-line">
        {ABOUT_LINKS.map(({ label, href }) => (
          <li key={label}>
            <a href={href} target="_blank" rel="noreferrer" className={row}>
              {label}
              <ArrowUpRight aria-hidden className={`${arrow} group-hover:translate-x-1 group-hover:-translate-y-1`} />
            </a>
          </li>
        ))}
        <li>
          <Link href="/kontakt" className={`${row} text-accent`}>
            Kontakt
            <ArrowRight aria-hidden className={`${arrow} group-hover:translate-x-1`} />
          </Link>
        </li>
      </ul>
    </Reveal>
  );
}
