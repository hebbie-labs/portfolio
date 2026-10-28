import { Reveal } from "@/components/atoms/reveal";
import { Footer } from "@/components/organisms/layout/footer";
import { StartupIntro } from "@/components/organisms/layout/startup-intro";
import { Nav } from "@/components/organisms/layout/nav/nav";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { NAV_TEXT } from "@/constants/nav";

type Props = {
  children: React.ReactNode;
};

export function MainTemplate({ children }: Props) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-110 focus:rounded-2xl focus:bg-bg-2 focus:px-4 focus:py-2"
      >
        {NAV_TEXT.skipToContent}
      </a>
      <SmoothScroll />
      <StartupIntro />
      <Nav />
      {/* Clips scenes that bleed past the page edge, without breaking sticky (unlike overflow hidden). */}
      <main id="main" className="flex-1 overflow-x-clip">
        {children}
      </main>
      <Reveal variant="fade" index={3}>
        <Footer />
      </Reveal>
    </>
  );
}
