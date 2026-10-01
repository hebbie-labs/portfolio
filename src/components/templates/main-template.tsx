"use client";
import { Reveal } from "@/components/atoms/reveal";
import { Footer } from "@/components/organisms/footer";
import { Intro } from "@/components/organisms/intro";
import { Nav } from "@/components/organisms/nav";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Transition } from "@headlessui/react";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export function MainTemplate({ children }: Readonly<Props>) {
  const pathname = usePathname();

  return (
    <>
      <SmoothScroll />
      <Intro />
      <Nav />
      <Transition
        key={pathname}
        appear
        show
        as="div"
        enter="transition duration-300 ease-out"
        leave="transition duration-300 ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-3"
        enterFrom="opacity-0 translate-y-3"
        enterTo="opacity-100 translate-y-0"
      >
        <main className="flex-1">{children}</main>
        <Reveal index={2}>
          <Footer />
        </Reveal>
      </Transition>
    </>
  );
}
