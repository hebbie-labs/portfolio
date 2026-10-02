export const NAV_LINKS = [
  { href: "/", label: "Start" },
  { href: "/projekte", label: "Projekte" },
  { href: "/about", label: "About" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const OUTSIDE_NAV_LINKS = [{ href: "/impressum", label: "Impressum" }] as const;

export const NOT_FOUND_LINK = { href: "", label: "404" } as const;

/** Nav entry whose section contains `pathname`; unknown routes are `NOT_FOUND_LINK`. */
export function getNavLink(pathname: string) {
  return (
    [...NAV_LINKS, ...OUTSIDE_NAV_LINKS].find(({ href }) =>
      href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`),
    ) ?? NOT_FOUND_LINK
  );
}
