import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/constants/nav";

function useNav() {
  const pathname = usePathname();
  const current =
    NAV_LINKS.find((link) => link.href === "/" ? pathname === "/" : pathname.startsWith(link.href))?.label ?? "Start";

  return { current };
}

export default useNav;
