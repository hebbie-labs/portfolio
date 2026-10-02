"use client";

import { useReducedMotion } from "motion/react";

import { Screen } from "@/components/molecules/screen";
import { Iphone } from "@/components/ui/iphone";
import { PROJECT_TEXT, type Project } from "@/constants/projects";
import { cn } from "@/lib/utils";

type Props = Pick<Project, "title" | "video" | "views" | "phone"> & {
  /** Index into `views`. */
  active: number;
  onSelect: (index: number) => void;
};

/**
 * Screen showing the active desktop view (the first one plays the project's video, the poster only with
 * reduced motion) and, if there is one, a phone frame overlapping its bottom right corner. Empty until the
 * images are set. The tabs only show below `lg`,
 * where the frame does not stay in sight while the features scroll by.
 */
export function ProjectGallery({
  title,
  video,
  views,
  phone,
  active,
  onSelect,
}: Props) {
  const view = views[active] ?? views[0];
  const reducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Screen
          image={view?.image}
          video={active === 0 && !reducedMotion ? video : undefined}
          alt={PROJECT_TEXT.viewAlt(title, view?.label)}
        />
        {phone && (
          <div className="absolute right-[4%] -bottom-10 w-[22%] drop-shadow-2xl">
            <Iphone src={phone.image} alt={PROJECT_TEXT.phoneAlt(title)} />
          </div>
        )}
      </div>
      {views.length > 1 && (
        <div className="flex flex-wrap gap-x-6 gap-y-2 lg:hidden">
          {views.map(({ label }, i) => (
            <button
              key={label}
              type="button"
              aria-pressed={i === active}
              onClick={() => onSelect(i)}
              className={cn(
                "py-2 font-mono text-sm transition-colors duration-300",
                i === active ? "text-fg" : "text-muted hover:text-fg",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
