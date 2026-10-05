import { Reveal } from "@/components/atoms/reveal";
import { Body } from "@/components/atoms/typography";
import { AboutBio } from "@/components/organisms/about-bio";
import { SkillCloud } from "@/components/organisms/skill-cloud";
import { ABOUT_STORY } from "@/constants/about";
import { hasPlaceholder } from "@/lib/utils";

/**
 * Second paragraph with the skill cloud in the middle, then the bio paragraph. From `md` the cloud floats right
 * and the text after it, including the bio, wraps around it (`flow-root` keeps the float inside, so the links
 * below start after the cloud); on mobile everything stacks. The story is a `div` because a float (itself a
 * `div`) can't be nested in a `p`.
 */
export function AboutStory() {
  const { before, after } = ABOUT_STORY;
  const filled = !hasPlaceholder(before, after);
  return (
    <div className="flex flex-col gap-6 md:flow-root">
      <Reveal scroll>
        <Body as="div" role="paragraph">
          {filled && before} <SkillCloud /> {filled && after}
        </Body>
      </Reveal>
      <AboutBio className="md:mt-6" />
    </div>
  );
}
