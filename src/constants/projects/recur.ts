import type { Project } from "@/types/project";

export const RECUR: Project = {
  slug: "recur",
  title: "Recur",
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
    { text: "Als PWA installierbar, mit Offline-Seite", view: "Mobil" },
  ],
  stack: [
    { area: "Frontend", tech: "Next.js, React, TypeScript" },
    { area: "Backend", tech: "Spring Boot, Java" },
    { area: "Datenbank", tech: "PostgreSQL" },
    { area: "Anmeldung", tech: "JWT, Google OAuth" },
    { area: "App", tech: "PWA" },
  ],
  featured: true,
  url: "https://dev.recur.dpdns.org",
  repo: "https://github.com/hebbie-labs/recur",
  video: "/projects/recur/showreel.mp4",
  views: [
    { label: "Aufgaben", image: "/projects/recur/home.png" },
    { label: "Kalender", image: "/projects/recur/kalender.png" },
    { label: "Liste", image: "/projects/recur/liste.png" },
    { label: "Gruppen", image: "/projects/recur/gruppen.png" },
    { label: "Mobil", image: "/projects/recur/home-mobile.png", portrait: true },
  ],
};
