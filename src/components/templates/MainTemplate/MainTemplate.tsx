import { Reveal } from "@/components/atoms/Reveal";
import { ScrollCan } from "@/components/atoms/ScrollCan";
import { Footer } from "@/components/organisms/layout/Footer";
import { Nav } from "@/components/organisms/layout/Nav";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { NAV_TEXT } from "@/constants/nav";
import { SCROLLBAR_IMAGE } from "@/constants/site";

type Props = {
  children: React.ReactNode;
};

export function MainTemplate({ children }: Props) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-110 focus:rounded-md focus:bg-bg-2 focus:px-4 focus:py-2"
      >
        {NAV_TEXT.skipToContent}
      </a>
      <SmoothScroll />
      <ScrollCan src={SCROLLBAR_IMAGE} />
      <Nav />
      <main id="main" className="flex-1 overflow-x-clip">
        {children}
      </main>
      <Reveal variant="fade" index={3}>
        <Footer />
      </Reveal>
    </>
  );
}
