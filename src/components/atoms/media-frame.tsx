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
};

/** Screenshot, muted looping video or diagram in a hairline frame. */
export function MediaFrame({
  image,
  video,
  diagram,
  alt = "",
  fadeKey,
}: Props) {
  return (
    <figure className="@container relative aspect-[12/7] overflow-hidden rounded-xl border border-line bg-bg-2">
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
    </figure>
  );
}
