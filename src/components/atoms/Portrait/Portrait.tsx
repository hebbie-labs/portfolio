import Image, { type StaticImageData } from "next/image";

import { cn } from "@/lib/utils";

/** Portrait in its own aspect ratio (static import), grey until hovered. */
export function Portrait({
  src,
  alt,
  className,
  preload,
  sizes = "(min-width: 768px) 24rem, 16rem",
}: {
  src: StaticImageData;
  alt: string;
  className?: string;
  /** Load right away; for the portrait above the fold (LCP). */
  preload?: boolean;
  /** `sizes` of the image; the default fits the home page teaser. */
  sizes?: string;
}) {
  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden rounded-panel bg-bg-2",
        className,
      )}
      style={{ aspectRatio: `${src.width} / ${src.height}` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        preload={preload}
        sizes={sizes}
        className="object-cover grayscale transition-[filter] duration-200 group-hover:grayscale-0"
      />
    </div>
  );
}
