import { ArrowUpRight } from "lucide-react";

/** Decorative arrow that slides in when the surrounding `group` is hovered (devices with hover only). */
export function CornerArrow() {
  return (
    <ArrowUpRight
      className="size-5 -translate-x-2 translate-y-2 text-accent opacity-0 transition duration-500 ease-spring group-hover:translate-0 group-hover:opacity-100 [@media(hover:none)]:hidden"
      aria-hidden
    />
  );
}
