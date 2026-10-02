import { PROJECT_TEXT, type Project } from "@/constants/projects";

/** External links; only the ones the project has. */
export function ProjectLinks({ url, repo }: Pick<Project, "url" | "repo">) {
  return (
    <>
      {url && (
        <a href={url} target="_blank" rel="noreferrer" className="lnk">
          {PROJECT_TEXT.demoLabel}
        </a>
      )}
      {repo && (
        <a href={repo} target="_blank" rel="noreferrer" className="lnk">
          {PROJECT_TEXT.repoLabel}
        </a>
      )}
    </>
  );
}
