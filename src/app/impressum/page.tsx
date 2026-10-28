import type { Metadata } from "next";
import { LegalInformationPage } from "@/components/pages/legal-information";
import { LEGAL_PAGE } from "@/constants/legal";

export const metadata: Metadata = LEGAL_PAGE.meta;

export default function Page() {
  return <LegalInformationPage />;
}
