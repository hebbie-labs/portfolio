import type { MetadataRoute } from "next";
import { NAV_LINKS } from "@/constants/nav";
import { PROJECTS } from "@/constants/projects";
import { SITE_URL } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...NAV_LINKS.map(({ href }) => href), ...PROJECTS.map(({ slug }) => `/projekte/${slug}`)];
  return paths.map((path) => ({ url: `${SITE_URL}${path === "/" ? "" : path}`, lastModified: new Date() }));
}
