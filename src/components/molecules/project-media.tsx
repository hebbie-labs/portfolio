import { Iphone } from "@/components/ui/iphone";
import { Safari } from "@/components/ui/safari";
import type { Project } from "@/constants/projects";

type Props = Pick<Project, "device" | "url" | "image">;

/** Device frame around a screenshot (in `public/`); empty frame until `image` is set. */
export function ProjectMedia({ device = "browser", url, image }: Props) {
  if (device === "phone") return <Iphone src={image} className="mx-auto w-full max-w-64" />;
  return <Safari url={url} imageSrc={image} mode="simple" />;
}
