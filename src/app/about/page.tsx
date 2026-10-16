import type { Metadata } from "next";

import { AboutPage } from "@/components/pages/about";
import { ABOUT_PAGE } from "@/constants/about";

export const metadata: Metadata = ABOUT_PAGE.meta;

export default function Page() {
  return <AboutPage />;
}
