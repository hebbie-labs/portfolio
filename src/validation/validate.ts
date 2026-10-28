import { ValidationError, type AnyObjectSchema, type InferType } from "yup";

/** Returns the validated values, or the per-field messages when invalid; an error on the whole payload lands on `send`. */
export function validate<S extends AnyObjectSchema>(
  schema: S,
  payload: unknown,
): { values: InferType<S> } | { errors: Record<string, string> } {
  try {
    return { values: schema.validateSync(payload, { abortEarly: false }) };
  } catch (error) {
    if (!(error instanceof ValidationError)) throw error;
    const all = error.inner.length ? error.inner : [error];
    return {
      errors: Object.fromEntries(
        all.map(({ path, message }) => [path || "send", message]),
      ),
    };
  }
}
