import { Headline } from "@/components/atoms/typography";

export function Hero() {
  return (
    <section className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-bg px-6 text-center text-fg">
      <Headline as="h1">Here will be an Hero some day.</Headline>
    </section>
  );
}
