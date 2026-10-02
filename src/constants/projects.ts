export const PROJECTS_SECTION = {
  label: "Projekte",
  eyebrow: "(02) Ausgewählte Arbeiten",
  title: "Ausgewählte Arbeiten",
  intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  allLabel: "Alle Projekte",
  allHref: "/projekte",
} as const;

export const PROJECTS_PAGE = {
  eyebrow: "(01) Alle Projekte",
  title: "Projekte",
  intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
} as const;

type Item = { label: string; title: string; text: string };

export type Project = {
  /** URL segment of the case study page and anchor on the projects page. */
  slug: string;
  nr: string;
  title: string;
  category: string;
  /** One-liner for the preview on the start page. */
  summary: string;
  description: string;
  tags: readonly string[];
  /** Shown as preview on the start page. */
  featured?: boolean;
  /** Frame around the screenshot; default `browser`. */
  device?: "browser" | "phone";
  /** Live demo; also the address shown in the browser frame. */
  url?: string;
  /** GitHub repository. */
  repo?: string;
  /** Screenshot in `public/`, shown inside the device frame. */
  image?: string;
  /** Case study page. */
  facts: readonly { label: string; value: string }[];
  background: string;
  implementation: readonly Item[];
  learnings: readonly { title: string; text: string }[];
};

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const TAGS = ["React 19", "TypeScript", "Tailwind"];

const DETAIL = {
  facts: [
    { label: "Rolle", value: "[Rolle]" },
    { label: "Zeitraum", value: "[Zeitraum]" },
    { label: "Plattform", value: "[Plattform]" },
    { label: "Status", value: "[Status]" },
  ],
  background: `[Warum gebaut? Welches Problem, für wen?] ${LOREM}`,
  implementation: [
    { label: "Frontend", title: "[Titel]", text: LOREM },
    { label: "Backend", title: "[Titel]", text: LOREM },
    { label: "Auth", title: "[Titel]", text: LOREM },
    { label: "Deployment", title: "[Titel]", text: LOREM },
  ],
  learnings: [
    { title: "[Erkenntnis]", text: LOREM },
    { title: "[Erkenntnis]", text: LOREM },
  ],
};

export const PROJECTS: Project[] = [
  {
    ...DETAIL,
    slug: "recur",
    nr: "01",
    title: "Recur",
    category: "Web-App · In Entwicklung",
    summary: "Habit- und Task-Tracker mit Google-Login.",
    description: LOREM,
    tags: TAGS,
    featured: true,
    device: "browser",
    url: "https://dev.recur.dpdns.org",
  },
  {
    ...DETAIL,
    slug: "projekt-zwei",
    nr: "02",
    title: "Projekt Zwei",
    category: "Kategorie",
    summary: "Lorem ipsum dolor sit amet, consectetur.",
    description: LOREM,
    tags: TAGS,
    featured: true,
  },
  {
    ...DETAIL,
    slug: "projekt-drei",
    nr: "03",
    title: "Projekt Drei",
    category: "Kategorie",
    summary: "Lorem ipsum dolor sit amet, consectetur.",
    description: LOREM,
    tags: TAGS,
    featured: true,
  },
  {
    ...DETAIL,
    slug: "projekt-vier",
    nr: "04",
    title: "Projekt Vier",
    category: "Kategorie",
    summary: "Lorem ipsum dolor sit amet, consectetur.",
    description: LOREM,
    tags: TAGS,
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
