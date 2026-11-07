import { useEffect, useEffectEvent } from "react";

type WindowEvent<K extends string> = K extends keyof WindowEventMap
  ? WindowEventMap[K]
  : Event;

/**
 * Listens to `type` on `window` (passive) while `enabled`. Always calls the latest `handler`, so it needn't be stable.
 * Custom event names get a plain `Event`.
 */
export function useWindowEvent<K extends string>(
  type: K,
  handler: (e: WindowEvent<K>) => void,
  enabled = true,
) {
  const onEvent = useEffectEvent(handler);

  useEffect(() => {
    if (!enabled) return;
    const listener = (e: Event) => onEvent(e as WindowEvent<K>);
    addEventListener(type, listener, { passive: true });
    return () => removeEventListener(type, listener);
  }, [type, enabled]);
}
