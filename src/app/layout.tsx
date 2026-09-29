import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
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
