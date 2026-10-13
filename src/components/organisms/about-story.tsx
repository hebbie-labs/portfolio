import { Reveal } from "@/components/atoms/reveal";
import { Body } from "@/components/atoms/typography";
import { RichText } from "@/components/molecules/rich-text";
import { AboutBio } from "@/components/organisms/about-bio";
import { SkillCloud } from "@/components/organisms/skill-cloud";
import { ABOUT_STORY } from "@/constants/about";
import { hasPlaceholder, richStrings } from "@/lib/utils";

/**
 * Second paragraph with the skill cloud in the middle, then the bio paragraph. From `md` the cloud floats right
 * and the text after it, including the bio, wraps around it (`flow-root` keeps the float inside, so the links
 * below start after the cloud); on mobile everything stacks. The story is two paragraphs with the cloud between them.
 */
export function AboutStory() {
  const { before, after } = ABOUT_STORY;
  const filled = !hasPlaceholder(...richStrings(before), ...richStrings(after));
  return (
    <div className="flex flex-col gap-6 md:flow-root">
      <Reveal scroll>
        {filled && (
          <Body>
            <RichText parts={before} />
          </Body>
        )}
        <SkillCloud />
        {filled && (
          <Body className="md:mt-6">
            <RichText parts={after} />
          </Body>
        )}
      </Reveal>
      <AboutBio className="md:mt-6" />
    </div>
  );
}
