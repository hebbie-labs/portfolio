import { Reveal } from "@/components/atoms/reveal";
import { FactList } from "@/components/molecules/fact-list";
import { ProjectMedia } from "@/components/molecules/project-media";
import type { Project } from "@/constants/projects";

export function CaseStudyOverview({ facts, device, url, image }: Pick<Project, "facts" | "device" | "url" | "image">) {
  return (
    <Reveal index={1} className="flex flex-col gap-10">
      <FactList facts={facts} />
      <div className="mx-auto w-full max-w-5xl">
        <ProjectMedia device={device} url={url} image={image} />
      </div>
    </Reveal>
  );
}
