import { Label } from "@/components/atoms/typography";
import { AspectRatio } from "@/components/ui/aspect-ratio";

/** Screenshot placeholder, 16:10. */
export function ProjectMedia({ title }: { title: string }) {
  return (
    <AspectRatio
      ratio={16 / 10}
      className="flex items-center justify-center rounded-2xl border border-line bg-ph"
    >
      <Label>[Screenshot: {title} · 16:10]</Label>
    </AspectRatio>
  );
}
