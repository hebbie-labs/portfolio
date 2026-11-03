import Image, { type StaticImageData } from "next/image";

import { cn } from "@/lib/utils";

/** Photo in a polaroid frame, the caption in its bottom strip; straightens on hover. Tilt it via `className`. */
export function Polaroid({
  src,
  alt,
  caption,
  className,
}: {
  src: StaticImageData;
  alt: string;
  caption: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "bg-fg p-2 pb-0 text-bg shadow-lg transition-transform duration-300 ease-spring hover:rotate-0 motion-reduce:transition-none",
        className,
      )}
    >
      <Image src={src} alt={alt} sizes="12rem" className="h-auto w-full" />
      <figcaption className="py-2 text-center text-sm tabular-nums">
        {caption}
      </figcaption>
    </figure>
  );
}
