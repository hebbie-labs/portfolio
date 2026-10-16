export const NAV_LINKS = [
  { href: "/", label: "Start" },
  { href: "/projekte", label: "Projekte" },
  { href: "/about", label: "About" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const CONTACT_LINK = NAV_LINKS[3];

export const OUTSIDE_NAV_LINKS = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
] as const;

/** Texts of the nav bar, menu panel and its buttons. */
export const NAV_TEXT = {
  ariaLabel: "Hauptnavigation",
  menuOpen: "Menü",
  menuClose: "Schliessen",
  themeLight: "Hell",
  themeDark: "Dunkel",
  github: "GitHub",
  themeToggle: "Farbschema wechseln",
} as const;

export const NOT_FOUND_LINK = { href: "", label: "404" } as const;
