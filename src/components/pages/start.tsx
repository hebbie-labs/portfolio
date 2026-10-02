import { Hero } from "@/components/organisms/hero";
import { HomeAbout } from "@/components/organisms/home-about";
import { HomeContact } from "@/components/organisms/home-contact";
import { ProjectScroll } from "@/components/organisms/project-scroll";
import { Timeline } from "@/components/organisms/timeline";
import { HOME_TIMELINE } from "@/constants/home";

export function StartPage() {
  return (
    <>
      <Hero />
      <ProjectScroll />
      <HomeAbout />
      <section className="page-x py-16 md:py-24">
        <Timeline {...HOME_TIMELINE} />
      </section>
      <HomeContact />
    </>
  );
}
