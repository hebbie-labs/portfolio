import { Inter } from "next/font/google";
import localFont from "next/font/local";

// Redaction 50 and Tiny5 Duo aren't in next/font/google's list yet: local woff2, subset to Latin (OFL, licences next to the files).
const redaction = localFont({
  variable: "--font-redaction",
  src: [
    { path: "../assets/fonts/redaction-50-regular.woff2", weight: "400" },
    { path: "../assets/fonts/redaction-50-bold.woff2", weight: "700" },
  ],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Pixel font for highlights only (e.g. the server scene's canvas labels via `--font-mono`), not for small UI text.
const tiny5 = localFont({
  variable: "--font-tiny5",
  src: "../assets/fonts/tiny5-duo-regular.woff2",
});

export const FONT_VARIABLES = `${redaction.variable} ${inter.variable} ${tiny5.variable}`;
