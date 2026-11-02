import Script from "next/script";
import { JsonLd } from "@/components/atoms/JsonLd";
import { MainTemplate } from "@/components/templates/MainTemplate";
import { FONT_VARIABLES } from "@/lib/fonts";
import { INTRO_INIT_SCRIPT, THEME_INIT_SCRIPT } from "@/lib/initScripts";
import { SITE_JSON_LD } from "@/lib/seo";
import "./globals.css";

export { metadata, viewport } from "@/lib/seo";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${FONT_VARIABLES} antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col bg-bg font-sans text-fg antialiased">
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <Script id="intro-init" strategy="beforeInteractive">
          {INTRO_INIT_SCRIPT}
        </Script>
        <JsonLd data={SITE_JSON_LD} />
        <MainTemplate>{children}</MainTemplate>
      </body>
    </html>
  );
}
