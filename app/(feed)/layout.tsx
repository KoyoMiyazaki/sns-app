export default function FeedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="py-8">{children}</div>;
}
