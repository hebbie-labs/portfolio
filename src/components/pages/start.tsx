import { Hero } from "@/components/organisms/home/hero";
import { AboutTeaser } from "@/components/organisms/home/about-teaser";
import { ContactTeaser } from "@/components/organisms/home/contact-teaser";
import { ProjectsScroller } from "@/components/organisms/home/projects-scroller";

export function StartPage() {
  return (
    <>
      <Hero />
      <ProjectsScroller />
      <AboutTeaser />
      <div className="page-x py-16 md:py-32">
        <ContactTeaser />
      </div>
    </>
  );
}
