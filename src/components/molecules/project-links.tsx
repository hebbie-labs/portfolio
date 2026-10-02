import type { Project } from "@/constants/projects";

/** External links; only the ones the project has. */
export function ProjectLinks({ url, repo }: Pick<Project, "url" | "repo">) {
  return (
    <>
      {url && (
        <a href={url} target="_blank" rel="noreferrer" className="lnk">
          Live-Demo
        </a>
      )}
      {repo && (
        <a href={repo} target="_blank" rel="noreferrer" className="lnk">
          GitHub
        </a>
      )}
    </>
  );
}
