export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="py-8">{children}</div>;
}
