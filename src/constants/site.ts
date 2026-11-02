import type { SocialProfile } from "@/types/site";

export const SITE_URL = "https://leonhebeisen.com";
export const SITE_NAME = "Leon Hebeisen";
export const SITE_TITLE = "Leon Hebeisen | Lernender Applikationsentwickler";
export const SITE_DESCRIPTION =
  "Leon Hebeisen, Lernender Applikationsentwickler EFZ bei Noser Young. Portfolio mit Projekten in Spring Boot, React und TypeScript.";
export const ROLE = "Lernender Applikationsentwickler";
export const JOB_TITLE = `${ROLE} EFZ`;
export const EMPLOYER = "Noser Young";
export const EMAIL = "contact@leonhebeisen.com";
export const GITHUB_URL = "https://github.com/lelelon225";
export const LINKEDIN_URL = "https://www.linkedin.com/in/leonhebeisen";
export const EMPLOYER_URL = "https://noseryoung.ch/team-members/leon-hebeisen/";
export const THEME_COLOR = "#0a0d0b";

export const SOCIAL_PROFILES: SocialProfile[] = [
  { label: "GitHub", href: GITHUB_URL, featured: true },
  {
    label: "LinkedIn",
    href: LINKEDIN_URL,
    featured: true,
  },
  {
    label: "Noser Young",
    href: EMPLOYER_URL,
    featured: true,
  },
  { label: "Instagram", href: "https://www.instagram.com/lee0._.0oon/" },
  { label: "X", href: "https://x.com/lee0_0oon" },
  { label: "Bluesky", href: "https://bsky.app/profile/lelelon225.bsky.social" },
];

export const SOCIAL_LINKS = SOCIAL_PROFILES.map(({ href }) => href);
