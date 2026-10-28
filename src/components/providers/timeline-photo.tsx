"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type TimelinePhotoState = {
  /** Photo the timeline wants in the portrait frame; `null` = the portrait itself. */
  photo: string | null;
  setPhoto: (photo: string | null) => void;
};

const TimelinePhotoContext = createContext<TimelinePhotoState>({
  photo: null,
  setPhoto: () => {},
});

/** Lets the timeline (right) swap the photo in the sticky portrait frame (left) while scrolling. */
export function TimelinePhotoProvider({ children }: { children: ReactNode }) {
  const [photo, setPhoto] = useState<string | null>(null);
  return (
    <TimelinePhotoContext value={{ photo, setPhoto }}>
      {children}
    </TimelinePhotoContext>
  );
}

export const useTimelinePhoto = () => useContext(TimelinePhotoContext);
