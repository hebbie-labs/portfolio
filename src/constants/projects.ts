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
  intro:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
} as const;

export type Project = {
  /** Anchor on the projects page. */
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
};

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const TAGS = ["React 19", "TypeScript", "Tailwind"];

export const PROJECTS: Project[] = [
  {
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
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
