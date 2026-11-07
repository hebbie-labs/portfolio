import type { MetadataRoute } from "next";
import { HOME_LINK, NAV_LINKS } from "@/constants/nav";
import { SITE_URL } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // legal pages (`OUTSIDE_NAV_LINKS`) are noindex
  const paths = [HOME_LINK, ...NAV_LINKS].map(({ href }) => href);
  return paths.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified: new Date(),
  }));
}
