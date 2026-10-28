import type { ContactValues } from "@/validation/contact";

export type ContactErrors = Partial<
  Record<keyof ContactValues | "send", string>
>;

export type ContactResult =
  { status: "success" } | { status: "error"; errors: ContactErrors };

/** Raw client input: the server must not trust its shape. `website` is the honeypot, filled only by bots. */
export type ContactPayload = Record<keyof ContactValues | "website", unknown>;
