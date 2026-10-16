import { Reveal } from "@/components/atoms/reveal";
import { Body } from "@/components/atoms/typography";
import { RichText } from "@/components/molecules/about/rich-text";
import { ABOUT_BIO } from "@/constants/about";
import { hasPlaceholder, richStrings } from "@/lib/content";

/** Short CV as one paragraph with accent-marked words (tooltips or links, see `RichText`). */
export function AboutBio({ className }: { className?: string }) {
  if (hasPlaceholder(...richStrings(ABOUT_BIO))) return null;
  return (
    <Reveal scroll className={className}>
      <Body>
        <RichText parts={ABOUT_BIO} />
      </Body>
    </Reveal>
  );
}
