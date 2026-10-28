import type { Metadata } from "next";
import { LegalInformationPage } from "@/components/pages/legal-information";
import { LEGAL_PAGE } from "@/constants/legal";
import { pageMetadata } from "@/lib/seo";

// legal pages stay reachable but out of search results (and the sitemap)
export const metadata: Metadata = {
  ...pageMetadata(LEGAL_PAGE.meta, "/impressum"),
  robots: { index: false },
};

export default function Page() {
  return <LegalInformationPage />;
}
