import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetailPage } from "@/components/pages/project-detail";
import { getProject, PROJECTS } from "@/constants/projects";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => PROJECTS.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function Page({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const next = PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length];
  return <ProjectDetailPage project={project} next={next} />;
}
