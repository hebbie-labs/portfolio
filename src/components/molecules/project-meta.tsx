import { Label } from "@/components/atoms/typography";

export function ProjectMeta({ nr, category }: { nr: string; category: string }) {
  return (
    <div className="flex justify-between">
      <Label>{nr}</Label>
      <Label>{category}</Label>
    </div>
  );
}
