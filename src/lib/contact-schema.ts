import { object, string, type InferType } from "yup";

import { CONTACT_FORM } from "@/constants/contact";

const { errors, fields } = CONTACT_FORM;

/** Shared by the form (Formik) and the server action, which must not trust the client. */
export const contactSchema = object({
  name: string().trim().max(fields.name.maxLength).required(errors.name),
  email: string()
    .trim()
    .max(fields.email.maxLength)
    .email(errors.email)
    .required(errors.email),
  message: string()
    .trim()
    .max(fields.message.maxLength)
    .required(errors.message),
});

export type ContactValues = InferType<typeof contactSchema>;
