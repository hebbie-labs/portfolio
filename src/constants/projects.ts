import { RECUR } from "./projects/recur";
import { HOMESERVER_PROJECT } from "./projects/homeserver";

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
  title: "Ausgewählte Arbeiten",
  intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  allLabel: "Alle Projekte",
  allHref: "/projekte",
} as const;

export const PROJECTS_PAGE = { title: "Projekte" } as const;

export const PROJECT_TEXT = {
  demoLabel: "Live-Demo",
  repoLabel: "GitHub",
  viewAlt: (title: string, view?: string) => `Screenshot von ${title}: ${view}`,
  phoneAlt: (title: string) => `Screenshot von ${title} auf dem Handy`,
};

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

export const PROJECTS: Project[] = [RECUR, HOMESERVER_PROJECT];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
