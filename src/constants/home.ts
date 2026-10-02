// Content of the start page below the projects. Texts in [brackets] are placeholders.
import { ABOUT_PAGE } from "@/constants/about";
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
