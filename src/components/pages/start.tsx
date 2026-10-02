import { Hero } from "@/components/organisms/hero";
import { HomeAbout } from "@/components/organisms/home-about";
import { HomeContact } from "@/components/organisms/home-contact";
import { ProjectScroll } from "@/components/organisms/project-scroll";

export function StartPage() {
  return (
    <>
      <Hero />
      <ProjectScroll />
      <HomeAbout />
      <HomeContact />
    </>
  );
}
