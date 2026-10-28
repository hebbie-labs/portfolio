import { useEffect, type RefObject } from "react";

/** While `open`, calls `onDismiss` on Escape or a pointer down outside `ref`. Pass a stable `onDismiss`. */
export function useDismiss(
  ref: RefObject<HTMLElement | null>,
  open: boolean,
  onDismiss: () => void,
) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onDismiss();
    const onPointerDown = (e: PointerEvent) =>
      ref.current?.contains(e.target as Node) || onDismiss();
    addEventListener("keydown", onKeyDown);
    addEventListener("pointerdown", onPointerDown);
    return () => {
      removeEventListener("keydown", onKeyDown);
      removeEventListener("pointerdown", onPointerDown);
    };
  }, [ref, open, onDismiss]);
}
