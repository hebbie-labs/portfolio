import { PROJECT_TEXT } from "@/constants/projects";
import type { Project } from "@/types/project";

/** Tech stack as a two-column table: area and technologies. */
export function ProjectStack({
  title,
  stack,
}: Pick<Project, "title"> & Required<Pick<Project, "stack">>) {
  return (
    <table className="w-full border-b border-line text-left">
      <caption className="sr-only">{PROJECT_TEXT.stackCaption(title)}</caption>
      <thead className="font-mono text-xs text-muted md:text-[13px]">
        <tr>
          <th scope="col" className="py-3 pr-6 font-normal">
            {PROJECT_TEXT.stackArea}
          </th>
          <th scope="col" className="py-3 font-normal">
            {PROJECT_TEXT.stackTech}
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-line border-t border-line">
        {stack.map(({ area, tech }) => (
          <tr key={area}>
            <th
              scope="row"
              className="py-3 pr-6 align-top font-normal text-muted"
            >
              {area}
            </th>
            <td className="py-3">{tech}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
