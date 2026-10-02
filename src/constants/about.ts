// Content of the about page, top to bottom. Texts in [brackets] are placeholders.
// The skills for the icon cloud are in `skills.ts`.
import { SOCIAL_PROFILES } from "@/constants/site";

/** Header: portrait, headline, role and the first (large) paragraph. */
export const ABOUT_PAGE = {
  title: "Hi, ich bin Leon.",
  role: "Applikationsentwickler in Ausbildung",
  intro:
    "[Ein, zwei Sätze: Wer bin ich, was baue ich gerne und was treibt mich an?]",
  portrait: "/portrait.jpg",
  portraitAlt: "Portrait von Leon Hebeisen",
} as const;

/** Second paragraph. The skill cloud interrupts it between `before` and `after`; `after` wraps around it. */
export const ABOUT_STORY = {
  before:
    "[Absatz 2, erster Teil: Wie bin ich zur Informatik gekommen und was hat mich dabei gepackt? Hier stehen zwei, drei Sätze in voller Breite, bevor die Skill-Cloud den Text unterbricht und alles Weitere neben ihr weiterläuft.]",
  after:
    "[Absatz 2, zweiter Teil: Woran arbeite ich gerade, womit baue ich am liebsten und was möchte ich als Nächstes lernen? Der Text läuft zuerst schmal neben der Kugel, danach nimmt er unterhalb wieder die volle Breite ein. Ersetze diesen Platzhalter durch deinen echten Text, damit der Umbruch so aussieht, wie er später wirklich wirkt.]",
} as const;

/**
 * Third paragraph, a short CV. A string is plain text; `{ text, hint }` is a highlighted word that shows
 * its `hint` in a tooltip. Keep spaces and punctuation inside the strings.
 */
export const ABOUT_BIO = [
  "Seit 2025 lerne ich bei ",
  {
    text: "Noser Young",
    hint: "Lehre als Applikationsentwickler EFZ, aktuell im 2. Lehrjahr.",
  },
  ", davor drückte ich die Bank an der ",
  {
    text: "Sekundarschule",
    hint: "[Ein Satz dazu: Was ist hängen geblieben?]",
  },
  ". Wenn ich nicht code, findet man mich meist bei ",
  { text: "[Hobby 1]", hint: "[Ein Satz dazu, gern mit Augenzwinkern.]" },
  " oder ",
  { text: "[Hobby 2]", hint: "[Noch ein Satz, der nicht alles verrät.]" },
  ".",
] as const;

/** Link list at the bottom (the employer's team page is left out); edit the profiles in `site.ts`. */
export const ABOUT_LINKS = SOCIAL_PROFILES.filter(
  ({ label }) => label !== "Noser Young",
);

/** Last, accented row of the link list. */
export const ABOUT_CONTACT = { label: "Kontakt", href: "/kontakt" } as const;

/** One station of a timeline; `details` are optional bullet lines below the text. */
export type TimelineItem = {
  period: string;
  title: string;
  text: string;
  details?: readonly string[];
};

/** Detailed timeline on the about page, oldest first. */
export const ABOUT_TIMELINE = {
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
      details: ["[Erste Aufgaben und Technologien im Betrieb]"],
    },
    {
      period: "2025 – 2026",
      title: "1. Lehrjahr",
      text: "[Was habe ich im ersten Lehrjahr gelernt und gebaut?]",
    },
    {
      period: "Heute",
      title: "2. Lehrjahr",
      text: "Ich baue Recur, einen Habit- und Task-Tracker als PWA.",
      details: [
        "Spring-Boot-4-API (Java 25) mit Postgres",
        "Anmeldung per JWT und Google OAuth2/OIDC",
        "Frontend mit Next.js, React und TypeScript nach Atomic Design",
      ],
    },
  ],
} as const satisfies { title: string; items: readonly TimelineItem[] };
