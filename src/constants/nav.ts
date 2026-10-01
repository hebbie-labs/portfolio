export const NAV_LINKS = [
  { href: "/", label: "Start" },
  { href: "/projekte", label: "Projekte" },
  { href: "/skills", label: "Skills" },
  { href: "/about", label: "About" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const OUTSIDE_NAV_LINKS = [{ href: "/impressum", label: "Impressum" }] as const;

/** Label of the nav entry matching `pathname`; unknown routes are "Not Found". */
export function getNavLabel(pathname: string) {
  return (
    [...NAV_LINKS, ...OUTSIDE_NAV_LINKS].find(({ href }) =>
      href === "/" ? pathname === "/" : pathname.startsWith(href),
    )?.label ?? "Not Found"
  );
}
