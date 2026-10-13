import { useField } from "formik";
import { CircleAlert } from "lucide-react";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  const Control = multiline ? Textarea : Input;

  return (
    <Field data-invalid={!!shownError}>
      <FieldLabel htmlFor={name} className="font-semibold">
        {label}
      </FieldLabel>
      <Control
        id={name}
        rows={multiline ? 6 : undefined}
        aria-required
        aria-invalid={!!shownError}
        aria-describedby={shownError ? errorId : undefined}
        {...field}
        {...props}
      />
      {shownError && (
        <FieldError id={errorId} className="flex items-center gap-2">
          <CircleAlert aria-hidden className="size-4 shrink-0" />
          {shownError}
        </FieldError>
      )}
    </Field>
  );
}
