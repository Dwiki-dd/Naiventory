import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Naiventory — Sistem Manajemen Bisnis Terpadu",
  description: "Aplikasi manajemen bisnis terpadu: POS, inventori, keuangan, dan AI assistant dalam satu platform.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0B0F1A]">{children}</body>
    </html>
  );
}
