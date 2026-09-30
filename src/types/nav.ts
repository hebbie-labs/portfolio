import type { NavLabel } from "@/constants/nav";

export type NavPanelProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  current: NavLabel;
};
