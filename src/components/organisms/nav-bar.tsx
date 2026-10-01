import { Transition } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { buttonVariants } from "@/components/ui/button";
import { HyperText } from "@/components/ui/hyper-text";
import { Logo } from "@/components/atoms/logo";
import { StatusDot } from "@/components/atoms/status-dot";
import { MenuButton } from "@/components/molecules/menu-button";
import type { NavPanelProps } from "@/types/nav";

export function NavBar({ open, setOpen, current }: Readonly<NavPanelProps>) {
  return (
    <div className="relative flex items-center">
      <Logo />
      <Transition
        as="span"
        show={!open}
        className="self-center flex items-center gap-2 whitespace-nowrap pr-3 pl-3.5 font-mono text-xs text-muted transition-opacity duration-400 data-closed:opacity-0"
      >
        <StatusDot className="size-1.5" />
        <HyperText
          key={current}
          as="span"
          animateOnHover={false}
          className="py-0 text-xs font-normal"
        >
          {current}
        </HyperText>
      </Transition>
      <MenuButton
        open={open}
        onToggle={() => setOpen(!open)}
        className={`ml-auto transition-transform duration-450 ease-in-out ${open ? "translate-x-0" : "-translate-x-12"}`}
      />
      <Transition
        as="div"
        show={!open}
        className="absolute right-0 transition-opacity duration-150 data-closed:opacity-0"
      >
        <AnimatedThemeToggler
          aria-label="Farbschema wechseln"
          className={cn(buttonVariants({ size: "icon" }))}
        />
      </Transition>
    </div>
  );
}
