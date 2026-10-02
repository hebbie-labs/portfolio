import type { MetadataRoute } from "next";
import { NAV_LINKS } from "@/constants/nav";
import { SITE_URL } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = NAV_LINKS.map(({ href }) => href);
  return paths.map((path) => ({ url: `${SITE_URL}${path === "/" ? "" : path}`, lastModified: new Date() }));
}
