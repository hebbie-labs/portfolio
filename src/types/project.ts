export type Project = {
  /** Anchor on the projects page. */
  slug: string;
  title: string;
  /** One-liner for the preview on the start page. */
  summary: string;
  /** One entry per paragraph. */
  description: readonly string[];
  /** Ruled rows below the description; scrolling one into the middle switches the screen to its `view`. */
  features?: readonly ProjectFeature[];
  /** Tech-stack table below the features: one row per area. */
  stack?: readonly ProjectStackRow[];
  /** Shown as preview on the start page. */
  featured?: boolean;
  /** Live demo. */
  url?: string;
  /** GitHub repository. */
  repo?: string;
  /** Video in `public/`, played muted and looped as the first view (the poster with reduced motion). */
  video?: string;
  /** Views on the screen, desktop and mobile; the first one is also the start page preview and the poster of `video`. Reference each by a feature; below `md` a carousel shows them and a tapped feature jumps to its view. */
  views: readonly ProjectView[];
  /** 3D scene shown instead of the views, on the start page too; the views then only name its steps (features, dots). */
  scene?: "homeserver";
};

/** One view of a project: a screenshot, or for a scene project just the name of a step. */
export type ProjectView = {
  label: string;
  /** Screenshot in `public/`. */
  image?: string;
  /** Portrait (mobile) screenshot: shown in a phone frame instead of the screen. */
  portrait?: boolean;
};

export type ProjectStackRow = { area: string; tech: string };

export type ProjectFeature = {
  text: string;
  /** `label` of the `views` entry this feature shows; without it the frame stays as it is. */
  view?: string;
};
