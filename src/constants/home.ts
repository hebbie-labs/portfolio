// Content of the start page.
import { ABOUT_PAGE } from "@/constants/about";

export const HOME_HERO = {
  name: "Leon",
  fullName: "Leon Hebeisen",
  position: "Lernender Applikationsentwickler.",
  lead: "Wenn du fragen an einen Design enthusiasten hast.",
  contactLabel: "Schreib mir",
  contactHref: "/kontakt",
  /** Typed one after another in the hero. */
  focus: ["Frontend", "React & TypeScript", "Spring Boot", "UI-Design"],
  /** Minecraft skin (64×64, slim) in the middle slot; also usable in the game. */
  skin: "/home/skin.png",
  skinLabel:
    "Leon als Minecraft-Figur: braune Locken, schwarzes Tanktop mit Kreuzkette, Jeans und Timberlands.",
} as const;

/** About teaser: the about intro in full, and a link to the about page. */
export const HOME_ABOUT = {
  title: ABOUT_PAGE.meta.title,
  text: ABOUT_PAGE.intro,
  linkLabel: "Mehr über mich",
  linkHref: "/about",
} as const;
