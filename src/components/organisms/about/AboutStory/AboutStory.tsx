import { Reveal } from "@/components/atoms/Reveal";
import { Body } from "@/components/atoms/Typography";
import { RichText } from "@/components/atoms/RichText";
import { AboutBio } from "@/components/molecules/about/AboutBio";
import { SkillCloud } from "@/components/molecules/about/SkillCloud";
import { ABOUT_STORY } from "@/constants/about";

/**
 * Second paragraph with the skill cloud in the middle, then the bio paragraph. From `md` the cloud floats right
 * and the text after it, including the bio, wraps around it; it stays a plain block there, so the portrait
 * floating left in the intro wraps it too (`AboutPage` contains both floats). On mobile everything stacks.
 */
export function AboutStory() {
  const { before, after } = ABOUT_STORY;
  return (
    <div className="flex flex-col gap-6 md:block">
      <Reveal scroll>
        <Body>
          <RichText parts={before} />
        </Body>
        <SkillCloud />
        <Body className="md:mt-6">
          <RichText parts={after} />
        </Body>
      </Reveal>
      <AboutBio className="md:mt-6" />
    </div>
  );
}
