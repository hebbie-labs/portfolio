import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectPage } from "@/components/pages/ProjectPage";
import { getProject, PROJECTS } from "@/constants/projects";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata(
    { title: project.title, description: project.summary },
    `/projekte/${slug}`,
  );
}

export default async function Page({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return <ProjectPage project={project} />;
}
