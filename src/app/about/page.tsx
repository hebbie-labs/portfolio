import type { Metadata } from "next";

import { JsonLd } from "@/components/atoms/json-ld";
import { AboutPage } from "@/components/pages/about";
import { ABOUT_PAGE } from "@/constants/about";
import { ABOUT_JSON_LD, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(ABOUT_PAGE.meta, "/about");

export default function Page() {
  return (
    <>
      <JsonLd data={ABOUT_JSON_LD} />
      <AboutPage />
    </>
  );
}
