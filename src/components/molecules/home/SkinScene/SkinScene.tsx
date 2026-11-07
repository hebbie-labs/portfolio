"use client";

import dynamic from "next/dynamic";

/** The hero's Minecraft skin; skinview3d brings its own three.js, so it loads only on the client, as its own chunk. */
export const SkinScene = dynamic(
  () => import("./SkinCanvas").then((m) => m.SkinCanvas),
  { ssr: false },
);
