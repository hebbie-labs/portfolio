import { Label } from "@/components/atoms/Typography";
import { SOCIAL_PROFILES } from "@/constants/site";

const others = SOCIAL_PROFILES.filter((profile) => profile);

/** Main profiles as ruled rows, the rest as small links beneath. */
export function ContactLinks() {
  return (
    <Label className="flex flex-wrap justify-center gap-x-6 gap-y-1">
      {others.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="relative inline-block min-w-6 lnk text-center after:absolute after:-inset-x-1 after:-inset-y-2 after:content-['']"
        >
          {label}
        </a>
      ))}
    </Label>
  );
}
