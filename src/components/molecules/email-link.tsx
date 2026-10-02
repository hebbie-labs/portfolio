import { CopyEmail } from "@/components/molecules/copy-email";
import { EMAIL } from "@/constants/site";

const SIZES = {
  lg: "text-display-md font-bold font-condensed tracking-normal!",
  md: "text-2xl font-semibold md:text-3xl",
};

/** The address as a mail link in the given size, followed by its copy button (a fragment: the parent lays them out). */
export function EmailLink({ size, copyVariant }: { size: keyof typeof SIZES; copyVariant?: "default" | "outline" }) {
  return (
    <>
      <a
        href={`mailto:${EMAIL}`}
        className={`min-w-0 font-display wrap-anywhere transition-colors hover:text-accent ${SIZES[size]}`}
      >
        {EMAIL}
      </a>
      <CopyEmail variant={copyVariant} />
    </>
  );
}
