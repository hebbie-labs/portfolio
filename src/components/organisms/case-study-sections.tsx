import { Body } from "@/components/atoms/typography";
import { CaseItem } from "@/components/molecules/case-item";
import { CaseSection } from "@/components/molecules/case-section";
import type { Project } from "@/constants/projects";

const toLearningLabel = (index: number) => String(index + 1).padStart(2, "0");

export function CaseStudySections({ background, implementation, learnings }: Pick<Project, "background" | "implementation" | "learnings">) {
  return (
    <>
      <CaseSection title="Ausgangslage">
        <Body>{background}</Body>
      </CaseSection>
      <CaseSection title="Umsetzung">
        <div className="grid gap-10 md:grid-cols-2">
          {implementation.map((item) => (
            <CaseItem key={item.label} {...item} />
          ))}
        </div>
      </CaseSection>
      <CaseSection title="Was ich gelernt habe">
        <div className="grid gap-10">
          {learnings.map((item, index) => {
            const label = toLearningLabel(index);
            return <CaseItem key={label} label={label} {...item} />;
          })}
        </div>
      </CaseSection>
    </>
  );
}
