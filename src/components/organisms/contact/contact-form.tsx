"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Form, Formik, useFormikContext } from "formik";

import { Reveal } from "@/components/atoms/reveal";
import { Body, Headline } from "@/components/atoms/typography";
import { FormField } from "@/components/molecules/contact/form-field";
import { Button } from "@/components/atoms/button";
import { CONTACT_FORM } from "@/constants/contact";
import { PRIVACY_LINK } from "@/constants/nav";
import { sendContact } from "@/server/contact";
import { contactSchema } from "@/validation/contact";

const { fields, success } = CONTACT_FORM;

const initialValues = { name: "", email: "", message: "" };

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
  const thanks = useRef<HTMLDivElement>(null);

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
        const result = await sendContact(values);
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
          <div className="flex flex-col items-start gap-3">
            <Button
              type="submit"
              variant="default"
              disabled={isSubmitting}
              size="lg"
            >
              {isSubmitting ? CONTACT_FORM.pending : CONTACT_FORM.submit}
            </Button>
            <p className="text-sm text-muted">
              {CONTACT_FORM.privacyText}{" "}
              <Link href={PRIVACY_LINK.href} className="lnk">
                {PRIVACY_LINK.label}
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
