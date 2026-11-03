// Content of the about page, top to bottom.
// The skills for the icon cloud are in `skills.ts`.

import type { Apprenticeship, TimelineItem } from "@/types/about";
import portraitSticker from "../../public/about/portrait-sticker.png";
import lehrjahr1 from "../../public/about/timeline-lehrjahr-1.jpg";
import lehrjahr2 from "../../public/about/timeline-lehrjahr-2.jpg";
import type { RichPart } from "@/types/richText";

/** Header: portrait (`sticker`, cut out; also in the home teaser), headline, role and the first (large) paragraph. */
export const ABOUT_PAGE = {
  /** Tab title and search description (`metadata` in `app/about/page.tsx`). */
  meta: {
    title: "Über mich",
    description:
      "Werdegang und Hintergrund von Leon Hebeisen, Lernender Applikationsentwickler EFZ bei Noser Young in Bern.",
  },
  title: "Hi, ich bin Leon.",
  role: "Applikationsentwickler in Ausbildung",
  intro:
    "Ich lerne gern neue Technologien, tausche mich mit anderen Menschen aus und baue Software, am liebsten im Frontend :)",
  sticker: portraitSticker,
  /** Right edge of the sticker's silhouette (from its alpha channel), for the text wrapping around it; redo when the image changes. */
  stickerShape:
    "polygon(0% 0%, 63.3% 0%, 70.7% 4.2%, 75.6% 8.3%, 78.3% 12.5%, 78.3% 16.7%, 76.1% 20.9%, 71.9% 25%, 70.9% 29.2%, 87.4% 33.4%, 94.6% 37.5%, 96.9% 41.7%, 97.6% 45.9%, 97.6% 50%, 96.9% 54.2%, 96.9% 58.4%, 97.6% 62.6%, 99.8% 66.7%, 99.8% 70.9%, 95.6% 75.1%, 82% 79.2%, 82.8% 83.4%, 82.8% 87.6%, 85.6% 91.8%, 88% 95.9%, 89.3% 100%, 0% 100%)",
  portraitAlt: "Portrait von Leon Hebeisen",
} as const;

/** Second paragraph. The skill cloud interrupts it between `before` and `after`; `after` wraps around it. */
export const ABOUT_STORY = {
  before: [
    "Schon bevor ich Informatiker geworden bin, habe ich mich sehr für ",
    {
      text: "Technik",
      hint: "Smartphones, Gadgets, alles mit Display und Akku.",
    },
    " interessiert. Ich habe mir stundenlang ",
    {
      text: "Videos",
      hint: "Tech-Reviews und Launch-Events, am liebsten bis spät in die Nacht.",
    },
    " über verschiedenste neueste Technik angeschaut. Daher wurde mir schon früh klar, dass ich später mal etwas in diese Richtung machen möchte, jedoch noch nicht, dass es die Informatik wird. Das habe ich erst bei mehreren Schnupperlehren gemerkt: Die Informatik war die, die hängen blieb.",
  ],
  after: [
    "Ich baue momentan an ",
    { text: "Recur", href: "https://github.com/hebbie-labs/recur" },
    ", einer Habit-Tracking-App, zusammen mit meinen Kollegen. Das beste Beispiel für meine Vorliebe fürs Frontend. Solche Apps baue ich am liebsten mit React und TypeScript, dazu noch mit ",
    { text: "Tailwind", href: "https://tailwindcss.com/" },
    " und ",
    { text: "Shadcn", href: "https://ui.shadcn.com/" },
    " als UI-Library.",
  ],
} as const satisfies Record<"before" | "after", readonly RichPart[]>;

/** Third paragraph, a short CV, made of `RichPart`s. */
export const ABOUT_BIO = [
  "Seit 2025 lerne ich bei ",
  {
    text: "Noser Young",
    hint: "Lehre als Applikationsentwickler EFZ, aktuell im 2. Lehrjahr.",
  },
  ", davor drückte ich die Bank an der ",
  {
    text: "Sekundarschule",
    hint: "Grüsse an Märci und Jürg für alle Hilfe.",
  },
  ". Wenn ich nicht code, findet man mich meist bei ",
  {
    text: "Gitarre",
    hint: "Spiele ich jetzt schon seit 2025, bin aber nicht so diszipliniert.",
  },
  ", ",
  {
    text: "Fashion",
    hint: "Meine Hauptausgabe, gefühlt jedes Monatslohns (momentan).",
  },
  " oder ",
  {
    text: "Sport",
    hint: "Krafttraining im Gym: Fehler behebe ich dort nicht per Debugging, sondern mit weniger Gewicht.",
  },
  ".",
] as const satisfies readonly RichPart[];

/** Detailed timeline on the about page, oldest first. */
export const ABOUT_TIMELINE = {
  title: "Werdegang",
  lehre: {
    title: "Lehre Applikationsentwickler EFZ",
    start: "2025-08-01",
    end: "2029-07-31",
    years: ["1. Lehrjahr", "2. Lehrjahr", "3. Lehrjahr", "4. Lehrjahr"],
    today: "heute",
  },
  items: [
    {
      period: "2023 - 2025",
      title: "Sekundarschule",
      text: "Der Zusammenhalt der Klasse fehlt mir sehr, und das sind die Sachen, die mir geblieben sind:",
      details: [
        "Das Abschlusslager in Yverdon-les-Bains",
        "Die Freundschaften, welche bis heute bestehen",
      ],
    },
    {
      period: "2025–2026",
      title: "1. Lehrjahr",
      text: "Im Basislehrjahr lernten wir die Grundlagen der Informatik, hier folgende Themen:",
      details: [
        "Einführung in C mit der geliebten Linked List",
        "üK 187, um die Basics in Filesystemen und OS zu lernen",
        "üK 106, um Datenbanken zu verstehen und SQL zu lernen",
        "üK 216, mit Arduino und ESP32 zum Umgang mit dem IoT und IoE",
        "üK 294 und 295, um Backend und Frontend separat zu lernen.",
      ],
      image: {
        src: lehrjahr1,
        alt: "Leon im ersten Lehrjahr bei Noser Young",
      },
    },
    {
      period: "2026–heute",
      title: "2. Lehrjahr",
      text: "Ich baue Recur, einen Habit- und Task-Tracker als PWA.",
      details: [
        "Frontend mit Next.js, React und TypeScript nach Atomic Design",
      ],
      image: {
        src: lehrjahr2,
        alt: "Portrait von Leon im zweiten Lehrjahr bei Noser Young",
      },
    },
  ],
} as const satisfies {
  title: string;
  lehre: Apprenticeship;
  items: readonly TimelineItem[];
};
