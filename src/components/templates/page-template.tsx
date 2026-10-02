/** Shared page body: horizontal padding, space below the nav and between sections. */
export function PageTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-16 page-x pt-nav pb-16 md:gap-24 md:pb-24">{children}</div>
  );
}
