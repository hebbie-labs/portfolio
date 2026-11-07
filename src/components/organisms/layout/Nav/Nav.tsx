import { Logo } from "@/components/atoms/Logo";
import { PunktMenu } from "@/components/organisms/layout/Nav/PunktMenu";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { buttonVariants } from "@/components/ui/button";
import { NAV_TEXT } from "@/constants/nav";
import { cn } from "@/lib/utils";

export function Nav() {
  return (
    <header className="pointer-events-none sticky top-0 z-50 p-5">
      {/* First child on purpose: globals.css lifts it above the open menu (`header:has([data-menu-open]) > div`). */}
      <div className="pointer-events-auto flex flex-row justify-between">
        {/* `relative z-20` on each item: the menu overlay (z-10) sits inside this bar and would cover them. */}
        <Logo className="relative z-20" />
        <PunktMenu />
        <AnimatedThemeToggler
          aria-label={NAV_TEXT.themeToggle}
          className={cn(
            buttonVariants({ size: "icon" }),
            "relative z-20 rounded-control",
          )}
        />
      </div>
    </header>
  );
}
