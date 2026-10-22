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
  /** Shown as preview on the start page. */
  featured?: boolean;
  /** Live demo. */
  url?: string;
  /** GitHub repository. */
  repo?: string;
  /** Video in `public/`, played muted and looped as the first view (the poster with reduced motion). */
  video?: string;
  /** Views on the screen, desktop and mobile; the first one is also the start page preview and the poster of `video`. Reference each by a feature, below `md` tabs switch them. */
  views: readonly ProjectView[];
};

/** One view of a project: a screenshot or, for projects without a UI, a diagram. */
export type ProjectView = {
  label: string;
  /** Screenshot in `public/`. */
  image?: string;
  /** Portrait (mobile) screenshot: shown in a phone frame instead of the screen. */
  portrait?: boolean;
  /** Drawn in the frame instead of a screenshot, for projects without a UI. */
  diagram?: readonly DiagramRow[];
};

/** One lane of a diagram: a label and the stations in flow order, joined by arrows. */
export type DiagramRow = { label: string; flow: readonly string[] };

export type ProjectFeature = {
  text: string;
  /** `label` of the `views` entry this feature shows; without it the frame stays as it is. */
  view?: string;
};
