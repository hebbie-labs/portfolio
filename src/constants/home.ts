// Content of the start page below the projects. Texts in [brackets] are placeholders.
import { ABOUT_PAGE, type TimelineItem } from "@/constants/about";
import { truncate } from "@/lib/utils";

const ABOUT_TEASER_MAX_LENGTH = 100;

export const HOME_HERO = {
  location: "Bern, CH",
  title: "Leon Hebeisen",
  lead: "Frontend zuerst: Web-Apps, die sich gut anfühlen, mit Spring Boot im Rücken.",
} as const;

/** About teaser: short text and a link to the about page. */
export const HOME_ABOUT = {
  title: ABOUT_PAGE.title,
  text: truncate(ABOUT_PAGE.intro, ABOUT_TEASER_MAX_LENGTH),
  linkLabel: "Mehr über mich",
  linkHref: "/about",
} as const;

/** Short timeline; the detailed one is `ABOUT_TIMELINE`. */
export const HOME_TIMELINE = {
  title: "Werdegang",
  items: [
    {
      period: "[Jahre]",
      title: "Sekundarschule",
      text: "[Ein Satz: Was ist hängen geblieben?]",
    },
    {
      period: "2025",
      title: "Noser Young",
      text: "Start der Lehre als Applikationsentwickler EFZ.",
    },
    {
      period: "Heute",
      title: "2. Lehrjahr",
      text: "Ich baue Recur, eine PWA mit Spring-Boot-API und Next.js-Frontend.",
    },
  ],
} as const satisfies { title: string; items: readonly TimelineItem[] };

/** Contact block above the footer; the address is `EMAIL` in `site.ts`. */
export const HOME_CONTACT = {
  text: "Fragen, Feedback oder ein gemeinsames Projekt?",
} as const;
