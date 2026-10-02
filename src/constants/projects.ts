export const PROJECTS_SECTION = {
  label: "Projekte",
  eyebrow: "(02) Projekte im Detail",
  title: "Ausgewählte Arbeiten",
  intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  allLabel: "Alle Projekte",
  allHref: "/projekte",
} as const;

const PREVIEW =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const TAGS = ["React 19", "TypeScript", "Tailwind"];

export const PROJECTS = [
  { nr: "01", title: "Recur", category: "Web-App · In Entwicklung", description: PREVIEW, tags: TAGS, href: "/projekte" },
  { nr: "02", title: "Projekt Zwei", category: "Kategorie", description: PREVIEW, tags: TAGS, href: "/projekte" },
  { nr: "03", title: "Projekt Drei", category: "Kategorie", description: PREVIEW, tags: TAGS, href: "/projekte" },
  { nr: "04", title: "Projekt Vier", category: "Kategorie", description: PREVIEW, tags: TAGS, href: "/projekte" },
];

export type Project = (typeof PROJECTS)[number];
