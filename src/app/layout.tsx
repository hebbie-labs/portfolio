import Script from "next/script";
import { MainTemplate } from "@/components/templates/main-template";
import { FONT_VARIABLES } from "@/lib/fonts";
import { INTRO_INIT_SCRIPT, THEME_INIT_SCRIPT } from "@/lib/init-scripts";
import { JSON_LD } from "@/lib/seo";
import "./globals.css";

export { metadata, viewport } from "@/lib/seo";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${FONT_VARIABLES} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-bg font-sans text-fg antialiased">
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <Script id="intro-init" strategy="beforeInteractive">
          {INTRO_INIT_SCRIPT}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON_LD }}
        />
        <MainTemplate>{children}</MainTemplate>
      </body>
    </html>
  );
}
