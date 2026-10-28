// Content of the start page below the projects.
import { ABOUT_PAGE } from "@/constants/about";

export const HOME_HERO = {
  title: "Leon Hebeisen",
  lead: "Lernender Applikationsentwickler. Frontend zuerst, Spring Boot dahinter.",
  contactLabel: "Schreib mir",
  contactHref: "/kontakt",
} as const;

/** About teaser: the about intro cut to `maxLength` characters, and a link to the about page. */
export const HOME_ABOUT = {
  title: ABOUT_PAGE.title,
  text: ABOUT_PAGE.intro,
  maxLength: 100,
  linkLabel: "Mehr über mich",
  linkHref: "/about",
} as const;
