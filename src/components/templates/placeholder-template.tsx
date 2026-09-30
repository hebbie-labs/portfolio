export function PlaceholderTemplate({ title }: { title: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg px-6 text-center text-fg">
      <h1 className="font-display text-4xl font-bold">{title}</h1>
    </div>
  );
}
