import type { Metadata } from "next";

import { ContactPage } from "@/components/pages/contact";
import { CONTACT_PAGE } from "@/constants/contact";

export const metadata: Metadata = CONTACT_PAGE.meta;

export default function Page() {
  return <ContactPage />;
}
