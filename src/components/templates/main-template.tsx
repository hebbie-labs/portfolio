import Footer from "@/components/organisms/footer";
import Nav from "@/components/organisms/nav";

export function MainTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
