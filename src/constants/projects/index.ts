import type { Project } from "@/types/project";

import { HOMESERVER_PROJECT } from "./homeserver";
import { RECUR } from "./recur";

export const PROJECTS_SECTION = {
  label: "Projekte",
  title: "Ausgewählte Arbeiten",
  allLabel: "Alle Projekte",
  allHref: "/projekte",
} as const;

export const PROJECTS_PAGE = { title: "Projekte" } as const;

export const PROJECT_TEXT = {
  demoLabel: "Dev-Demo",
  repoLabel: "GitHub",
  viewAlt: (title: string, view?: string) => `Screenshot von ${title}: ${view}`,
};

export const PROJECTS: Project[] = [RECUR, HOMESERVER_PROJECT];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
