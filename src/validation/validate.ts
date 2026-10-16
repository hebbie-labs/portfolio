import { ValidationError, type AnyObjectSchema, type InferType } from "yup";

/** Returns the validated values, or the per-field messages when invalid. */
export function validate<S extends AnyObjectSchema>(
  schema: S,
  payload: unknown,
): { values: InferType<S> } | { errors: Record<string, string> } {
  try {
    return { values: schema.validateSync(payload, { abortEarly: false }) };
  } catch (error) {
    if (!(error instanceof ValidationError)) throw error;
    return {
      errors: Object.fromEntries(
        error.inner.map(({ path, message }) => [path, message]),
      ),
    };
  }
}
