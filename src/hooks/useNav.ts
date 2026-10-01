import { usePathname } from "next/navigation";
import { OUTSIDE_NAV_LINKS, NAV_LINKS } from "@/constants/nav";

function useNav() {
  const pathname = usePathname();
  const current =
    [...NAV_LINKS, ...OUTSIDE_NAV_LINKS].find(
      (link) =>
        link.href === "/*" || // catch-all, must stay last
        (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)),
    )?.label ?? "Start";

  return { current };
}

export default useNav;
