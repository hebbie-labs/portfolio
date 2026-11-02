import TextType from "@/components/ui/text-type";
import { cn } from "@/lib/utils";

/** Types the items one after another in a loop, accent cursor; React Bits' TextType (screen readers and reduced motion get the plain list). */
export function TypedText({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <TextType
      as="p"
      text={[...items]}
      typingSpeed={60}
      deletingSpeed={35}
      pauseDuration={1800}
      cursorCharacter="_"
      cursorClassName="text-accent"
      className={cn("text-xl md:text-headline-sm", className)}
    />
  );
}
