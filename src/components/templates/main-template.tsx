import { Footer } from "@/components/organisms/footer";
import { Nav } from "@/components/organisms/nav";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { TransitionProvider } from "@/components/providers/transition-provider";

type Props = {
  children: React.ReactNode;
};

export function MainTemplate({ children }: Readonly<Props>) {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <TransitionProvider>
        <main className="flex-1">{children}</main>
        <Footer />
      </TransitionProvider>
    </>
  );
}
