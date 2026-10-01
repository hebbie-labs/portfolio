export const FEATURED_PROJECTS = [
  {
    nr: "01",
    title: "Recur",
    meta: "Web-App · In Entwicklung",
    description:
      "Habit- und Task-Tracker mit Google-Login. Läuft im Browser und bald als iOS- und Android-App.",
    tags: ["React 19", "TypeScript", "Tailwind", "shadcn/ui", "Spring Boot", "PostgreSQL", "OAuth2 / JWT", "Capacitor"],
    href: "/projekte",
  },
  {
    nr: "02",
    title: "Homeserver",
    meta: "Self-Hosting · Läuft",
    description:
      "Ein ThinkPad als Server: Pi-hole blockt Werbung im ganzen Netz, eigene Apps laufen in Containern, Zugriff von unterwegs nur über Tailscale.",
    tags: ["Debian", "Umbrel OS", "Docker", "Pi-hole", "Tailscale", "Cloudflare Tunnel"],
  },
] as const;

export const ARCHIVE_PROJECTS = [
  { name: "OSV Sportsapp", stack: "Spring Boot · Keycloak" },
  { name: "Roulette", stack: "TypeScript · WebSockets" },
  { name: "PyPass", stack: "Python · SQLite" },
  { name: "Movie DB", stack: "React · TMDB API" },
  { name: "Little Bambus", stack: "Spring Boot · PostgreSQL" },
] as const;
