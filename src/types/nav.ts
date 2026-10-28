export type NavMenuProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  /** Entry of the current route; the panel highlights it, the bar shows its label. */
  current: { href: string; label: string };
};
