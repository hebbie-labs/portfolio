import Footer from "@/components/organisms/footer";
import Nav from "@/components/organisms/nav";
import { SmoothScroll } from "@/components/providers/smooth-scroll";

export function MainTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
