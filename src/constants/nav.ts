export const NAV_LINKS = [
  { href: "/", label: "Start" },
  { href: "/projekte", label: "Projekte" },
  { href: "/skills", label: "Skills" },
  { href: "/about", label: "About" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const OUTSIDE_NAV_LINKS = [
  { href: "/impressum", label: "Impressum" },
  { href: "/*", label: "Not Found" },
] as const;

export type OutsideNavLabel = (typeof OUTSIDE_NAV_LINKS)[number]["label"];

export type NavLabel = (typeof NAV_LINKS)[number]["label"];
