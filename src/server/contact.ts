"use server";

import { CONTACT_FORM, CONTACT_MAIL } from "@/constants/contact";
import { EMAIL } from "@/constants/site";
import { sendMail } from "@/services/mail";
import type { ContactPayload, ContactResult } from "@/types/contact";
import { contactSchema } from "@/validation/contact";
import { validate } from "@/validation/validate";

/** Validates the payload, then mails the message. */
export async function sendContact(
  payload: ContactPayload,
): Promise<ContactResult> {
  if (payload?.website) {
    console.warn("contact honeypot hit");
    return { status: "success" };
  }
  const result = validate(contactSchema, payload);
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
