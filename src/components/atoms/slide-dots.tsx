import { Button } from "@/components/atoms/button";
import { cn } from "@/lib/utils";

/** One dot per slide: the current one is a pill, a tap picks another. */
export function SlideDots({
  labels,
  current,
  onSelect,
}: {
  /** Accessible name per dot. */
  labels: readonly string[];
  current: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex justify-center">
      {labels.map((label, i) => (
        <Button
          key={label}
          variant="text"
          onClick={() => onSelect(i)}
          aria-label={label}
          aria-current={i === current}
          className="size-8 justify-center"
        >
          <span
            className={cn(
              "h-1.5 rounded-full transition-all duration-300 ease-out",
              i === current ? "w-4 bg-fg" : "w-1.5 bg-muted",
            )}
          />
        </Button>
      ))}
    </div>
  );
}
