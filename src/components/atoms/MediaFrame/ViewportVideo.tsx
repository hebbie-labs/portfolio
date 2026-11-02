"use client";

import { useEffect, useRef } from "react";

type Props = Omit<React.ComponentProps<"video">, "ref" | "autoPlay">;

/** Muted looping video that only plays while it is on screen. */
export function ViewportVideo(props: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return <video ref={ref} loop muted playsInline {...props} />;
}
