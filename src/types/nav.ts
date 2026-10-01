import type { NavLabel, OutsideNavLabel } from "@/constants/nav";

export type NavPanelProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  current: NavLabel | OutsideNavLabel;
};
