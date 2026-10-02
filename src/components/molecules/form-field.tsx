import { useField } from "formik";
import { CircleAlert } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  name: string;
  label: string;
  multiline?: boolean;
  type?: string;
  autoComplete?: string;
  spellCheck?: boolean;
  maxLength: number;
};

/** Formik field: visible label, input or textarea, and the error (once touched) linked via `aria-describedby`. */
export function FormField({ name, label, multiline, ...props }: Props) {
  const [field, { touched, error }] = useField(name);
  const shownError = touched ? error : undefined;
  const errorId = `${name}-error`;
  const Control = multiline ? "textarea" : "input";

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-semibold">
        {label}
      </label>
      <Control
        id={name}
        rows={multiline ? 6 : undefined}
        aria-required
        aria-invalid={!!shownError}
        aria-describedby={shownError ? errorId : undefined}
        className={cn(
          "w-full resize-y rounded-xl border bg-bg-2 px-4 py-3 text-base transition-colors hover:border-fg focus-visible:border-accent",
          shownError ? "border-danger" : "border-muted/80",
        )}
        {...field}
        {...props}
      />
      {shownError && (
        <p id={errorId} className="flex items-center gap-2 text-sm text-danger">
          <CircleAlert aria-hidden className="size-4 shrink-0" />
          {shownError}
        </p>
      )}
    </div>
  );
}
