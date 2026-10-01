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
      <SmoothScroll />
      <Intro />
      <Nav />
      <main className="flex-1">{children}</main>
      <Reveal variant="fade" index={3}>
        <Footer />
      </Reveal>
    </>
  );
}
