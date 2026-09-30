"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NotFoundPage() {
  const pathname = usePathname();

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-9xl font-bold text-muted/30">404</p>
      <h1 className="text-3xl font-bold">Seite nicht gefunden</h1>
      <p className="text-muted">
        <code className="rounded bg-bg-2 px-2 py-1 text-sm break-all">
          {pathname}
        </code>{" "}
        existiert nicht.
      </p>
      <Link href="/" className="group flex flex-row items-center lnk">
        <ArrowLeft className="size-0 -translate-x-2 opacity-0 transition-all duration-400 group-hover:mr-1 group-hover:size-4.5 group-hover:translate-x-0 group-hover:opacity-100" />
        Zurück zur Startseite
      </Link>
    </main>
  );
}
