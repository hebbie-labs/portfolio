import { Reveal } from "@/components/atoms/reveal";
import { Display } from "@/components/atoms/typography";

/** Project title in a projects page card; reveals on scroll. */
export function ProjectHeading({ title }: { title: string }) {
  return (
    <Reveal scroll variant="blur">
      <Display as="h2" size="lg">
        {title}
      </Display>
    </Reveal>
  );
}
