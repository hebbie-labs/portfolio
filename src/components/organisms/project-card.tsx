import { Reveal } from "@/components/atoms/reveal";
import { ProjectDetails } from "@/components/molecules/project-details";
import { ProjectHeading } from "@/components/molecules/project-heading";
import { ProjectMedia } from "@/components/molecules/project-media";
import { ProjectMeta } from "@/components/molecules/project-meta";
import type { Project } from "@/constants/projects";

/** Projects page entry; every part reveals on scroll. Browser: title on top, media and text side by side. Phone: tall media left, title and text stacked right. */
export function ProjectCard(project: Project) {
  const { slug, nr, category, title, description, tags, device, url, repo, image } = project;
  const heading = <ProjectHeading title={title} />;
  const media = (
    <Reveal scroll variant="scale" index={1}>
      <ProjectMedia device={device} url={url} image={image} />
    </Reveal>
  );
  const details = (
    <ProjectDetails
      slug={slug}
      description={description}
      tags={tags}
      url={url}
      repo={repo}
    />
  );

  return (
    <article id={slug} className="flex scroll-mt-24 flex-col gap-6 md:gap-8">
      <Reveal scroll variant="fade">
        <ProjectMeta nr={nr} category={category} />
      </Reveal>
      {device === "phone" ? (
        <div className="grid gap-6 md:grid-cols-[16rem_1fr] md:gap-10">
          {media}
          <div className="flex min-w-0 flex-col justify-center gap-8">
            {heading}
            {details}
          </div>
        </div>
      ) : (
        <>
          {heading}
          <div className="grid gap-6 md:grid-cols-[3fr_2fr] md:gap-10">
            {media}
            {details}
          </div>
        </>
      )}
    </article>
  );
}
