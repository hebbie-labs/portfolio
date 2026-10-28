import { NAV_LINKS, NOT_FOUND_LINK, OUTSIDE_NAV_LINKS } from "@/constants/nav";

/** Nav entry whose section contains `pathname`; unknown routes are `NOT_FOUND_LINK`. */
export function getNavLink(pathname: string) {
  return (
    [...NAV_LINKS, ...OUTSIDE_NAV_LINKS].find(({ href }) =>
      href === "/"
        ? pathname === "/"
        : pathname === href || pathname.startsWith(`${href}/`),
    ) ?? NOT_FOUND_LINK
  );
}
