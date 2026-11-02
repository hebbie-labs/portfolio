"use client";

import dynamic from "next/dynamic";

/** The hero's 3D code window; three.js is heavy, so it loads only on the client, as its own chunk. */
export const HeroScene = dynamic(
  () =>
    import("./TerminalCanvas").then(
      (m) => m.TerminalCanvas,
    ),
  { ssr: false },
);
