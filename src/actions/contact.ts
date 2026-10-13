"use server";

import { ValidationError } from "yup";

import { CONTACT_FORM, CONTACT_MAIL } from "@/constants/contact";
import { EMAIL } from "@/constants/site";
import { sendMail } from "@/services/mail";
import { contactSchema, type ContactValues } from "@/schemas/contact";

export type ContactErrors = Partial<
  Record<keyof ContactValues | "send", string>
>;

export type ContactResult =
  { status: "success" } | { status: "error"; errors: ContactErrors };

/** Raw client input: the server must not trust its shape. */
type ContactPayload = Record<keyof ContactValues, unknown>;

/** Returns the validated values, or the per-field messages when invalid. */
function validate(
  payload: ContactPayload,
): { values: ContactValues } | { errors: ContactErrors } {
  try {
    return {
      values: contactSchema.validateSync(payload, { abortEarly: false }),
    };
  } catch (error) {
    if (!(error instanceof ValidationError)) throw error;
    return {
      errors: Object.fromEntries(
        error.inner.map(({ path, message }) => [path, message]),
      ),
    };
  }
}

/** Validates the payload, then mails the message. */
export async function sendContact(
  payload: ContactPayload,
): Promise<ContactResult> {
  const result = validate(payload);
  if ("errors" in result) return { status: "error", errors: result.errors };

  try {
    const { name, email, message } = result.values;
    await sendMail({
      from: CONTACT_MAIL.from,
      to: EMAIL,
      replyTo: email,
      subject: CONTACT_MAIL.subject(name),
      text: `${name} <${email}>\n\n${message}`,
    });
  } catch (error) {
    console.error("contact mail failed", error);
    return { status: "error", errors: { send: CONTACT_FORM.errors.send } };
  }
  return { status: "success" };
}
