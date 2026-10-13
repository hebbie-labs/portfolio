import { Reveal } from "@/components/atoms/reveal";
import { AboutIntro } from "@/components/organisms/about-intro";
import { AboutPortrait } from "@/components/organisms/about-portrait";
import { AboutStory } from "@/components/organisms/about-story";
import { Timeline } from "@/components/organisms/timeline";
import { TimelinePhotoProvider } from "@/components/providers/timeline-photo";
import { PageTemplate } from "@/components/templates/page-template";
import { ABOUT_TIMELINE } from "@/constants/about";

/** Portrait sticks on the left while the text column scrolls (the timeline swaps its photo); stacked on mobile. */
export function AboutPage() {
  return (
    <PageTemplate>
      <TimelinePhotoProvider>
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-12 lg:gap-20">
          <Reveal
            variant="scale"
            className="max-w-xs md:sticky md:top-32 md:self-start"
          >
            <AboutPortrait />
          </Reveal>
          <div className="flex max-w-3xl min-w-0 flex-col gap-16 md:gap-24">
            <div className="flex flex-col gap-8">
              <AboutIntro />
              <AboutStory />
            </div>
            <Timeline {...ABOUT_TIMELINE} />
          </div>
        </div>
      </TimelinePhotoProvider>
    </PageTemplate>
  );
}
