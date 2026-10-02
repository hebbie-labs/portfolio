import { Body, Headline, Label } from "@/components/atoms/typography";

export function CaseItem({ label, title, text }: { label: string; title: string; text: string }) {
  return (
    <div className="flex flex-col gap-3">
      <Label>{label}</Label>
      <Headline as="h3" size="sm">
        {title}
      </Headline>
      <Body muted>{text}</Body>
    </div>
  );
}
