"use client";

import { useReducedMotion } from "motion/react";

import { Screen } from "@/components/molecules/screen";
import { Iphone } from "@/components/ui/iphone";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PROJECT_TEXT, type Project } from "@/constants/projects";

type Props = Pick<Project, "title" | "video" | "views"> & {
  /** Index into `views`. */
  active: number;
  onSelect: (index: number) => void;
};

/**
 * Screen showing the active view (the first one plays the project's video, the poster only with
 * reduced motion); a portrait view sits in a phone frame without a surrounding frame. Empty until the images are set. The tabs only show below `lg`,
 * where the frame does not stay in sight while the features scroll by.
 */
export function ProjectGallery({
  title,
  video,
  views,
  active,
  onSelect,
}: Props) {
  const view = views[active] ?? views[0];
  const reducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col gap-4">
      <div
        key={active}
        className="transition-opacity duration-200 ease-out starting:opacity-0"
      >
        {view?.portrait ? (
          <div className="flex aspect-[12/7] justify-center">
            <div className="aspect-[433/882] h-full">
              <Iphone
                src={view.image}
                alt={PROJECT_TEXT.viewAlt(title, view.label)}
              />
            </div>
          </div>
        ) : (
          <Screen
            image={view?.image}
            diagram={view?.diagram}
            video={active === 0 && !reducedMotion ? video : undefined}
            alt={PROJECT_TEXT.viewAlt(title, view?.label)}
          />
        )}
      </div>
      {views.length > 1 && (
        <Tabs
          value={active}
          onValueChange={(index) => onSelect(Number(index))}
          className="lg:hidden"
        >
          <TabsList
            variant="line"
            className="h-auto w-full flex-wrap justify-start gap-x-6 gap-y-2 p-0"
          >
            {views.map(({ label }, i) => (
              <TabsTrigger
                key={label}
                value={i}
                className="h-auto flex-none rounded-none border-0 p-0 py-2 font-mono text-sm text-muted transition-colors duration-300 after:hidden hover:text-fg data-active:text-fg"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}
    </div>
  );
}
