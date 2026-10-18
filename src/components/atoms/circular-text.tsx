import CircularTextBase from "@/components/ui/circular-text";
import { cn } from "@/lib/utils";

/**
 * Decorative text spinning in a circle (React Bits), in the display style of the hero name, hidden from screen readers.
 * The component sets its weight inline, so the extrabold of `Display` is passed as `fontWeight`.
 */
export function CircularText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("font-display uppercase font-condensed", className)}
    >
      {/* Not a link, so no pointer cursor. */}
      <CircularTextBase
        text={children}
        fontWeight={800}
        className="cursor-default!"
      />
    </div>
  );
}
