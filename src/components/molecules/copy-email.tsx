"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EMAIL_TEXT } from "@/constants/contact";
import { EMAIL } from "@/constants/site";

const ICON_SWAP_IN =
  "transition-[opacity,scale] duration-150 ease-out starting:scale-90 starting:opacity-0";

/** Copies the address; the label switches to "Kopiert" for two seconds. Does nothing if the clipboard is blocked. */
export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button
      variant="outline"
      onClick={copy}
      className="h-13 px-6 text-base font-semibold"
    >
      {copied ? (
        <Check aria-hidden className={ICON_SWAP_IN} />
      ) : (
        <Copy aria-hidden className={ICON_SWAP_IN} />
      )}
      <span aria-live="polite">
        {copied ? EMAIL_TEXT.copiedLabel : EMAIL_TEXT.copyLabel}
      </span>
    </Button>
  );
}
