import type { Metadata } from "next";
import { PrivacyPage } from "@/components/pages/privacy";
import { PRIVACY_PAGE } from "@/constants/privacy";

export const metadata: Metadata = PRIVACY_PAGE.meta;

export default function Page() {
  return <PrivacyPage />;
}
