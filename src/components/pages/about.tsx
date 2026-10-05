import { Portrait } from "@/components/atoms/portrait";
import { Reveal } from "@/components/atoms/reveal";
import { AboutIntro } from "@/components/organisms/about-intro";
import { AboutStory } from "@/components/organisms/about-story";
import { Timeline } from "@/components/organisms/timeline";
import { PageTemplate } from "@/components/templates/page-template";
import { ABOUT_PAGE, ABOUT_TIMELINE } from "@/constants/about";

/** Portrait sticks on the left while the text column scrolls; stacked on mobile. */
export function AboutPage() {
  return (
    <PageTemplate>
      <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-12 lg:gap-20">
        <Reveal
          variant="scale"
          className="max-w-xs md:sticky md:top-32 md:self-start"
        >
          <Portrait src={ABOUT_PAGE.portrait} alt={ABOUT_PAGE.portraitAlt} />
        </Reveal>
        <div className="flex max-w-3xl min-w-0 flex-col gap-16 md:gap-24">
          <div className="flex flex-col gap-8">
            <AboutIntro />
            <AboutStory />
          </div>
          <Timeline {...ABOUT_TIMELINE} />
        </div>
      </div>
    </PageTemplate>
  );
}
