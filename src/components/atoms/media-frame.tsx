import Image from "next/image";

import { ViewportVideo } from "@/components/atoms/viewport-video";
import { StackDiagram } from "@/components/atoms/stack-diagram";
import type { DiagramRow } from "@/types/project";
import { cn } from "@/lib/utils";

type Props = {
  image?: string;
  video?: string;
  diagram?: readonly DiagramRow[];
  alt?: string;
  /** When it changes, the media fades in again while the frame stays. */
  fadeKey?: React.Key;
  /** Drawn instead of the media, without the frame, and kept mounted across `fadeKey` changes (e.g. a 3D scene). */
  children?: React.ReactNode;
};

/** Screenshot, muted looping video or diagram in a hairline frame; stays an empty surface until one is set. */
export function MediaFrame({
  image,
  video,
  diagram,
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
      {children ? (
        // Bleeds past the frame, so the scene gets more room; it has no edge to show.
        <div className="pointer-events-none absolute -inset-x-[6%] -top-[14%] -bottom-[26%]">
          {children}
        </div>
      ) : (
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
          ) : diagram ? (
            <StackDiagram rows={diagram} />
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
