import type { StaticImageData } from "next/image";

/** One station of a timeline; `details` are optional bullet lines below the text. */
export type TimelineItem = {
  period: string;
  title: string;
  text: string;
  details?: readonly string[];
  /** Photo (static import, so the polaroid keeps its aspect ratio) beside the station. */
  image?: { src: StaticImageData; alt: string };
};

/** The Lehre for the progress bar above the timeline; `start`/`end` as ISO dates, one label per year. */
export type Apprenticeship = {
  title: string;
  start: string;
  end: string;
  years: readonly string[];
};
