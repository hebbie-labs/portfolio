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
  featured: true,
  url: "https://dev.recur.dpdns.org",
  repo: "https://github.com/hebbie-labs/recur",
  video: "/projects/recur/showreel.mp4",
  views: [
    { label: "Aufgaben", image: "/projects/recur/home.png" },
    // TODO: Platzhalter durch echte Screenshots ersetzen (public/projects/recur/placeholder/ danach löschen)
    { label: "Kalender", image: "/projects/recur/placeholder/kalender.svg" },
    { label: "Liste", image: "/projects/recur/placeholder/liste.svg" },
    { label: "Gruppen", image: "/projects/recur/placeholder/gruppen.svg" },
    { label: "Mobil", image: "/projects/recur/home-mobile.png", portrait: true },
  ],
};
