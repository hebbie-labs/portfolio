export const PROJECTS_SECTION = {
  label: "Projekte",
  eyebrow: "(02) Ausgewählte Arbeiten",
  title: "Ausgewählte Arbeiten",
  intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  allLabel: "Alle Projekte",
  allHref: "/projekte",
} as const;

export const PROJECTS_PAGE = { title: "Projekte" } as const;

/** One desktop view of a project; the frame stays empty until `image` is set. */
export type ProjectView = {
  label: string;
  /** Screenshot in `public/`. */
  image?: string;
};

export type ProjectFeature = {
  text: string;
  /** `label` of the `views` entry this feature shows; without it the frame stays as it is. */
  view?: string;
};

export type Project = {
  /** Anchor on the projects page. */
  slug: string;
  nr: string;
  title: string;
  /** Shown above the title. */
  categories: readonly string[];
  /** One-liner for the preview on the start page. */
  summary: string;
  /** One entry per paragraph. */
  description: readonly string[];
  /** Ruled rows below the description; scrolling one into the middle switches the browser frame to its `view`. */
  features?: readonly ProjectFeature[];
  tags: readonly string[];
  /** Shown as preview on the start page. */
  featured?: boolean;
  /** Live demo; also the address shown in the browser frame. */
  url?: string;
  /** GitHub repository. */
  repo?: string;
  /** Video in `public/`, shown in its own full-width browser frame above the others; plays muted and looped (paused with reduced motion). */
  video?: string;
  /** Desktop views in the browser frame; the first one is also the start page preview and the poster of `video`. Reference each by a feature, below `md` tabs switch them. */
  views: readonly ProjectView[];
  /** Mobile screenshot in a phone frame overlapping the browser frame. */
  phone?: { image?: string };
};

export const PROJECTS_SECTION = {
  label: "Projekte",
  eyebrow: "(02) Ausgewählte Arbeiten",
  title: "Ausgewählte Arbeiten",
  intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  allLabel: "Alle Projekte",
  allHref: "/projekte",
} as const;

export const PROJECTS_PAGE = { title: "Projekte" } as const;

/** One desktop view of a project; the frame stays empty until `image` is set. */
export type ProjectView = {
  label: string;
  /** Screenshot in `public/`. */
  image?: string;
};

export type ProjectFeature = {
  text: string;
  /** `label` of the `views` entry this feature shows; without it the frame stays as it is. */
  view?: string;
};

export type Project = {
  /** Anchor on the projects page. */
  slug: string;
  nr: string;
  title: string;
  /** Shown above the title. */
  categories: readonly string[];
  /** One-liner for the preview on the start page. */
  summary: string;
  /** One entry per paragraph. */
  description: readonly string[];
  /** Ruled rows below the description; scrolling one into the middle switches the browser frame to its `view`. */
  features?: readonly ProjectFeature[];
  tags: readonly string[];
  /** Shown as preview on the start page. */
  featured?: boolean;
  /** Live demo; also the address shown in the browser frame. */
  url?: string;
  /** GitHub repository. */
  repo?: string;
  /** Video in `public/`, shown in its own full-width browser frame above the others; plays muted and looped (paused with reduced motion). */
  video?: string;
  /** Desktop views in the browser frame; the first one is also the start page preview and the poster of `video`. Reference each by a feature, below `md` tabs switch them. */
  views: readonly ProjectView[];
  /** Mobile screenshot in a phone frame overlapping the browser frame. */
  phone?: { image?: string };
};

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

export const PROJECTS: Project[] = [
  {
    slug: "recur",
    nr: "01",
    title: "Recur",
    categories: ["Web-App", "PWA", "In Entwicklung"],
    summary: "Habit- und Task-Tracker mit Google-Login.",
    description: [
      "Recur ist ein Tracker für Gewohnheiten und Aufgaben. Habits und einmalige Tasks lege ich mit Kategorie, Häufigkeit und Fälligkeit an, markiere Favoriten und archiviere Erledigtes. Ein Monats- und Wochenkalender sowie eine Listenansicht zeigen, was ansteht. Projekte und Aufgaben teile ich über Einladungslinks mit einer Gruppe.",
      "Hinter der App steckt eine Spring-Boot-4-API (Java 25) mit Postgres. Die Anmeldung läuft hybrid über JWT und Google OAuth2/OIDC. Das Frontend ist Next.js mit React und TypeScript, nach Atomic Design aufgebaut, und lässt sich als PWA auf dem Homescreen installieren.",
    ],
    features: [
      {
        text: "Habits und einmalige Aufgaben mit Kategorie, Häufigkeit und Fälligkeit",
        view: "Aufgaben",
      },
      {
        text: "Monats- und Wochenkalender sowie Listenansicht",
        view: "Kalender",
      },
      { text: "Favoriten und Archiv für erledigte Aufgaben", view: "Liste" },
      {
        text: "Gruppen mit Einladungslinks, um Projekte und Aufgaben zu teilen",
        view: "Gruppen",
      },
      { text: "Anmeldung per E-Mail oder mit Google" },
      { text: "Als PWA installierbar, mit Offline-Seite" },
    ],
    tags: [
      "Java 25",
      "Spring Boot 4",
      "PostgreSQL",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "Docker",
    ],
    featured: true,
    url: "https://dev.recur.dpdns.org",
    repo: "https://github.com/hebbie-labs/recur",
    video: "/recur-showreel.mp4",
    views: [
      { label: "Aufgaben", image: "/recur-home.png" },
      // TODO: Platzhalter durch echte Screenshots ersetzen (public/placeholder/ danach löschen)
      { label: "Kalender", image: "/placeholder/recur-kalender.svg" },
      { label: "Liste", image: "/placeholder/recur-liste.svg" },
      { label: "Gruppen", image: "/placeholder/recur-gruppen.svg" },
    ],
    phone: { image: "/recur-home-mobile.png" },
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
