import { Iphone } from "@/components/ui/iphone";
import { Safari } from "@/components/ui/safari";
import { PROJECT_TEXT, type Project } from "@/constants/projects";
import { cn } from "@/lib/utils";

type Props = Pick<Project, "title" | "url" | "views" | "phone"> & {
  /** Index into `views`. */
  active: number;
  onSelect: (index: number) => void;
};

/**
 * Browser frame showing the active desktop view and, if there is one, a phone frame overlapping its
 * bottom right corner. Frames stay empty until the images are set. The tabs only show below `lg`,
 * where the frame does not stay in sight while the features scroll by.
 */
export function ProjectGallery({
  title,
  url,
  views,
  phone,
  active,
  onSelect,
}: Props) {
  const view = views[active] ?? views[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Safari
          url={url}
          imageSrc={view?.image}
          imageAlt={PROJECT_TEXT.viewAlt(title, view?.label)}
          mode="simple"
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
