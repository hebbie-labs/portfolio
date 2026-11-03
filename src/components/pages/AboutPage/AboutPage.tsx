import { AboutIntro } from "@/components/organisms/about/AboutIntro";
import { AboutStory } from "@/components/organisms/about/AboutStory";
import { Timeline } from "@/components/organisms/about/Timeline";
import { PageTemplate } from "@/components/templates/PageTemplate";
import { ABOUT_TIMELINE } from "@/constants/about";

/** Centered: intro and story wrapped around the large portrait, then the timeline at the same width. */
export function AboutPage() {
  return (
    <PageTemplate>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 md:gap-24">
        {/* Block, not flex: the portrait floating in the intro wraps the story too; flow-root contains the floats. */}
        <div className="space-y-8 md:flow-root">
          <AboutIntro />
          <AboutStory />
        </div>
        <Timeline {...ABOUT_TIMELINE} />
      </div>
    </PageTemplate>
  );
}
