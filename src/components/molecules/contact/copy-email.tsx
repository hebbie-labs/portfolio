"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/atoms/button";
import { EMAIL_TEXT } from "@/constants/contact";
import { EMAIL } from "@/constants/site";

const ICON_SWAP_IN =
  "transition-[opacity,scale] duration-150 ease-out starting:scale-90 starting:opacity-0";

/** Copies the address; the label switches to "Kopiert" for two seconds. Does nothing if the clipboard is blocked. */
export function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button variant="outline" onClick={copy} size="lg">
      {copied ? (
        <Check aria-hidden className={ICON_SWAP_IN} />
      ) : (
        <Copy aria-hidden className={ICON_SWAP_IN} />
      )}
      {/* Both labels share one grid cell, so the button keeps the width of the longer one. */}
      <span className="grid">
        <span aria-hidden className="invisible col-start-1 row-start-1">
          {EMAIL_TEXT.copyLabel}
        </span>
        <span aria-live="polite" className="col-start-1 row-start-1">
          {copied ? EMAIL_TEXT.copiedLabel : EMAIL_TEXT.copyLabel}
        </span>
      </span>
    </Button>
  );
}
