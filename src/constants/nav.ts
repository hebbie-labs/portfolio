export const NAV_LINKS = [
  { href: "/", label: "Start" },
  { href: "/projekte", label: "Projekte" },
  { href: "/skills", label: "Skills" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export type NavLabel = (typeof NAV_LINKS)[number]["label"];
