import type { Metadata, Viewport } from "next";
import { PROJECTS } from "@/constants/projects";
import {
  EMPLOYER,
  JOB_TITLE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SOCIAL_LINKS,
  THEME_COLOR,
} from "@/constants/site";

const SHARE_IMAGE = { url: "/opengraph-image", width: 1200, height: 630 };

const OPEN_GRAPH = { siteName: SITE_NAME, locale: "de_CH", type: "website" };

export const metadata: Metadata = {
  icons: { icon: "./logo.svg" },
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "./" },
  openGraph: {
    ...OPEN_GRAPH,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = { themeColor: THEME_COLOR };

/**
 * Metadata of a subpage. Open Graph and Twitter don't inherit `title`/`description`,
 * so without this every page would share the start page's. Setting them drops the
 * `app/opengraph-image.tsx` image, so it is linked again.
 */
export function pageMetadata(
  { title, description }: { title: string; description: string },
  path: string,
): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    openGraph: {
      ...OPEN_GRAPH,
      title: fullTitle,
      description,
      url: path,
      images: SHARE_IMAGE,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: SHARE_IMAGE,
    },
  };
}

const PERSON = { "@id": `${SITE_URL}/#person` };

/** Person and WebSite structured data, on every page (`app/layout.tsx`). */
export const SITE_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      ...PERSON,
      name: SITE_NAME,
      url: SITE_URL,
      image: `${SITE_URL}/about/portrait.jpg`,
      jobTitle: JOB_TITLE,
      worksFor: { "@type": "Organization", name: EMPLOYER },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bern",
        addressCountry: "CH",
      },
      knowsAbout: ["Java", "Spring Boot", "React", "TypeScript", "Next.js"],
      sameAs: SOCIAL_LINKS,
    },
    {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "de-CH",
      publisher: PERSON,
    },
  ],
};

/** Structured data of one page, pointing to the Person from `SITE_JSON_LD`. */
function webPage(type: string, path: string, extra?: object) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    url: `${SITE_URL}${path}`,
    inLanguage: "de-CH",
    ...extra,
  };
}

export const ABOUT_JSON_LD = webPage("ProfilePage", "/about", {
  mainEntity: PERSON,
});

export const CONTACT_JSON_LD = webPage("ContactPage", "/kontakt", {
  about: PERSON,
});

export const PROJECTS_JSON_LD = webPage("CollectionPage", "/projekte", {
  mainEntity: {
    "@type": "ItemList",
    itemListElement: PROJECTS.map((project, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.summary,
        url: `${SITE_URL}/projekte#${project.slug}`,
        author: PERSON,
        ...(project.repo && { sameAs: project.repo }),
      },
    })),
  },
});
