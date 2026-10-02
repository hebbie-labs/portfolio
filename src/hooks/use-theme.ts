import { useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
};

/** Current theme, from `data-theme` on `<html>` (set before hydration by `THEME_INIT_SCRIPT`). */
export const useTheme = () =>
  useSyncExternalStore<"light" | "dark">(
    subscribe,
    () => (document.documentElement.dataset.theme === "light" ? "light" : "dark"),
    () => "dark",
  );
