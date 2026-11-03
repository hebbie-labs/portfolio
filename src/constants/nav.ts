export const NAV_LINKS = [
  { href: "/", label: "Start" },
  { href: "/about", label: "About" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const CONTACT_LINK = NAV_LINKS[2];

export const OUTSIDE_NAV_LINKS = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
] as const;

export const PRIVACY_LINK = OUTSIDE_NAV_LINKS[1];

/** Texts of the nav bar, the punkt menu and its buttons. */
export const NAV_TEXT = {
  ariaLabel: "Hauptnavigation",
  menu: "Menü",
  close: "Schliessen",
  menuOpen: "Menü öffnen",
  menuClose: "Menü schliessen",
  github: "GitHub",
  themeToggle: "Farbschema wechseln",
  homeLabel: "Zur Startseite",
  skipToContent: "Zum Inhalt springen",
} as const;

export const NOT_FOUND_LINK = { href: "", label: "404" } as const;

/** Window event `atoms/MenuPunkt` dispatches to open the punkt menu from its position (`detail: { x, y }`). */
export const MENU_OPEN_EVENT = "punkt-menu:open";
