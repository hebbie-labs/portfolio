import { SOCIAL_PROFILES } from "@/constants/site";

export const ABOUT_PAGE = {
  title: "Hi, ich bin Leon.",
  role: "Applikationsentwickler in Ausbildung",
  intro:
    "[Ein, zwei Sätze: Wer bin ich, was baue ich gerne und was treibt mich an?]",
  portrait: "/portrait.jpg",
} as const;

export const ABOUT_SKILLS = {
  title: "Skills",
  items: ["Java", "Spring Boot", "React", "TypeScript", "Next.js", "Tailwind", "Docker", "GitHub", "Git"],
} as const;

/** Profiles shown on the about page; the employer's team page is left out. */
export const ABOUT_LINKS = SOCIAL_PROFILES.filter(({ label }) => label !== "Noser Young");
