export default function Footer() {
  return (
    <footer className="flex flex-col gap-2.5 border-t border-line px-4 pt-5 pb-8 font-mono text-xs text-muted md:flex-row md:items-center md:justify-between md:px-20 md:py-7 md:text-[13px]">
      <span>© 2026 Leon Hebeisen</span>
      <a href="mailto:contact@leonhebeisen.com" className="lnk w-fit">
        contact@leonhebeisen.com
      </a>
      <a href="/impressum" className="lnk w-fit">
        Impressum
      </a>
    </footer>
  );
}
