// Content of the start page below the projects. Texts in [brackets] are placeholders.
import { ABOUT_PAGE } from "@/constants/about";
import { hasPlaceholder, truncate } from "@/lib/utils";

const ABOUT_TEASER_MAX_LENGTH = 100;

export const HOME_HERO = {
  title: "Leon Hebeisen",
  lead: "Lernender Applikationsentwickler. Frontend zuerst, Spring Boot dahinter.",
  contactLabel: "Schreib mir",
  contactHref: "/kontakt",
} as const;

/** About teaser: short text and a link to the about page. */
export const HOME_ABOUT = {
  title: ABOUT_PAGE.title,
  /** Empty while the intro is still a placeholder; the teaser then shows only title and link. */
  text: hasPlaceholder(ABOUT_PAGE.intro)
    ? ""
    : truncate(ABOUT_PAGE.intro, ABOUT_TEASER_MAX_LENGTH),
  linkLabel: "Mehr über mich",
  linkHref: "/about",
} as const;
