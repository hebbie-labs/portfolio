export default function Footer() {
  return (
    <footer className="flex w-full flex-col gap-2.5 border-t border-line py-4 page-x font-mono text-xs text-muted md:grid md:grid-cols-3 md:items-center md:py-10 md:text-[13px]">
      <span>© 2026 Leon Hebeisen</span>
      <a
        href="mailto:contact@leonhebeisen.com"
        className="lnk w-fit md:justify-self-center"
      >
        contact@leonhebeisen.com
      </a>
      <a href="/impressum" className="lnk w-fit md:justify-self-end">
        Impressum
      </a>
    </footer>
  );
}
