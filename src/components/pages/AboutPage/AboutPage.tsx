import { AboutIntro } from "@/components/organisms/about/AboutIntro";
import { Timeline } from "@/components/organisms/about/Timeline";
import { PageTemplate } from "@/components/templates/PageTemplate";
import { ABOUT_TIMELINE } from "@/constants/about";

/** Centered: intro and story wrapped around the large portrait, then the narrower timeline. */
export function AboutPage() {
  return (
    <PageTemplate>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 md:gap-24">
        <AboutIntro />
        <div className="mx-auto w-full max-w-3xl">
          <Timeline {...ABOUT_TIMELINE} />
        </div>
      </div>
    </PageTemplate>
  );
}
