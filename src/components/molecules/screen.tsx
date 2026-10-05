import Image from "next/image";

import { ViewportVideo } from "@/components/atoms/viewport-video";
import { StackDiagram } from "@/components/molecules/stack-diagram";
import type { DiagramRow } from "@/constants/projects";

type Props = {
  image?: string;
  video?: string;
  diagram?: readonly DiagramRow[];
  alt?: string;
};

/** Screenshot, muted looping video or diagram in a hairline frame; stays an empty surface until one is set. */
export function Screen({ image, video, diagram, alt = "" }: Props) {
  return (
    <figure className="@container relative aspect-[12/7] overflow-hidden rounded-xl border border-line bg-bg-2">
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
    </figure>
  );
}
