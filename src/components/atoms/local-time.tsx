"use client";

import { useSyncExternalStore } from "react";

const format = () =>
  new Date().toLocaleTimeString("de-CH", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Zurich",
  });

const subscribe = (onChange: () => void) => {
  const id = setInterval(onChange, 10_000);
  return () => clearInterval(id);
};

/** Current time in Bern; a placeholder on the server so the static page never freezes a build-time value. */
export function LocalTime() {
  return <>{useSyncExternalStore(subscribe, format, () => "--:--")}</>;
}
