"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Field, Form, Formik, useFormikContext } from "formik";

import { Reveal } from "@/components/atoms/reveal";
import { Body, Headline } from "@/components/atoms/typography";
import { FormField } from "@/components/molecules/form-field";
import { Button } from "@/components/ui/button";
import { CONTACT_FORM } from "@/constants/contact";
import { sendContact } from "@/lib/contact-action";
import { contactSchema } from "@/lib/contact-schema";

const { fields, success } = CONTACT_FORM;

/** `website` is the honeypot: hidden from people, filled by bots. */
const initialValues = { name: "", email: "", message: "", website: "" };

/** Moves focus to the first invalid field after a submit attempt. */
function FocusFirstError() {
  const { submitCount, isValid } = useFormikContext();
  useEffect(() => {
    if (submitCount && !isValid)
      document
        .querySelector<HTMLElement>('form [aria-invalid="true"]')
        ?.focus();
  }, [submitCount, isValid]);
  return null;
}

/** Contact form (Formik + Yup); swaps for a thank-you message (and moves focus there) once sent. */
export function ContactForm() {
  const [sent, setSent] = useState(false);
  const shownAt = useRef(0); // the action drops submits that come too fast after the form was shown
  const thanks = useRef<HTMLDivElement>(null);

  useEffect(() => {
    shownAt.current = Date.now();
  }, []);
  useEffect(() => {
    if (sent) thanks.current?.focus();
  }, [sent]);

  if (sent) {
    return (
      <div
        ref={thanks}
        tabIndex={-1}
        className="flex flex-col gap-3 outline-none"
      >
        <Reveal>
          <Headline>{success.title}</Headline>
        </Reveal>
        <Reveal index={1}>
          <Body muted>{success.text}</Body>
        </Reveal>
      </div>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={contactSchema}
      onSubmit={async (values, { setErrors, setStatus }) => {
        const result = await sendContact({ ...values, t: shownAt.current });
        if (result.status === "success") return setSent(true);
        const { send, ...fieldErrors } = result.errors ?? {};
        setErrors(fieldErrors);
        setStatus(send);
      }}
    >
      {({ isSubmitting, status }) => (
        <Form noValidate className="flex flex-col gap-6">
          <FocusFirstError />
          {Object.entries(fields).map(([name, props]) => (
            <FormField key={name} name={name} {...props} />
          ))}
          <Field
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="absolute -left-[9999px]"
          />
          <div className="flex flex-col items-start gap-3">
            <Button
              type="submit"
              variant="default"
              disabled={isSubmitting}
              className="h-13 px-6 text-base font-semibold"
            >
              {isSubmitting ? CONTACT_FORM.pending : CONTACT_FORM.submit}
            </Button>
            <p className="text-sm text-muted">
              {CONTACT_FORM.privacy.text}{" "}
              <Link href="/datenschutz" className="lnk">
                {CONTACT_FORM.privacy.linkLabel}
              </Link>
            </p>
            {status && (
              <p role="alert" className="text-sm text-danger">
                {status}
              </p>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}
