import { MainTemplate } from "@/components/templates/main-template";
import { FONT_VARIABLES } from "@/lib/fonts";
import { JSON_LD, THEME_INIT_SCRIPT } from "@/lib/seo";
import "./globals.css";

export { metadata, viewport } from "@/lib/seo";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${FONT_VARIABLES} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-bg font-sans text-fg antialiased">
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON_LD }}
        />
        <MainTemplate>{children}</MainTemplate>
      </body>
    </html>
  );
}
