import { Reveal } from "@/components/atoms/reveal";
import { Footer } from "@/components/organisms/footer";
import { Intro } from "@/components/organisms/intro";
import { Nav } from "@/components/organisms/nav";
import { SmoothScroll } from "@/components/providers/smooth-scroll";

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
        Zum Inhalt springen
      </a>
      <SmoothScroll />
      <Intro />
      <Nav />
      <main id="main" className="flex-1">{children}</main>
      <Reveal variant="fade" index={3}>
        <Footer />
      </Reveal>
    </>
  );
}
