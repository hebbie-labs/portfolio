export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg px-6 text-center text-fg">
      <p className="text-sm uppercase tracking-[0.3em] text-muted">
        Coming soon
      </p>
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
        Leon Hebeisen
      </h1>
      <p className="max-w-md text-muted">
        Ich bin Leon, mein Portfolio ist auf dem Weg:)
      </p>
      <div className="flex w-full max-w-sm items-center gap-4">
        <hr className="flex-1 border-line" />
        <p className="text-muted">check me out</p>
        <hr className="flex-1 border-line" />
      </div>
      <div className="flex gap-4">
        <a
          href="https://github.com/lelelon225"
          aria-label="Leon Hebeisen auf GitHub"
          className="rounded-full border border-line px-5 py-2 text-sm transition hover:border-fg"
        >
          GitHub
        </a>
        <a
          href="mailto:contact@leonhebeisen.com"
          className="rounded-full bg-accent px-5 py-2 text-sm text-accent-ink transition hover:-translate-y-0.5"
          aria-label="Leon Hebeisen auf Mail kontaktieren"
        >
          Contact
        </a>
      </div>
    </main>
  );
}
