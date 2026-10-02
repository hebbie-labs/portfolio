import { Portrait } from "@/components/atoms/portrait";
import { Reveal } from "@/components/atoms/reveal";
import { AboutIntro } from "@/components/organisms/about-intro";
import { AboutLinks } from "@/components/organisms/about-links";
import { AboutStory } from "@/components/organisms/about-story";
import { PageTemplate } from "@/components/templates/page-template";
import { ABOUT_PAGE } from "@/constants/about";

/** Portrait sticks on the left while the text column scrolls; stacked on mobile. */
export function AboutPage() {
  return (
    <PageTemplate>
      <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-20">
        <Reveal variant="scale" className="max-w-xs md:sticky md:top-32 md:self-start">
          <Portrait src={ABOUT_PAGE.portrait} alt="Portrait von Leon Hebeisen" />
        </Reveal>
        <div className="flex min-w-0 flex-col gap-16 md:gap-24">
          <div className="flex flex-col gap-8">
            <AboutIntro />
            <AboutStory />
          </div>
          <AboutLinks />
        </div>
      </div>
    </PageTemplate>
  );
}
