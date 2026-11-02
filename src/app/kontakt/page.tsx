import type { Metadata } from "next";

import { JsonLd } from "@/components/atoms/JsonLd";
import { ContactPage } from "@/components/pages/ContactPage";
import { CONTACT_PAGE } from "@/constants/contact";
import { CONTACT_JSON_LD, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(CONTACT_PAGE.meta, "/kontakt");

export default function Page() {
  return (
    <>
      <JsonLd data={CONTACT_JSON_LD} />
      <ContactPage />
    </>
  );
}
