import { Transition } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { NavLink } from "@/components/molecules/nav-link";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { buttonVariants } from "@/components/ui/button";
import { NAV_LINKS } from "@/constants/nav";
import { GITHUB_URL } from "@/constants/site";
import type { NavPanelProps } from "@/types/nav";

export function NavPanel({ open, setOpen, current }: NavPanelProps) {
  return (
    <Transition
      as="div"
      show={open}
      id="menu-panel"
      className="grid grid-rows-[1fr] transition-[grid-template-rows,opacity] duration-450 ease-in-out data-closed:grid-rows-[0fr] data-closed:opacity-0"
    >
      <div className="min-h-0 overflow-hidden">
        <nav aria-label="Hauptnavigation" className="flex flex-col pt-1 pb-2">
          {NAV_LINKS.map(({ href, label }, i) => (
            <NavLink
              key={href}
              href={href}
              label={label}
              index={i}
              active={label === current}
              onClick={() => setOpen(false)}
            />
          ))}
        </nav>
        <div className="flex items-center justify-between border-t border-line px-1 pt-1.5 pb-0.5 font-mono text-xs">
          <AnimatedThemeToggler
            className={cn(buttonVariants(), "gap-2.5 px-3.5")}
          >
            <span className="in-data-[theme=light]:hidden">Hell</span>
            <span className="hidden in-data-[theme=light]:inline">Dunkel</span>
          </AnimatedThemeToggler>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants(), "px-3.5 group")}
          >
            GitHub
            <ArrowUpRight
              className="size-0 opacity-0 -translate-x-3 transition-all duration-250 group-hover:size-3.5 group-hover:opacity-75 group-hover:translate-x-0"
              aria-hidden
            />
          </a>
        </div>
      </div>
    </Transition>
  );
}
