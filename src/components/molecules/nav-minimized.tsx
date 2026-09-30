import { cn } from "@/lib/utils";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/atoms/logo";
import { MenuButton } from "@/components/molecules/menu-button";
import { NAV_LINKS } from "@/lib/constants";

type MinimizedNavProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  current: (typeof NAV_LINKS)[number]["label"];
};

function MinimizedNav({ open, setOpen, current }: MinimizedNavProps) {
  return (
    <div className="relative flex items-center">
      <Logo />
      <span
        className={`flex items-center gap-2 whitespace-nowrap pr-3 pl-3.5 font-mono text-xs text-muted transition-opacity duration-150 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="size-1.5 shrink-0 rounded-full bg-accent" />
        {current}
      </span>
      <MenuButton open={open} onToggle={() => setOpen(!open)} />
      <AnimatedThemeToggler
        aria-label="Farbschema wechseln"
        inert={open}
        className={cn(
          buttonVariants({ size: "icon" }),
          `absolute right-0 transition-opacity duration-150 ${
            open ? "opacity-0" : "opacity-100"
          }`,
        )}
      />
    </div>
  );
}
export default MinimizedNav;
