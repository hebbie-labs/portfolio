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

const OG_IMAGE = "/og.png";

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
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME}: Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
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
