export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex flex-col items-center gap-4 justify-center min-h-screen">
      {children}
    </main>
  );
}
