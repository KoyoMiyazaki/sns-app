import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/header";

const fontNotoSansJP = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "MySNS",
    template: `%s | MySNS`,
  },
  description: "SNSアプリケーションです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${fontNotoSansJP.className} antialiased min-h-screen`}>
        <Header />
        <main className="flex flex-col items-center gap-4 justify-center min-h-screen pt-12">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
