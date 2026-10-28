import FuzzyTextBase from "@/components/ui/fuzzy-text";
import { cn } from "@/lib/utils";

/**
 * Decorative display-size text with React Bits' fuzz effect, hidden from screen readers.
 * The canvas inherits color and family from the wrapper (and follows theme changes on its own);
 * the min height reserves the line so the layout doesn't jump while the font loads.
 */
export function FuzzyText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex min-h-[1lh] items-center justify-center font-display text-display text-accent",
        className,
      )}
    >
      {/* The canvas builds its font as `${fontWeight} ${size} ${family}`, so the
          width (font-condensed, like Display) rides along in the weight. */}
      <FuzzyTextBase fontSize="var(--text-display)" fontWeight="800 condensed">
        {children}
      </FuzzyTextBase>
    </span>
  );
}
