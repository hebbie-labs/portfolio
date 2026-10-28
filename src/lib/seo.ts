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
  // keep dev.leonhebeisen.com (runs `pnpm dev`) out of search results
  robots:
    process.env.NODE_ENV === "production" ? undefined : { index: false },
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

/** Person structured data; `<` is escaped so the string is safe inside a `<script>` tag. */
export const JSON_LD: string = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: JOB_TITLE,
  worksFor: { "@type": "Organization", name: EMPLOYER },
  sameAs: SOCIAL_LINKS,
}).replace(/</g, "\\u003c");
