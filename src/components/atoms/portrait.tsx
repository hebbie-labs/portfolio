import Image from "next/image";

import { Label } from "@/components/atoms/typography";
import { cn } from "@/lib/utils";

/** Portrait (in `public/`); empty frame until `src` is set. Grey until hovered. */
export function Portrait({ src, alt, className }: { src?: string; alt: string; className?: string }) {
  return (
    <div className={cn("group relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-bg-2", className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 20rem, 10rem"
          className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
        />
      ) : (
        <Label className="absolute inset-0 grid place-items-center">[Foto]</Label>
      )}
    </div>
  );
}
