/** One station of a timeline; `details` are optional bullet lines below the text. */
export type TimelineItem = {
  period: string;
  title: string;
  text: string;
  details?: readonly string[];
  /** Photo in `public/` for the portrait frame while this station is in view. */
  image?: { src: string; alt: string };
};
