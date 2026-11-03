import Image, { type StaticImageData } from "next/image";

import { cn } from "@/lib/utils";

/** Cut-out image (transparent PNG) with an outline in the text color, like a sticker; straightens on hover. Size and tilt via `className`. */
export function Sticker({
  src,
  alt,
  sizes,
  preload,
  className,
}: {
  src: StaticImageData;
  alt: string;
  sizes: string;
  /** Load right away; for a sticker above the fold (LCP). */
  preload?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      sizes={sizes}
      preload={preload}
      className={cn(
        "h-auto sticker-outline transition-transform duration-300 ease-spring hover:rotate-0 motion-reduce:transition-none",
        className,
      )}
    />
  );
}
