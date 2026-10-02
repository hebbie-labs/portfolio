import { Reveal } from "@/components/atoms/reveal";
import { Body, Display, Label } from "@/components/atoms/typography";

type Props = { eyebrow: string; title: string; intro: string };

/** Page header whose three lines reveal one after another. */
export function PageHeading({ eyebrow, title, intro }: Props) {
  return (
    <header className="flex flex-col gap-6">
      <Reveal variant="fade">
        <Label>{eyebrow}</Label>
      </Reveal>
      <Reveal variant="blur" index={1}>
        <Display as="h1" size="lg">
          {title}
        </Display>
      </Reveal>
      <Reveal index={2}>
        <Body muted className="max-w-md">
          {intro}
        </Body>
      </Reveal>
    </header>
  );
}
