import { Reveal } from "@/components/atoms/reveal";
import { Headline } from "@/components/atoms/typography";

export function PlaceholderTemplate({ title }: { title: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg px-6 text-center text-fg">
      <Reveal>
        <Headline as="h1">{title}</Headline>
      </Reveal>
    </div>
  );
}
