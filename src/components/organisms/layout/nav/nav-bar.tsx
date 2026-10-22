import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { buttonVariants } from "@/components/ui/button";
import { HyperText } from "@/components/ui/hyper-text";
import { Logo } from "@/components/atoms/logo";
import { StatusDot } from "@/components/atoms/status-dot";
import { MenuButton } from "@/components/molecules/layout/menu-button";
import { NAV_TEXT } from "@/constants/nav";
import type { NavMenuProps } from "@/types/nav";

export function NavBar({ open, setOpen, current }: NavMenuProps) {
  return (
    // pr-12 reserves the (absolute) theme toggler, so the closed pill is as wide as its items; min-w-max keeps the 54px intro pill clipping them instead of squeezing them onto the logo.
    <div className="relative flex min-w-max items-center pr-12">
      <Logo className="in-data-[intro=logo]:invisible" />
      <span
        inert={open}
        className="flex items-center gap-2 self-center pr-3 pl-3.5 font-mono text-xs whitespace-nowrap text-muted transition-opacity duration-200 inert:opacity-0"
      >
        <StatusDot className="size-1.5" />
        {/* HyperText scrambles its letters; screen readers get the plain label. */}
        <span className="sr-only">{current.label}</span>
        <span aria-hidden>
          <HyperText
            key={current.label}
            as="span"
            animateOnHover={false}
            className="py-0 text-xs font-normal"
          >
            {current.label}
          </HyperText>
        </span>
      </span>
      <MenuButton
        open={open}
        onToggle={() => setOpen(!open)}
        className="ml-auto transition-transform duration-400 ease-out aria-expanded:translate-x-12"
      />
      <div
        inert={open}
        className="absolute right-0 transition-opacity duration-150 inert:opacity-0"
      >
        <AnimatedThemeToggler
          aria-label={NAV_TEXT.themeToggle}
          className={buttonVariants({ size: "icon" })}
        />
      </div>
    </div>
  );
}
