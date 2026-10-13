import { Reveal } from "@/components/atoms/reveal";
import { Body } from "@/components/atoms/typography";
import { RichText } from "@/components/molecules/rich-text";
import { ABOUT_BIO } from "@/constants/about";
import { hasPlaceholder, richStrings } from "@/lib/utils";

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
