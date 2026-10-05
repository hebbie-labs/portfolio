import type { Metadata } from "next";
import { LegalInformationPage } from "@/components/pages/legal-information";

export const metadata: Metadata = { title: "Impressum" };

export default function Page() {
  return <LegalInformationPage />;
}
