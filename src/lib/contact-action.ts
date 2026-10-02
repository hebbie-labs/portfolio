"use server";

import { ValidationError } from "yup";

import { CONTACT_FORM, CONTACT_MAIL } from "@/constants/contact";
import { EMAIL } from "@/constants/site";
import { contactSchema, type ContactValues } from "@/lib/contact-schema";

export type ContactResult = {
  status: "success" | "error";
  errors?: Partial<Record<keyof ContactValues | "send", string>>;
};

/** `website` is the honeypot, `t` the time the form was shown (ms). */
type Payload = Record<keyof ContactValues, unknown> & {
  website?: unknown;
  t?: unknown;
};

const MIN_FILL_MS = 3000;

/** Filled honeypot, or sent sooner after the form was shown than a person can type. */
const isBot = ({ website, t }: Payload) =>
  Boolean(website) || !(Number(t) > 0) || Date.now() - Number(t) < MIN_FILL_MS;

/** Validates, drops bots quietly, then mails the message via Resend. */
export async function sendContact(payload: Payload): Promise<ContactResult> {
  if (isBot(payload)) return { status: "success" };

  let values: ContactValues;
  try {
    values = contactSchema.validateSync(payload, { abortEarly: false });
  } catch (error) {
    if (!(error instanceof ValidationError)) throw error;
    const errors = Object.fromEntries(
      error.inner.map(({ path, message }) => [path, message]),
    );
    return { status: "error", errors };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_MAIL.from,
        to: EMAIL,
        reply_to: values.email,
        subject: CONTACT_MAIL.subject(values.name),
        text: `${values.name} <${values.email}>\n\n${values.message}`,
      }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  } catch (error) {
    console.error("contact mail failed", error);
    return { status: "error", errors: { send: CONTACT_FORM.errors.send } };
  }
  return { status: "success" };
}
