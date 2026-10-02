import { Badge } from "@/components/ui/badge";

export function TagList({ tags }: { tags: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge
          key={tag}
          render={<li />}
          variant="outline"
          className="h-auto border-line px-3 py-1.5 font-mono text-muted"
        >
          {tag}
        </Badge>
      ))}
    </ul>
  );
}
