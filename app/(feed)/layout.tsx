export default function FeedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main className="flex flex-col items-center py-8">{children}</main>;
}
