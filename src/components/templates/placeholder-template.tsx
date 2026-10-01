import { Headline } from "@/components/atoms/typography";

export function PlaceholderTemplate({ title }: { title: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg px-6 text-center text-fg">
      <Headline as="h1">{title}</Headline>
    </div>
  );
}
