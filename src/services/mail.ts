const RESEND_URL = "https://api.resend.com/emails";

type Mail = {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
};

/** Sends a plain-text mail via Resend; throws if the API rejects it. */
export async function sendMail({ replyTo, ...mail }: Mail) {
  const res = await fetch(RESEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...mail, reply_to: replyTo }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}
