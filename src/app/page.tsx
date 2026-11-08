'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function XeroStyleHomePage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [activeTab, setActiveTab] = useState<'pos' | 'inventory' | 'finance' | 'tax' | 'ai'>('pos')

  const featureTabs = [
    { id: 'pos', title: 'Kasir & Faktur', icon: '🛒' },
    { id: 'inventory', title: 'Inventori & Stok', icon: '📦' },
    { id: 'finance', title: 'Laporan & Kas', icon: '📊' },
    { id: 'tax', title: 'Pajak & e-Faktur', icon: '🧾' },
    { id: 'ai', title: 'Asisten AI', icon: '🤖' },
  ] as const

  return (
    <div className="min-h-screen bg-white text-[#111827] font-sans antialiased selection:bg-[#00B4D8] selection:text-white">
      {/* ─── TOP NOTIFICATION PROMO BAR ─── */}
      <aside aria-label="Pengumuman promo" className="bg-[#002B49] text-white text-xs sm:text-sm py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="bg-[#00A3C4] text-white text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
          Promo Terbatas
        </span>
        <span>
          Diskon 50% selama 3 bulan pertama untuk semua paket bisnis!
        </span>
        <Link href="/register" className="underline font-semibold hover:text-[#00B4D8] transition-colors ml-1">
          Klaim Sekarang &rarr;
        </Link>
      </aside>

      {/* ─── NAVBAR ALA XERO ─── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Navigation Links */}
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 relative">
                <Image src="/logo.jpg" alt="Naiventory Logo" fill className="object-contain" priority />
              </div>
              <span className="text-2xl font-black tracking-tight text-[#002B49]">
                Nai<span className="text-[#00A3C4]">ventory</span>
              </span>
            </Link>

            <nav aria-label="Navigasi Utama" className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-[#4B5563]">
              <a href="#fitur" className="hover:text-[#00A3C4] transition-colors">Fitur Bisnis</a>
              <a href="#harga" className="hover:text-[#00A3C4] transition-colors">Paket & Harga</a>
              <a href="#solusi" className="hover:text-[#00A3C4] transition-colors">Solusi Industri</a>
              <a href="#testimoni" className="hover:text-[#00A3C4] transition-colors">Kisah Sukses</a>
              <a href="#faq" className="hover:text-[#00A3C4] transition-colors">Bantuan / FAQ</a>
            </nav>
          </div>

          {/* Right Action CTA Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/login"
              className="text-[#002B49] hover:text-[#00A3C4] font-semibold text-sm sm:text-[15px] px-3 sm:px-4 py-2 transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="bg-[#0070BA] hover:bg-[#005B94] text-white font-bold text-sm sm:text-[15px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg shadow-[#0070BA]/20"
            >
              Coba Gratis 30 Hari
            </Link>
          </div>
        </div>
      </header>

      {/* ─── HERO SECTION ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F2F7FA] to-white pt-12 pb-20 sm:pt-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1] px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold">
                <span>⭐</span> Software Manajemen Bisnis & Keuangan #1
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#002B49] tracking-tight leading-[1.12]">
                Kelola kasir, stok, dan pembukuan dalam <span className="text-[#00A3C4]">satu sistem terpadu</span>
              </h1>

              <p className="text-lg sm:text-xl text-[#4B5563] leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Otomatiskan pencatatan transaksi kasir, pantau perputaran inventori secara real-time, dan hasilkan laporan laba rugi serta pajak yang siap pakai untuk pemilik bisnis modern.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/register"
                  className="w-full sm:w-auto text-center bg-[#0070BA] hover:bg-[#005B94] text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-200 shadow-xl shadow-[#0070BA]/25"
                >
                  Mulai Uji Coba Gratis
                </Link>
                <a
                  href="#fitur"
                  className="w-full sm:w-auto text-center border-2 border-[#D1D5DB] hover:border-[#002B49] text-[#002B49] font-bold text-base px-7 py-3.5 rounded-full transition-all duration-200"
                >
                  Jelajahi Fitur Demo &rarr;
                </a>
              </div>

              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs sm:text-sm text-[#4B5563] font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="text-[#059669] font-bold">✓</span> Coba gratis 30 hari
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#059669] font-bold">✓</span> Tanpa kartu kredit
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#059669] font-bold">✓</span> Batalkan kapan saja
                </span>
              </div>
            </div>

            {/* Right Graphic: Dashboard Mockup */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none bg-white rounded-3xl p-5 shadow-2xl border border-gray-100 ring-1 ring-black/5">
                {/* Mockup Header */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#002B49] text-white font-bold flex items-center justify-center text-xs">
                      Ni
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#002B49]">Kopi Kenangan Senja</p>
                      <p className="text-[10px] text-gray-500">Cabang Jakarta Selatan</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#059669] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" /> Aktif
                  </span>
                </div>

                {/* KPI Cards inside Mockup */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-[#F8FAFC] border border-gray-100 p-3.5 rounded-2xl">
                    <span className="text-[11px] font-medium text-gray-500">Pendapatan Hari Ini</span>
                    <p className="text-lg font-black text-[#002B49] mt-1">Rp 14.850.000</p>
                    <span className="text-[10px] font-semibold text-[#059669]">+18.4% vs kemarin</span>
                  </div>
                  <div className="bg-[#F8FAFC] border border-gray-100 p-3.5 rounded-2xl">
                    <span className="text-[11px] font-medium text-gray-500">Laba Bersih Estimasi</span>
                    <p className="text-lg font-black text-[#0070BA] mt-1">Rp 6.420.000</p>
                    <span className="text-[10px] font-semibold text-gray-500">Margin: 43.2%</span>
                  </div>
                </div>

                {/* Mini POS & Inventory preview */}
                <div className="bg-[#002B49] text-white p-4 rounded-2xl mb-3">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-semibold text-gray-300">Transaksi Kasir Terakhir</span>
                    <span className="text-[#00A3C4] font-bold">#TRX-88219</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
                      <span>2x Iced Caramel Macchiato</span>
                      <span className="font-bold">Rp 68.000</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
                      <span>1x Croissant Butter Crispy</span>
                      <span className="font-bold">Rp 32.000</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center text-xs">
                    <span className="text-gray-300">PPN 11% Terhitung</span>
                    <span className="font-bold text-[#00A3C4]">Rp 11.000</span>
                  </div>
                </div>

                {/* Floating mini badge */}
                <div className="flex items-center justify-between text-xs text-gray-600 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span>⚡</span> Stok Biji Kopi Arabika aman (48 kg)
                  </span>
                  <span className="text-[#0070BA] font-bold">Sinkron &rarr;</span>
                </div>
              </div>

              {/* Decorative Blur Backgrounds */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#00A3C4]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#0070BA]/15 rounded-full blur-3xl pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── LOGO & SOCIAL PROOF ─── */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">
            Dipercaya oleh lebih dari 5.000+ UMKM, Toko Retail, Kafe, dan Bisnis Jasa di Seluruh Indonesia
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70 grayscale hover:grayscale-0 transition-all">
            <span className="text-lg sm:text-xl font-bold text-gray-700">☕ Kopi Kenangan</span>
            <span className="text-lg sm:text-xl font-bold text-gray-700">👕 Apparel Craft</span>
            <span className="text-lg sm:text-xl font-bold text-gray-700">🍲 Resto Nusantara</span>
            <span className="text-lg sm:text-xl font-bold text-gray-700">📱 Gadget Central</span>
            <span className="text-lg sm:text-xl font-bold text-gray-700">💈 Barber Studio</span>
          </div>
        </div>
      </section>

      {/* ─── FITUR SISTEM INTERAKTIF ALA XERO ─── */}
      <section id="fitur" className="py-20 sm:py-28 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs sm:text-sm font-bold text-[#0070BA] uppercase tracking-wider mb-3">
              Fitur Lengkap & Terintegrasi
            </h2>
            <p className="text-3xl sm:text-4xl font-black text-[#002B49] tracking-tight">
              Semua alat yang dibutuhkan pemilik bisnis untuk berkembang
            </p>
            <p className="mt-4 text-base sm:text-lg text-gray-600">
              Tidak perlu lagi berpindah-pindah 5 aplikasi berbeda. Naiventory menyatukan seluruh alur kasir, gudang, dan laporan laba rugi.
            </p>
          </div>

          {/* Feature Tabs Bar */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
            {featureTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#002B49] text-white shadow-lg shadow-[#002B49]/20'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.title}</span>
              </button>
            ))}
          </div>

          {/* Tab Content Panels */}
          <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-200 shadow-xl">
            {activeTab === 'pos' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-5">
                  <span className="bg-[#E0F2FE] text-[#0369A1] font-bold text-xs px-3 py-1 rounded-full uppercase">
                    Point of Sale Modern
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#002B49]">
                    Kasir kilat, struk digital WhatsApp & cetak bluetooth
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Layani antrean pelanggan lebih cepat. Sistem kasir kami dapat dioperasikan langsung dari tablet, HP, maupun laptop dengan dukungan multi-kasir dan shift kerja kasir.
                  </p>
                  <ul className="space-y-3 text-sm text-gray-700 font-medium">
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#059669] font-bold">✓</span> Kirim struk instan lewat WhatsApp / Email tanpa buang kertas
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#059669] font-bold">✓</span> Dukungan QRIS statis & dinamis, transfer bank, kartu, dan tunai
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#059669] font-bold">✓</span> Pengaturan diskon, promo bundle, dan biaya servis restoran
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link href="/register" className="inline-flex items-center gap-2 text-[#0070BA] font-bold hover:underline">
                      Coba fitur kasir sekarang &rarr;
                    </Link>
                  </div>
                </div>

                <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-[#002B49]">Simulasi Order Kasir</span>
                    <span className="text-xs bg-[#DCFCE7] text-[#059669] font-bold px-2 py-0.5 rounded">Mode Kasir</span>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100">
                      <div>
                        <p className="font-bold text-sm text-[#002B49]">Latte Art Double Shot</p>
                        <p className="text-xs text-gray-500">Oatmilk + Extra Shot</p>
                      </div>
                      <span className="font-bold text-sm text-[#0070BA]">Rp 45.000</span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100">
                      <div>
                        <p className="font-bold text-sm text-[#002B49]">Sandwich Smoked Beef</p>
                        <p className="text-xs text-gray-500">Toasted Rye Bread</p>
                      </div>
                      <span className="font-bold text-sm text-[#0070BA]">Rp 52.000</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">Total + PPN (11%)</p>
                      <p className="text-xl font-black text-[#002B49]">Rp 107.670</p>
                    </div>
                    <button className="bg-[#0070BA] text-white font-bold text-xs px-5 py-2.5 rounded-xl">
                      Bayar Sekarang
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'inventory' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-5">
                  <span className="bg-[#FEF3C7] text-[#92400E] font-bold text-xs px-3 py-1 rounded-full uppercase">
                    Manajemen Stok & Gudang
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#002B49]">
                    Kendalikan stok barang secara otomatis di setiap penjualan
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Hilangkan selisih stok dan kebocoran barang. Stok berkurang otomatis setiap ada kasir bertransaksi, lengkap dengan notifikasi saat stok sudah mendekati batas minimum.
                  </p>
                  <ul className="space-y-3 text-sm text-gray-700 font-medium">
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#059669] font-bold">✓</span> Manajemen bahan baku (Resep / BOM - Bill of Materials)
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#059669] font-bold">✓</span> Notifikasi stok menipis otomatis ke email & dashboard
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#059669] font-bold">✓</span> Riwayat keluar masuk barang (Stock Opname terstruktur)
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link href="/register" className="inline-flex items-center gap-2 text-[#0070BA] font-bold hover:underline">
                      Kelola inventori produk &rarr;
                    </Link>
                  </div>
                </div>

                <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-[#002B49]">Status Inventori Real-Time</span>
                    <span className="text-xs text-gray-500">Live Sync</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { item: 'Biji Kopi Arabika House Blend', s: 42, min: 10, status: 'Aman', color: 'bg-emerald-50 text-emerald-700' },
                      { item: 'Susu Fresh Milk Pasteurisasi', s: 4, min: 8, status: 'Menipis', color: 'bg-amber-50 text-amber-700' },
                      { item: 'Cup 16oz Biodegradable', s: 280, min: 50, status: 'Aman', color: 'bg-emerald-50 text-emerald-700' },
                    ].map((row) => (
                      <div key={row.item} className="bg-white p-3 rounded-xl border border-gray-100 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-sm text-[#002B49]">{row.item}</p>
                          <p className="text-xs text-gray-500">Sisa: {row.s} unit · Min: {row.min}</p>
                        </div>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${row.color}`}>
                          {row.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'finance' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-5">
                  <span className="bg-[#EDE9FE] text-[#6D28D9] font-bold text-xs px-3 py-1 rounded-full uppercase">
                    Pembukuan & Laporan Finansial
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#002B49]">
                    Laporan Laba Rugi, Neraca, dan Arus Kas otomatis siap pakai
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Lupakan rumus Excel yang rumit dan rawan salah. Naiventory secara otomatis menggolongkan pemasukan, HPP (Harga Pokok Penjualan), dan pengeluaran operasional ke dalam format akuntansi standar.
                  </p>
                  <ul className="space-y-3 text-sm text-gray-700 font-medium">
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#059669] font-bold">✓</span> Laba kotor dan laba bersih dihitung otomatis per hari / bulan
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#059669] font-bold">✓</span> Pantau biaya operasional, gaji karyawan, dan sewa tempat
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#059669] font-bold">✓</span> Ekspor laporan keuangan ke format PDF & Excel untuk investor
                    </li>
                  </ul>
                </div>

                <div className="bg-[#002B49] text-white rounded-2xl p-6">
                  <span className="text-xs text-gray-400 font-medium">Ringkasan Keuangan Bulan Ini</span>
                  <p className="text-3xl font-black text-white mt-1">Rp 128.450.000</p>
                  <p className="text-xs text-[#00A3C4] mt-0.5">Total Penjualan Bersih (Revenue)</p>
                  <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-white/10 text-xs">
                    <div className="bg-white/5 p-3 rounded-xl">
                      <span className="text-gray-400">Total Beban/HPP</span>
                      <p className="text-base font-bold text-rose-400 mt-0.5">- Rp 54.200.000</p>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl">
                      <span className="text-gray-400">Laba Bersih</span>
                      <p className="text-base font-bold text-emerald-400 mt-0.5">+ Rp 74.250.000</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tax' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-5">
                  <span className="bg-[#DCFCE7] text-[#166534] font-bold text-xs px-3 py-1 rounded-full uppercase">
                    Pajak & Kepatuhan Regulasi Indonesia
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#002B49]">
                    Kalkulasi PPN 11%, PPh Final UMKM 0.5%, siap lapor
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Dirancang khusus untuk aturan perpajakan Indonesia. Buat faktur pajak dan hitung kewajiban pajak bulanan tanpa perlu menyewa konsultan pajak mahal.
                  </p>
                  <ul className="space-y-3 text-sm text-gray-700 font-medium">
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#059669] font-bold">✓</span> Perhitungan tarif PPh Final PP 23/2018 (0.5% omzet UMKM)
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#059669] font-bold">✓</span> Ekspor format data faktur pajak sesuai skema e-Faktur DJP
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#059669] font-bold">✓</span> Riwayat faktur pajak keluaran & masukan tersimpan aman
                    </li>
                  </ul>
                </div>

                <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-[#002B49]">Estimasi Setoran Pajak Masa</span>
                    <span className="text-xs bg-[#E0F2FE] text-[#0369A1] font-bold px-2 py-0.5 rounded">PPh UMKM 0.5%</span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white p-3.5 rounded-xl border border-gray-100 flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Omzet Kena Pajak</span>
                      <span className="text-sm font-bold text-[#002B49]">Rp 85.000.000</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-gray-100 flex justify-between items-center">
                      <span className="text-sm text-gray-600">Tarif Efektif</span>
                      <span className="text-sm font-bold text-[#0070BA]">0.5%</span>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex justify-between items-center">
                      <span className="text-sm font-bold text-emerald-900">Pajak yang Harus Disetor</span>
                      <span className="text-lg font-black text-emerald-700">Rp 425.000</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-5">
                  <span className="bg-[#FCE7F3] text-[#9D174D] font-bold text-xs px-3 py-1 rounded-full uppercase">
                    Kecerdasan Buatan (AI)
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#002B49]">
                    Konsultan bisnis pribadi bertenaga AI yang siap 24/7
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Tanyakan apa saja seputar bisnismu langsung ke AI Assistant: barang apa yang paling menguntungkan, perkiraan stok habis, hingga saran harga jual untuk menaikkan omzet.
                  </p>
                  <ul className="space-y-3 text-sm text-gray-700 font-medium">
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#059669] font-bold">✓</span> Prediksi hari ramai dan tren produk terlaris minggu depan
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#059669] font-bold">✓</span> Deteksi anomali pengeluaran dan pemborosan operasional
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-[#059669] font-bold">✓</span> Rekomendasi promo yang paling efektif menarik pembeli baru
                    </li>
                  </ul>
                </div>

                <div className="bg-[#002B49] text-white rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#00A3C4] font-bold">
                    <span>✨</span> Naiventory AI Assistant
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl text-xs text-gray-200">
                    <p className="font-semibold text-white">Owner:</p>
                    <p className="mt-0.5">&quot;AI, apa produk kopi paling laris minggu ini dan kapan saya harus belanja biji kopi lagi?&quot;</p>
                  </div>
                  <div className="bg-[#00A3C4]/20 border border-[#00A3C4]/40 p-3 rounded-xl text-xs text-gray-200">
                    <p className="font-bold text-[#00A3C4]">AI Advisor:</p>
                    <p className="mt-0.5">
                      &quot;Kopi Susu Gula Aren mendominasi 42% penjualan. Sisa stok biji kopi Arabika diperkirakan habis dalam 3 hari ke depan. Disarankan memesan 20kg besok pagi agar operasional akhir pekan tetap aman.&quot;
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── PRICING PACKAGES (ALA XERO SUBSCRIPTION TIERS) ─── */}
      <section id="harga" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs sm:text-sm font-bold text-[#0070BA] uppercase tracking-wider mb-3">
              Harga Transparan
            </h2>
            <p className="text-3xl sm:text-4xl font-black text-[#002B49] tracking-tight">
              Pilih paket yang pas untuk skala bisnismu
            </p>
            <p className="mt-3 text-base text-gray-600">
              Mulai gratis 30 hari. Tidak ada biaya tersembunyi.
            </p>

            {/* Toggle Monthly / Yearly */}
            <div className="mt-8 inline-flex items-center bg-gray-100 p-1.5 rounded-full border border-gray-200">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  billingCycle === 'monthly' ? 'bg-[#002B49] text-white shadow-sm' : 'text-gray-600'
                }`}
              >
                Bayar Bulanan
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                  billingCycle === 'yearly' ? 'bg-[#002B49] text-white shadow-sm' : 'text-gray-600'
                }`}
              >
                <span>Tahunan</span>
                <span className="bg-[#059669] text-white text-[10px] px-2 py-0.5 rounded-full uppercase">Hemat 20%</span>
              </button>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* TIER 1: Starter */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pemula / Mikro</span>
                <h3 className="text-2xl font-black text-[#002B49] mt-1">Starter</h3>
                <p className="text-xs text-gray-500 mt-2">Cocok untuk toko baru, booth kecil, dan perorangan.</p>
                <div className="my-6">
                  <span className="text-3xl sm:text-4xl font-black text-[#002B49]">
                    {billingCycle === 'monthly' ? 'Rp 99.000' : 'Rp 79.000'}
                  </span>
                  <span className="text-xs text-gray-500 font-medium"> / bulan</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-gray-700 font-medium border-t border-gray-100 pt-6">
                  <li className="flex items-center gap-2.5">✓ 1 Lokasi Kasir & 2 User</li>
                  <li className="flex items-center gap-2.5">✓ Hingga 300 Produk / Menu</li>
                  <li className="flex items-center gap-2.5">✓ Struk Kasir Digital WhatsApp</li>
                  <li className="flex items-center gap-2.5">✓ Laporan Penjualan Dasar</li>
                  <li className="flex items-center gap-2.5 text-gray-400">✗ Laporan Pajak DJP</li>
                  <li className="flex items-center gap-2.5 text-gray-400">✗ Asisten AI Pintar</li>
                </ul>
              </div>
              <Link
                href="/register"
                className="mt-8 block text-center bg-gray-100 hover:bg-gray-200 text-[#002B49] font-bold text-sm py-3.5 rounded-full transition-colors"
              >
                Coba Gratis 30 Hari
              </Link>
            </div>

            {/* TIER 2: Standard (Recommended ala Xero) */}
            <div className="bg-[#002B49] text-white rounded-3xl p-8 shadow-2xl relative flex flex-col justify-between ring-2 ring-[#00A3C4]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#00A3C4] text-white text-[11px] font-black uppercase px-4 py-1 rounded-full tracking-wider shadow-md">
                Paling Populer &amp; Direkomendasikan
              </div>
              <div>
                <span className="text-xs font-bold text-[#00A3C4] uppercase tracking-wider">Bisnis Berkembang</span>
                <h3 className="text-2xl font-black text-white mt-1">Standard Pro</h3>
                <p className="text-xs text-gray-300 mt-2">Untuk kafe, toko retail, dan klinik yang butuh kendali stok & pajak.</p>
                <div className="my-6">
                  <span className="text-3xl sm:text-4xl font-black text-white">
                    {billingCycle === 'monthly' ? 'Rp 199.000' : 'Rp 159.000'}
                  </span>
                  <span className="text-xs text-gray-300 font-medium"> / bulan</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-gray-200 font-medium border-t border-white/10 pt-6">
                  <li className="flex items-center gap-2.5">✓ Multi-Kasir & Pengguna Tanpa Batas</li>
                  <li className="flex items-center gap-2.5">✓ Produk & Transaksi Tanpa Batas</li>
                  <li className="flex items-center gap-2.5">✓ Manajemen Bahan Baku & Resep (BOM)</li>
                  <li className="flex items-center gap-2.5">✓ Laporan Laba Rugi & Neraca Standar PSAK</li>
                  <li className="flex items-center gap-2.5">✓ Hitung PPN 11% & PPh Final 0.5%</li>
                  <li className="flex items-center gap-2.5">✓ Asisten AI Penjualan (100 chat/bulan)</li>
                </ul>
              </div>
              <Link
                href="/register"
                className="mt-8 block text-center bg-[#00A3C4] hover:bg-[#008CA8] text-white font-bold text-sm py-3.5 rounded-full transition-all shadow-lg shadow-[#00A3C4]/30"
              >
                Pilih Standard &amp; Coba Gratis
              </Link>
            </div>

            {/* TIER 3: Enterprise / Multi-Branch */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Multi-Cabang & Franchise</span>
                <h3 className="text-2xl font-black text-[#002B49] mt-1">Enterprise</h3>
                <p className="text-xs text-gray-500 mt-2">Solusi terpusat untuk bisnis dengan banyak outlet dan gudang pusat.</p>
                <div className="my-6">
                  <span className="text-3xl sm:text-4xl font-black text-[#002B49]">
                    {billingCycle === 'monthly' ? 'Rp 399.000' : 'Rp 319.000'}
                  </span>
                  <span className="text-xs text-gray-500 font-medium"> / bulan</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-gray-700 font-medium border-t border-gray-100 pt-6">
                  <li className="flex items-center gap-2.5">✓ Kelola hingga 10 Cabang / Outlet Terpusat</li>
                  <li className="flex items-center gap-2.5">✓ Transfer Stok Antar Gudang Otomatis</li>
                  <li className="flex items-center gap-2.5">✓ Integrasi e-Faktur & Export Pajak Lengkap</li>
                  <li className="flex items-center gap-2.5">✓ AI Advisor Unlimited & Analisis Tren Bisnis</li>
                  <li className="flex items-center gap-2.5">✓ Dedicated Customer Support Prioritas</li>
                </ul>
              </div>
              <Link
                href="/register"
                className="mt-8 block text-center bg-gray-100 hover:bg-gray-200 text-[#002B49] font-bold text-sm py-3.5 rounded-full transition-colors"
              >
                Coba Gratis Enterprise
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ SECTION ─── */}
      <section id="faq" className="py-20 bg-[#F8FAFC] border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-[#002B49]">Pertanyaan yang Sering Diajukan (FAQ)</h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Punya pertanyaan seputar Naiventory? Berikut jawaban yang paling sering dicari.</p>
          </div>

          <div className="space-y-4">
            {[
              { q: 'Apakah saya perlu memasukkan kartu kredit untuk coba gratis?', a: 'Sama sekali tidak. Anda bisa mendaftar dan menggunakan seluruh fitur Naiventory secara gratis selama 30 hari tanpa komitmen pembayaran.' },
              { q: 'Apakah Naiventory bisa dibuka di HP dan Tablet Android / iPad?', a: 'Ya, Naiventory berbasis web cloud modern yang responsif. Anda bisa membukanya melalui browser Chrome, Safari, atau Edge di laptop, tablet kasir, maupun smartphone Anda kapan saja.' },
              { q: 'Bagaimana keamanan data keuangan dan transaksi bisnis saya?', a: 'Data Anda dienkripsi dengan standar keamanan tinggi di infrastruktur cloud Supabase (PostgreSQL berstandar internasional) dengan backup otomatis setiap hari.' },
              { q: 'Apakah format pajaknya sudah sesuai dengan peraturan di Indonesia?', a: 'Ya, sistem kami telah menyesuaikan kalkulasi PPN 11% dan tarif PPh Final UMKM 0.5% sesuai regulasi perpajakan yang berlaku di Indonesia.' },
            ].map((faq) => (
              <details key={faq.q} className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <summary className="flex justify-between items-center font-bold text-[#002B49] cursor-pointer text-base">
                  <span>{faq.q}</span>
                  <span className="text-[#0070BA] transition-transform group-open:rotate-180 font-black">↓</span>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOTTOM BIG CALL TO ACTION ─── */}
      <section className="bg-gradient-to-r from-[#002B49] via-[#003B64] to-[#0070BA] text-white py-16 sm:py-20 text-center px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Mulai kelola bisnis Anda lebih cerdas hari ini
          </h2>
          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Bergabunglah bersama ribuan pemilik bisnis di Indonesia yang telah menghemat waktu pembukuan dan meningkatkan omzet dengan Naiventory.
          </p>
          <div className="pt-2">
            <Link
              href="/register"
              className="inline-block bg-[#00A3C4] hover:bg-[#008CA8] text-white font-black text-base sm:text-lg px-10 py-4 rounded-full transition-all shadow-2xl hover:scale-105 transform"
            >
              Mulai Uji Coba Gratis 30 Hari &rarr;
            </Link>
          </div>
          <p className="text-xs text-gray-300">
            Pendaftaran hanya butuh 1 menit · Tanpa syarat kartu kredit
          </p>
        </div>
      </section>

      {/* ─── FOOTER RESMI ALA XERO ─── */}
      <footer className="bg-[#001D33] text-gray-400 py-14 text-xs sm:text-sm border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 relative">
                <Image src="/logo.jpg" alt="Naiventory" fill className="object-contain" />
              </div>
              <span className="text-xl font-black text-white">Naiventory</span>
            </div>
            <p className="text-gray-400 text-xs max-w-sm leading-relaxed">
              Platform manajemen bisnis terpadu: Kasir POS, manajemen inventori, pembukuan akuntansi, kalkulasi pajak Indonesia, dan asisten AI dalam satu kesatuan.
            </p>
            <p className="text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} Naiventory Indonesia. Hak Cipta Dilindungi Undang-Undang.
            </p>
          </div>

          <div>
            <p className="text-white font-bold text-xs uppercase tracking-wider mb-3">Fitur Utama</p>
            <ul className="space-y-2 text-xs">
              <li><a href="#fitur" className="hover:text-white">Kasir (POS)</a></li>
              <li><a href="#fitur" className="hover:text-white">Inventori Stok</a></li>
              <li><a href="#fitur" className="hover:text-white">Laba &amp; Rugi</a></li>
              <li><a href="#fitur" className="hover:text-white">Pajak Indonesia</a></li>
              <li><a href="#fitur" className="hover:text-white">AI Business Advisor</a></li>
            </ul>
          </div>

          <div>
            <p className="text-white font-bold text-xs uppercase tracking-wider mb-3">Solusi Bisnis</p>
            <ul className="space-y-2 text-xs">
              <li><span className="text-gray-300">Kafe &amp; Restoran</span></li>
              <li><span className="text-gray-300">Retail &amp; Butik</span></li>
              <li><span className="text-gray-300">Bisnis Jasa</span></li>
              <li><span className="text-gray-300">Grosir &amp; Distributor</span></li>
              <li><span className="text-gray-300">Waralaba (Franchise)</span></li>
            </ul>
          </div>

          <div>
            <p className="text-white font-bold text-xs uppercase tracking-wider mb-3">Perusahaan &amp; Legal</p>
            <ul className="space-y-2 text-xs">
              <li><Link href="/login" className="hover:text-white">Login Member</Link></li>
              <li><Link href="/register" className="hover:text-white">Daftar Akun Baru</Link></li>
              <li><span className="text-gray-300">Kebijakan Privasi</span></li>
              <li><span className="text-gray-300">Syarat Ketentuan</span></li>
              <li><span className="text-gray-300">Hubungi Kami</span></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}
