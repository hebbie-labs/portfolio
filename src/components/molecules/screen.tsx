import Image from "next/image";

type Props = { image?: string; video?: string; alt?: string };

/** Screenshot or muted looping video in a hairline frame; stays an empty surface until one is set. */
export function Screen({ image, video, alt = "" }: Props) {
  return (
    <figure className="relative aspect-[12/7] overflow-hidden rounded-xl border border-line bg-bg-2">
      {video ? (
        <video
          className="absolute inset-0 size-full object-cover object-top"
          src={video}
          poster={image}
          autoPlay
          loop
          muted
          playsInline
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
    </figure>
  );
}
