export const SITE_URL = "https://leonhebeisen.com";
export const SITE_NAME = "Leon Hebeisen";
export const SITE_TITLE = "Leon Hebeisen – Lernender Applikationsentwickler";
export const SITE_DESCRIPTION =
  "Leon Hebeisen, Lernender Applikationsentwickler EFZ bei Noser Young. Portfolio mit Projekten in Spring Boot, React und TypeScript.";
export const JOB_TITLE = "Lernender Applikationsentwickler EFZ";
export const EMPLOYER = "Noser Young";
export const EMAIL = "contact@leonhebeisen.com";
export const GITHUB_URL = "https://github.com/lelelon225";
export const THEME_COLOR = "#0a0d0b";

/** `featured`: large row on the contact page. */
type SocialProfile = { label: string; href: string; featured?: boolean };

export const SOCIAL_PROFILES: SocialProfile[] = [
  { label: "GitHub", href: GITHUB_URL, featured: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/leonhebeisen",
    featured: true,
  },
  {
    label: "Noser Young",
    href: "https://noseryoung.ch/team-members/leon-hebeisen/",
    featured: true,
  },
  { label: "Instagram", href: "https://www.instagram.com/lelelon225/" },
  { label: "X", href: "https://x.com/lee0_0oon" },
  { label: "Bluesky", href: "https://bsky.app/profile/lelelon225.bsky.social" },
];

export const SOCIAL_LINKS = SOCIAL_PROFILES.map(({ href }) => href);
