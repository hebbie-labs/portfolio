import { Label } from "@/components/atoms/typography";
import type { Project } from "@/constants/projects";

export function FactList({ facts }: { facts: Project["facts"] }) {
  return (
    <dl className="grid grid-cols-2 gap-6 border-y border-line py-6 md:grid-cols-4">
      {facts.map(({ label, value }) => (
        <div key={label} className="flex flex-col gap-1.5">
          <Label as="dt">{label}</Label>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
