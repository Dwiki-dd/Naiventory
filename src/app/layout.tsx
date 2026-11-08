import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Naiventory — Sistem Manajemen Kasir, Stok, Keuangan & Pajak Bisnis",
  description: "Kelola kasir POS, stok inventori barang, laporan laba rugi standar PSAK, pajak Indonesia (PPN & PPh UMKM), serta asisten AI bisnis dalam satu sistem terpadu.",
  keywords: ["software akuntansi", "aplikasi kasir", "pos kasir", "software stok inventori", "laporan laba rugi", "pajak umkm", "xero indonesia", "moka pos", "naiventory"],
  authors: [{ name: "Naiventory Team" }],
  metadataBase: new URL("https://naiventory.vercel.app"),
  openGraph: {
    title: "Naiventory — Platform Terpadu Kasir, Pembukuan & Pajak Bisnis",
    description: "Satu aplikasi untuk kasir POS, manajemen stok gudang, pembukuan keuangan otomatis, dan kalkulasi pajak usaha di Indonesia.",
    url: "https://naiventory.vercel.app",
    siteName: "Naiventory",
    locale: "id_ID",
    type: "website",
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#111827]">{children}</body>
    </html>
  );
}
