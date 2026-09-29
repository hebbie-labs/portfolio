import { buttonVariants } from "@/components/ui/button";
import { DividerLabel } from "@/components/molecules/divider-label";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-bg px-6 text-center text-fg">
      <p className="text-sm uppercase tracking-[0.3em] text-muted">
        Coming soon
      </p>
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
        Leon Hebeisen
      </h1>
      <p className="max-w-md text-muted">
        Ich bin Leon, mein Portfolio ist auf dem Weg:)
      </p>
      <DividerLabel>check me out</DividerLabel>
      <div className="flex gap-4">
        <a
          href="https://github.com/lelelon225"
          aria-label="Leon Hebeisen auf GitHub"
          className={cn(buttonVariants({ variant: "outline" }), "px-5 text-sm")}
        >
          GitHub
        </a>
        <a
          href="mailto:contact@leonhebeisen.com"
          className={cn(buttonVariants({ variant: "default" }), "px-5 text-sm")}
          aria-label="Leon Hebeisen auf Mail kontaktieren"
        >
          Contact
        </a>
      </div>
    </section>
  );
}
