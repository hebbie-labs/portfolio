import type { Project } from "@/types/project";

import { HOMESERVER_PROJECT } from "./homeserver";
import { RECUR } from "./recur";

export const PROJECTS_SECTION = {
  label: "Projekte",
  title: "Ausgewählte Arbeiten",
  allLabel: "Alle Projekte",
  allHref: "/projekte",
} as const;

export const PROJECTS_PAGE = {
  title: "Projekte",
  /** Tab title and search description (`metadata` in `app/projekte/page.tsx`). */
  meta: {
    title: "Projekte",
    description:
      "Projekte von Leon Hebeisen: Recur, ein Habit- und Task-Tracker, und ein selbst gebauter Homeserver.",
  },
} as const;

export const PROJECT_TEXT = {
  demoLabel: "Live-Demo",
  videoLabel: "Video",
  repoLabel: "GitHub",
  viewAlt: (title: string, view?: string) =>
    view ? `Screenshot von ${title}: ${view}` : `Screenshot von ${title}`,
  carouselLabel: (title: string) => `Ansichten von ${title}`,
  slideLabel: (index: number, count: number, label: string) =>
    `Folie ${index} von ${count}: ${label}`,
  sceneAlt: (title: string, view?: string) =>
    view ? `3D-Modell von ${title}: ${view}` : `3D-Modell von ${title}`,
};

export const PROJECTS: Project[] = [RECUR, HOMESERVER_PROJECT];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
