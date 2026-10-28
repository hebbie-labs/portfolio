import { useSyncExternalStore } from "react";

import { getTheme, subscribeTheme, type Theme } from "@/lib/theme";

/** Current theme (see `lib/theme.ts`); "dark" on the server. */
export const useTheme = () =>
  useSyncExternalStore<Theme>(subscribeTheme, getTheme, () => "dark");
