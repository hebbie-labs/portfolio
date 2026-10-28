import type { Metadata } from "next";
import { PrivacyPage } from "@/components/pages/privacy";
import { PRIVACY_PAGE } from "@/constants/privacy";
import { pageMetadata } from "@/lib/seo";

// legal pages stay reachable but out of search results (and the sitemap)
export const metadata: Metadata = {
  ...pageMetadata(PRIVACY_PAGE.meta, "/datenschutz"),
  robots: { index: false },
};

export default function Page() {
  return <PrivacyPage />;
}
