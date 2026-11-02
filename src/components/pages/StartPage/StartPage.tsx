import { Hero } from "@/components/organisms/home/Hero";
import { AboutTeaser } from "@/components/organisms/home/AboutTeaser";
import { ProjectsScroller } from "@/components/organisms/home/ProjectsScroller";

export function StartPage() {
  return (
    <>
      <Hero />
      <ProjectsScroller />
      <AboutTeaser />
    </>
  );
}
