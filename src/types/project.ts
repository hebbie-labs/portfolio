export type Project = {
  /** Route of the detail page (`/projekte/<slug>`). */
  slug: string;
  title: string;
  /** One-liner for the previews (start page, projects index) and the detail page's search description. */
  summary: string;
  /** One entry per paragraph. */
  description: readonly string[];
  /** Stops of the tour on the detail page: scrolling moves from one to the next, text and arrow pointing at each. */
  features?: readonly ProjectFeature[];
  /** Shown as preview on the start page. */
  featured?: boolean;
  /** Live demo. */
  url?: string;
  /** GitHub repository. */
  repo?: string;
  /** Muted looping preview in the projects index; it morphs into the tour when the row is opened. */
  preview: ProjectPreview & {
    /** Recording for the light theme; without it `video` plays in both. */
    light?: ProjectPreview;
  };
  /** Views shown by the tour, desktop and mobile; the first one is also the start page preview. */
  views: readonly ProjectView[];
  /** 3D scene shown instead of the views, on the start page too; the views then only name its steps. */
  scene?: "homeserver";
};

export type ProjectPreview = {
  /** Video in `public/`. */
  video: string;
  /** Poster in `public/`, shown with reduced motion and until the video plays. */
  poster: string;
};

/** One view of a project: a screenshot, or for a scene project just the name of a step. */
export type ProjectView = {
  label: string;
  /** Screenshot in `public/`. */
  image?: string;
  /** Portrait (mobile) screenshot: shown whole, centered in the frame. */
  portrait?: boolean;
};

export type ProjectFeature = {
  text: string;
  /** `label` of the `views` entry this stop shows. */
  view: string;
  /** Spot the arrow points at, in % of the screenshot (on mobile a dot marks it). */
  target?: { x: number; y: number };
  /** Center of the text in % of the stage; without it on the side away from the target (needed for a scene). */
  caption?: { x: number; y: number };
};
