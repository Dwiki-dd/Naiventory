'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const slides = [
  {
    id: 0,
    title: 'Kelola bisnis dari mana saja',
    desc: 'Pantau inventori, penjualan, dan keuangan bisnis kamu kapan saja dan di mana saja.',
    screen: (
      <div className="bg-white rounded-xl overflow-hidden h-full flex flex-col">
        <div className="bg-[#0B1340] px-3 py-2 flex items-center justify-between">
          <span className="text-white text-[10px] font-semibold">Naiventory</span>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          </div>
        </div>
        <div className="flex-1 p-3 bg-[#F0F2F5]">
          <p className="text-[8px] font-bold text-[#111827] mb-2">📦 Stok Produk</p>
          {[
            { name: 'Kopi Susu', stock: 42, color: '#3B82F6' },
            { name: 'Matcha Latte', stock: 18, color: '#22C55E' },
            { name: 'Es Teh Manis', stock: 55, color: '#6366F1' },
          ].map((item) => (
            <div key={item.name} className="bg-white rounded-lg p-2 mb-1.5 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                <span className="text-[8px] text-[#111827] font-medium">{item.name}</span>
              </div>
              <span className="text-[8px] font-bold text-[#111827]">{item.stock}</span>
            </div>
          ))}
          <div className="bg-white rounded-lg p-2 mt-2">
            <p className="text-[7px] text-[#6B7280]">Total Produk</p>
            <p className="text-[11px] font-bold text-[#111827]">115 item</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 1,
    title: 'Kasir modern & cepat',
    desc: 'Proses transaksi penjualan dengan mudah dan cetak struk digital langsung dari HP.',
    screen: (
      <div className="bg-white rounded-xl overflow-hidden h-full flex flex-col">
        <div className="bg-[#0B1340] px-3 py-2 flex items-center justify-between">
          <span className="text-white text-[10px] font-semibold">← Kasir</span>
          <span className="text-white text-[10px]">⋯</span>
        </div>
        <div className="flex-1 p-3 bg-[#F0F2F5]">
          <p className="text-[8px] font-bold text-[#111827] mb-2">🛒 Transaksi Baru</p>
          {[
            { name: 'Kopi Susu', qty: 2, price: 'Rp 30.000' },
            { name: 'Matcha Latte', qty: 1, price: 'Rp 28.000' },
          ].map((item) => (
            <div key={item.name} className="bg-white rounded-lg p-2 mb-1.5 flex items-center justify-between">
              <div>
                <p className="text-[8px] font-medium text-[#111827]">{item.name}</p>
                <p className="text-[7px] text-[#6B7280]">x{item.qty}</p>
              </div>
              <span className="text-[8px] font-bold text-[#3B82F6]">{item.price}</span>
            </div>
          ))}
          <div className="bg-[#0B1340] rounded-lg p-2 mt-2 flex items-center justify-between">
            <div>
              <p className="text-[7px] text-white/70">Total Bayar</p>
              <p className="text-[11px] font-bold text-white">Rp 88.000</p>
            </div>
            <div className="bg-[#3B82F6] rounded-lg px-2 py-1">
              <p className="text-[8px] font-bold text-white">Bayar</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: 'Laporan keuangan real-time',
    desc: 'Pantau laba rugi, pemasukan, dan pengeluaran bisnis kamu secara real-time.',
    screen: (
      <div className="bg-white rounded-xl overflow-hidden h-full flex flex-col">
        <div className="bg-[#0B1340] px-3 py-2 flex items-center justify-between">
          <span className="text-white text-[10px] font-semibold">Laporan</span>
          <span className="text-[8px] text-white/70">Nov 2024</span>
        </div>
        <div className="flex-1 p-3 bg-[#F0F2F5]">
          <div className="bg-white rounded-lg p-2 mb-2">
            <p className="text-[7px] text-[#6B7280]">Total Pemasukan</p>
            <p className="text-[13px] font-bold text-[#22C55E]">Rp 15,2 Jt</p>
          </div>
          <div className="flex gap-1.5 mb-2">
            <div className="flex-1 bg-white rounded-lg p-2">
              <p className="text-[6px] text-[#6B7280]">Pengeluaran</p>
              <p className="text-[9px] font-bold text-[#EF4444]">Rp 6,8Jt</p>
            </div>
            <div className="flex-1 bg-white rounded-lg p-2">
              <p className="text-[6px] text-[#6B7280]">Laba Bersih</p>
              <p className="text-[9px] font-bold text-[#3B82F6]">Rp 8,4Jt</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-2">
            <p className="text-[7px] text-[#6B7280] mb-1.5">Trend Penjualan</p>
            <div className="flex items-end gap-1 h-8">
              {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
                <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: '#3B82F6', opacity: 0.6 + i * 0.06 }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
]

const features = [
  { icon: '📦', text: 'Kelola inventori stok produk real-time' },
  { icon: '🛒', text: 'Kasir modern dengan struk digital' },
  { icon: '📊', text: 'Laporan keuangan & laba rugi otomatis' },
  { icon: '🧾', text: 'Manajemen pajak & invoice terintegrasi' },
  { icon: '🤖', text: 'Asisten AI untuk analisis bisnis' },
  { icon: '👥', text: 'Manajemen tim & akses multi-pengguna' },
]

export default function WelcomePage() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#0B1340]">

      {/* ═══ NAVBAR ═══ */}
      <nav className="flex items-center justify-between px-6 md:px-16 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 relative">
            <Image src="/logo.jpg" alt="Naiventory" fill className="object-contain" priority />
          </div>
          <span className="text-white text-xl font-bold tracking-wide">
            Nai<span className="text-[#3B82F6]">ventory</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <button className="hidden md:block text-white/80 hover:text-white font-medium text-sm transition-colors px-4 py-2">
              Masuk
            </button>
          </Link>
          <Link href="/register">
            <button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-200">
              Buat Akun Gratis
            </button>
          </Link>
        </div>
      </nav>

      {/* ═══ DESKTOP HERO (md dan lebih besar) ═══ */}
      <div className="hidden md:flex min-h-[calc(100vh-73px)] items-center px-16 gap-16 max-w-7xl mx-auto">

        {/* LEFT: Text content */}
        <div className="flex-1 space-y-8">
          <div>
            <span className="inline-block bg-[#2563EB]/20 text-[#60A5FA] text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-[#2563EB]/30">
              🚀 Platform Manajemen Bisnis #1 Indonesia
            </span>
            <h1 className="text-5xl font-black text-white leading-tight">
              Semua yang kamu<br />
              butuhkan untuk<br />
              <span className="text-[#3B82F6]">kelola bisnis</span>
            </h1>
            <p className="mt-5 text-[#94A3B8] text-lg leading-relaxed max-w-lg">
              Naiventory menggabungkan kasir, inventori, keuangan, pajak, dan AI dalam satu platform. Cocok untuk semua jenis bisnis.
            </p>
          </div>

          {/* Features list */}
          <div className="grid grid-cols-2 gap-3">
            {features.map((f) => (
              <div key={f.text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#2563EB]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-base">{f.icon}</span>
                </div>
                <span className="text-[#CBD5E1] text-sm">{f.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <Link href="/register">
              <button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-base px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-[#2563EB]/30">
                Mulai Gratis Sekarang
              </button>
            </Link>
            <Link href="/login">
              <button className="text-[#94A3B8] hover:text-white font-semibold text-base px-6 py-4 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-200">
                Sudah punya akun? Masuk →
              </button>
            </Link>
          </div>

          <p className="text-[#64748B] text-sm">
            ✓ Gratis selamanya &nbsp;·&nbsp; ✓ Tanpa kartu kredit &nbsp;·&nbsp; ✓ Setup dalam 2 menit
          </p>
        </div>

        {/* RIGHT: Phone mockup carousel */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-[#2563EB]/10 blur-3xl rounded-full scale-75" />

          {/* Phone */}
          <div className="relative z-10 w-64 h-[460px]">
            <div className="w-full h-full bg-[#1a1a2e] rounded-[2.5rem] border-4 border-[#2d2d4e] shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#1a1a2e] rounded-b-2xl z-10" />
              <div className="absolute inset-1 rounded-[2rem] overflow-hidden bg-[#F0F2F5]">
                {slides[current].screen}
              </div>
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-40 h-6 bg-black/20 blur-xl rounded-full" />
          </div>

          {/* Floating stats cards */}
          <div className="absolute left-0 top-20 bg-white rounded-2xl shadow-xl px-4 py-3 z-20">
            <p className="text-[#6B7280] text-xs">Penjualan Hari Ini</p>
            <p className="text-[#111827] font-bold text-lg">Rp 4,2 Jt</p>
            <p className="text-[#22C55E] text-xs font-medium">↑ 12% dari kemarin</p>
          </div>
          <div className="absolute right-0 bottom-24 bg-white rounded-2xl shadow-xl px-4 py-3 z-20">
            <p className="text-[#6B7280] text-xs">Stok Tersedia</p>
            <p className="text-[#111827] font-bold text-lg">234 item</p>
            <p className="text-[#3B82F6] text-xs font-medium">3 hampir habis ⚠️</p>
          </div>

          {/* Slide dots */}
          <div className="flex gap-2 mt-8 relative z-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === current ? 24 : 8,
                  height: 8,
                  background: i === current ? '#2563EB' : '#334155',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ═══ MOBILE VIEW (di bawah md) ═══ */}
      <div className="md:hidden flex flex-col min-h-[calc(100vh-65px)]">
        {/* Top dark section */}
        <div className="bg-[#0B1340] relative flex flex-col items-center pt-8 pb-0 overflow-hidden" style={{ flex: '0 0 60%' }}>
          <div className="absolute top-6 left-6 w-16 h-16 rounded-full bg-[#8B5CF6]/20 blur-xl" />
          <div className="absolute top-10 right-8 w-12 h-12 rounded-full bg-[#06B6D4]/20 blur-xl" />

          <div className="relative z-10 w-48 h-72 mx-auto">
            <div className="w-full h-full bg-[#1a1a2e] rounded-[2rem] border-4 border-[#2d2d4e] shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#1a1a2e] rounded-b-2xl z-10" />
              <div className="absolute inset-1 rounded-[1.5rem] overflow-hidden bg-[#F0F2F5]">
                {slides[current].screen}
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/30 blur-lg rounded-full" />
          </div>
        </div>

        {/* Bottom white section */}
        <div className="bg-white flex-1 px-6 pt-6 pb-8 flex flex-col">
          <div className="flex justify-center gap-2 mb-5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === current ? 24 : 8,
                  height: 8,
                  background: i === current ? '#2563EB' : '#D1D5DB',
                }}
              />
            ))}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-black text-[#111827] leading-tight mb-2">
              {slides[current].title}
            </h2>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              {slides[current].desc}
            </p>
          </div>
          <div className="mt-6 space-y-3">
            <Link href="/register">
              <button className="w-full py-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-2xl font-bold text-base transition-all duration-200 shadow-lg shadow-[#2563EB]/30">
                Buat Akun
              </button>
            </Link>
            <Link href="/login">
              <button className="w-full py-3 text-[#2563EB] hover:text-[#1D4ED8] font-semibold text-base transition-colors">
                Masuk
              </button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
