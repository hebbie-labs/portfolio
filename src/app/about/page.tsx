import type { Metadata } from "next";

import { AboutPage } from "@/components/pages/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Werdegang und Hintergrund von Leon Hebeisen, Lernender Applikationsentwickler EFZ bei Noser Young in Bern.",
};

export default function Page() {
  return <AboutPage />;
}
