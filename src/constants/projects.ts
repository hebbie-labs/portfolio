export const PROJECTS_SECTION = {
  label: "Projekte",
  eyebrow: "(02) Projekte im Detail",
  title: "Ausgewählte Arbeiten",
  intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  allLabel: ["Alle", "Projekte"],
  allHref: "/projekte",
} as const;

export const PREVIEW =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

export const PROJECTS = [
  { nr: "01", title: "Recur", description: PREVIEW },
  { nr: "02", title: "Projekt Zwei", description: PREVIEW },
  { nr: "03", title: "Projekt Drei", description: PREVIEW },
  { nr: "04", title: "Projekt Vier", description: PREVIEW },
];

export type Project = (typeof PROJECTS)[number];
