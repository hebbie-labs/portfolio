"use client";

import { Transition } from "@headlessui/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export function TransitionProvider({ children }: Readonly<Props>) {
  const pathname = usePathname();
  const prev = useRef(pathname);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (prev.current === pathname) return;
    prev.current = pathname;
    setShow(true);
  }, [pathname]);

  return (
    <>
      <Transition
        show={show}
        as="div"
        aria-hidden
        className="pointer-events-none fixed inset-0 z-999 bg-accent transition-transform duration-500 ease-spring data-enter:data-closed:-translate-x-full data-leave:data-closed:translate-x-full motion-reduce:hidden"
        transition
        afterEnter={() => setShow(false)}
      />
      {children}
    </>
  );
}
