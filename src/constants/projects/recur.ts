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
      target: { x: 74, y: 58 },
      caption: { x: 74, y: 82 },
    },
    {
      text: "Monats- und Wochenkalender sowie Listenansicht",
      view: "Kalender",
      target: { x: 60, y: 45 },
    },
    {
      text: "Favoriten und Archiv für erledigte Aufgaben",
      view: "Liste",
      target: { x: 55, y: 56 },
      caption: { x: 76, y: 62 },
    },
    {
      text: "Gruppen mit Einladungslinks, um Projekte und Aufgaben zu teilen",
      view: "Gruppen",
      target: { x: 40, y: 18 },
      caption: { x: 40, y: 72 },
    },
    {
      text: "Anmeldung per E-Mail oder mit Google",
      view: "Login",
      target: { x: 44, y: 64 },
    },
    {
      text: "Als PWA installierbar, mit Offline-Seite",
      view: "Mobil",
      target: { x: 41, y: 45 },
    },
  ],
  featured: true,
  url: "https://dev.recur.dpdns.org",
  repo: "https://github.com/hebbie-labs/recur",
  preview: {
    video: "/projects/recur/showreel.mp4",
    poster: "/projects/recur/home.png",
  },
  views: [
    { label: "Aufgaben", image: "/projects/recur/home.png" },
    { label: "Kalender", image: "/projects/recur/kalender.png" },
    { label: "Liste", image: "/projects/recur/liste.png" },
    { label: "Gruppen", image: "/projects/recur/gruppen.png" },
    { label: "Login", image: "/projects/recur/login.png" },
    { label: "Mobil", image: "/projects/recur/home-mobile.png", portrait: true },
  ],
};
