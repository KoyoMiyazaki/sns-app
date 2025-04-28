import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
