import type { Metadata, Viewport } from "next";
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

export const metadata: Metadata = {
  icons: { icon: "./logo.svg" },
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "./" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "de_CH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = { themeColor: THEME_COLOR };

/** Person and WebSite structured data; `<` is escaped so the string is safe inside a `<script>` tag. */
export const JSON_LD: string = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
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
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
}).replace(/</g, "\\u003c");
