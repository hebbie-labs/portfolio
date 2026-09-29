import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Instrument_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  axes: ["wdth"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const TITLE = "Leon Hebeisen – Lernender Applikationsentwickler";
const DESCRIPTION =
  "Leon Hebeisen, Lernender Applikationsentwickler EFZ bei Noser Young. Portfolio mit Projekten in Spring Boot, React und TypeScript.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL("https://leonhebeisen.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://leonhebeisen.com",
    siteName: "Leon Hebeisen",
    locale: "de_CH",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Leon Hebeisen – Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Leon Hebeisen",
  url: "https://leonhebeisen.com",
  jobTitle: "Lernender Applikationsentwickler EFZ",
  worksFor: { "@type": "Organization", name: "Noser Young" },
  sameAs: [
    "https://github.com/lelelon225",
    "https://www.linkedin.com/in/leonhebeisen",
    "https://noseryoung.ch/team-members/leon-hebeisen/",
    "https://www.instagram.com/lelelon225/",
    "https://x.com/lee0_0oon",
    "https://bsky.app/profile/lelelon225.bsky.social",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${bricolage.variable} ${instrument.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg font-sans text-fg">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
