import { Hero } from "@/components/organisms/home/hero";
import { AboutTeaser } from "@/components/organisms/home/about-teaser";
import { ProjectsScroller } from "@/components/organisms/home/projects-scroller";

export function StartPage() {
  return (
    <>
      <Hero />
      <ProjectsScroller />
      <AboutTeaser />
    </>
  );
}
