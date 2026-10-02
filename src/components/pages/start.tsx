import { Hero } from "@/components/organisms/hero";
import { HomeAbout } from "@/components/organisms/home-about";
import { ContactCta } from "@/components/organisms/contact-cta";
import { ProjectScroll } from "@/components/organisms/project-scroll";

export function StartPage() {
  return (
    <>
      <Hero />
      <ProjectScroll />
      <HomeAbout />
      <div className="page-x py-16 md:py-32">
        <ContactCta />
      </div>
    </>
  );
}
