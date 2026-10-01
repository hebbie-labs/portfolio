import { Reveal } from "@/components/atoms/reveal";
import { Headline } from "@/components/atoms/typography";

export function Hero() {
  return (
    <section className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-bg px-6 text-center text-fg">
      <Reveal>
        <Headline as="h1">Here will be an Hero some day.</Headline>
      </Reveal>
    </section>
  );
}
