import Image from "next/image";

import { ViewportVideo } from "@/components/atoms/viewport-video";
import { cn } from "@/lib/utils";

type Props = {
  image?: string;
  video?: string;
  alt?: string;
  /** When it changes, the media fades in again while the frame stays. */
  fadeKey?: React.Key;
  /** Drawn instead of the media, without the frame (it may bleed past it), and kept mounted across `fadeKey` changes (e.g. a 3D scene). */
  children?: React.ReactNode;
};

/** Screenshot or muted looping video in a hairline frame. */
export function MediaFrame({
  image,
  video,
  alt = "",
  fadeKey,
  children,
}: Props) {
  return (
    <figure
      className={cn(
        "@container relative aspect-[12/7]",
        // A scene has no frame: it sits right on the page.
        !children && "overflow-hidden rounded-xl border border-line bg-bg-2",
      )}
    >
      {children ?? (
        <div
          key={fadeKey}
          className={cn(
            "absolute inset-0",
            fadeKey !== undefined &&
              "transition-opacity duration-200 ease-out starting:opacity-0",
          )}
        >
          {video ? (
            <ViewportVideo
              className="absolute inset-0 size-full object-cover object-top"
              src={video}
              poster={image}
              preload="metadata"
            />
          ) : (
            image && (
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover object-top"
              />
            )
          )}
        </div>
      )}
    </figure>
  );
}
