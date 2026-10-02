import { Reveal } from "@/components/atoms/reveal";
import { Headline } from "@/components/atoms/typography";

/** Case study block: heading left, content right; reveals on scroll. */
export function CaseSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal scroll>
      <section className="grid gap-8 md:grid-cols-[1fr_2fr] md:gap-10">
        <Headline>{title}</Headline>
        <div>{children}</div>
      </section>
    </Reveal>
  );
}
