export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="animate-page-in motion-reduce:animate-none">{children}</div>;
}
