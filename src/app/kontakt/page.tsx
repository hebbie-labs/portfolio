import type { Metadata } from "next";

import { ContactPage } from "@/components/pages/contact";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Schreib Leon Hebeisen eine Nachricht oder finde ihn auf GitHub und LinkedIn.",
};

export default function Page() {
  return <ContactPage />;
}
