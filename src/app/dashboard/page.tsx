'use client'

import { useEffect, useState, useTransition } from 'react'
import { createClient } from '@/lib/supabase/client'
import { logout } from '@/app/auth/actions'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type ActiveMenu = 'overview' | 'pos' | 'inventory' | 'finance' | 'tax' | 'ai' | 'settings'

interface ProductItem {
  id: string
  name: string
  category: string
  price: number
  cost: number
  stock: number
  unit: string
}

const initialProducts: ProductItem[] = [
  { id: '1', name: 'Kopi Arabika Gayo 250g', category: 'Bahan Baku', price: 85000, cost: 50000, stock: 45, unit: 'pck' },
  { id: '2', name: 'Fresh Milk Pasteurisasi 1L', category: 'Bahan Baku', price: 24000, cost: 18000, stock: 12, unit: 'btl' },
  { id: '3', name: 'Sirup Caramel Premium', category: 'Topping', price: 95000, cost: 65000, stock: 8, unit: 'btl' },
  { id: '4', name: 'Iced Caramel Macchiato', category: 'Minuman Siap Saji', price: 35000, cost: 14000, stock: 120, unit: 'cup' },
  { id: '5', name: 'Croissant Butter Paris', category: 'Pastry / Bakery', price: 28000, cost: 12000, stock: 22, unit: 'pcs' },
]

export default function XeroStyleDashboard() {
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>('overview')
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  // POS State
  const [cart, setCart] = useState<{ product: ProductItem; qty: number }[]>([])
  const [customerName, setCustomerName] = useState('Pelanggan Walk-In')

  // AI Chat State
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiChatHistory, setAiChatHistory] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    {
      sender: 'ai',
      text: 'Halo! Saya AI Advisor Naiventory. Ada yang bisa saya bantu analisa hari ini? Misalnya performa laba rugi, estimasi stok menipis, atau laporan pajak.',
    },
  ])

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push('/login')
      } else {
        setUser(data.user)
      }
      setLoading(false)
    })
  }, [router])

  // POS Functions
  const addToCart = (product: ProductItem) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.product.id === product.id)
      if (exist) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { product, qty: 1 }]
    })
  }

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id) {
            const newQty = item.qty + delta
            return newQty > 0 ? { ...item, qty: newQty } : null
          }
          return item
        })
        .filter(Boolean) as { product: ProductItem; qty: number }[]
    )
  }

  const subtotal = cart.reduce((acc, curr) => acc + curr.product.price * curr.qty, 0)
  const taxPPN = Math.round(subtotal * 0.11)
  const totalBill = subtotal + taxPPN

  const handleAiSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!aiPrompt.trim()) return

    const userText = aiPrompt
    setAiChatHistory((prev) => [...prev, { sender: 'user', text: userText }])
    setAiPrompt('')

    setTimeout(() => {
      let reply = 'Analisis data sistem Naiventory menunjukkan pertumbuhan transaksi stabil 14% minggu ini.'
      if (userText.toLowerCase().includes('stok') || userText.toLowerCase().includes('barang')) {
        reply = 'Perhatian: Stok "Sirup Caramel Premium" tersisa 8 botol dan "Fresh Milk" tersisa 12 botol. Disarankan reorder hari ini untuk menjaga operasional akhir pekan.'
      } else if (userText.toLowerCase().includes('pajak') || userText.toLowerCase().includes('ppn')) {
        reply = 'Total PPN 11% yang terkumpul bulan ini adalah Rp 1.633.500. Estimasi PPh Final UMKM 0.5% dari omzet adalah Rp 74.250. Format e-Faktur siap diunduh.'
      } else if (userText.toLowerCase().includes('laba') || userText.toLowerCase().includes('untung')) {
        reply = 'Margin laba kotor bisnis Anda rata-rata berada di angka 62.4%. Produk dengan kontribusi profit tertinggi adalah Iced Caramel Macchiato.'
      }

      setAiChatHistory((prev) => [...prev, { sender: 'ai', text: reply }])
    }, 700)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F7F9] flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#002B49]">
          <svg className="animate-spin w-6 h-6 text-[#0070BA]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="font-bold text-sm">Menyiapkan portal bisnis...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4F7F9] text-[#111827] flex flex-col font-sans selection:bg-[#00B4D8] selection:text-white">
      {/* ─── XERO-STYLE TOP BAR NAVIGATION ─── */}
      <header className="bg-[#002B49] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo & Workspace selector */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveMenu('overview')}>
              <div className="w-8 h-8 relative">
                <Image src="/logo.jpg" alt="Logo" fill className="object-contain" />
              </div>
              <span className="font-black text-xl tracking-tight text-white">
                Nai<span className="text-[#00A3C4]">ventory</span>
              </span>
            </div>

            {/* Business Entity Badge */}
            <div className="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border border-white/10 transition-colors">
              <span className="w-2 h-2 rounded-full bg-[#059669]" />
              <span>Bisnis Utama (ID: 01)</span>
              <span className="text-gray-400">▾</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold">
            {[
              { id: 'overview', label: 'Ringkasan', icon: '📊' },
              { id: 'pos', label: 'Kasir POS', icon: '🛒' },
              { id: 'inventory', label: 'Inventori', icon: '📦' },
              { id: 'finance', label: 'Keuangan', icon: '💰' },
              { id: 'tax', label: 'Pajak & e-Faktur', icon: '🧾' },
              { id: 'ai', label: 'AI Advisor', icon: '🤖' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveMenu(m.id as ActiveMenu)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all ${
                  activeMenu === m.id
                    ? 'bg-[#0070BA] text-white shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{m.icon}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </nav>

          {/* User profile & actions */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-gray-400">Masuk sebagai</p>
              <p className="text-xs font-bold text-white truncate max-w-[180px]">{user?.email}</p>
            </div>
            <button
              onClick={() => startTransition(async () => { await logout() })}
              disabled={isPending}
              className="text-xs font-bold bg-white/10 hover:bg-rose-600/80 text-white px-3.5 py-2 rounded-lg transition-all border border-white/10"
            >
              {isPending ? 'Keluar...' : 'Keluar'}
            </button>
          </div>
        </div>

        {/* Mobile secondary tab bar */}
        <div className="lg:hidden flex items-center gap-1 px-4 py-2 bg-[#001D33] overflow-x-auto text-xs font-bold">
          {[
            { id: 'overview', label: 'Ringkasan' },
            { id: 'pos', label: 'Kasir POS' },
            { id: 'inventory', label: 'Inventori' },
            { id: 'finance', label: 'Keuangan' },
            { id: 'tax', label: 'Pajak' },
            { id: 'ai', label: 'AI' },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveMenu(m.id as ActiveMenu)}
              className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                activeMenu === m.id ? 'bg-[#0070BA] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </header>

      {/* ─── MAIN CONTENT AREA ─── */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">

        {/* ════ VIEW 1: OVERVIEW / DASHBOARD BISNIS ════ */}
        {activeMenu === 'overview' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#002B49]">Dashboard Bisnis</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Pantau arus kas, kinerja kasir, dan ringkasan laba rugi real-time ala Xero.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveMenu('pos')}
                  className="bg-[#0070BA] hover:bg-[#005B94] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <span>🛒</span> Buka Kasir POS
                </button>
                <button
                  onClick={() => setActiveMenu('ai')}
                  className="bg-white hover:bg-gray-50 text-[#002B49] border border-gray-200 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all flex items-center gap-2"
                >
                  <span>✨</span> Tanya AI
                </button>
              </div>
            </div>

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-xs font-semibold text-gray-500">Penjualan Bulan Ini (Revenue)</span>
                <p className="text-2xl font-black text-[#002B49] mt-2">Rp 48.250.000</p>
                <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-[#059669]">
                  <span>↑ 14.2%</span> <span className="text-gray-400 font-normal">vs bulan lalu</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-xs font-semibold text-gray-500">Laba Bersih Estimasi</span>
                <p className="text-2xl font-black text-[#0070BA] mt-2">Rp 26.400.000</p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="font-bold text-[#059669]">Margin: 54.7%</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-xs font-semibold text-gray-500">Saldo Rekening Kas &amp; Bank</span>
                <p className="text-2xl font-black text-[#002B49] mt-2">Rp 31.890.000</p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                  <span>BCA &amp; Mandiri tersinkron</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-xs font-semibold text-gray-500">Estimasi PPh Final (0.5%)</span>
                <p className="text-2xl font-black text-amber-600 mt-2">Rp 241.250</p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                  <span>Status: Siap disetor</span>
                </div>
              </div>
            </div>

            {/* Financial Visual & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cashflow Widget */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-[#002B49] text-base">Arus Kas Masuk vs Keluar (30 Hari Terakhir)</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 font-semibold px-2.5 py-1 rounded-md">Real-Time</span>
                </div>

                <div className="h-48 flex items-end gap-3 pt-6 pb-2 border-b border-gray-100">
                  {[
                    { day: 'Sen', in: 80, out: 30 },
                    { day: 'Sel', in: 65, out: 25 },
                    { day: 'Rab', in: 90, out: 40 },
                    { day: 'Kam', in: 75, out: 35 },
                    { day: 'Jum', in: 100, out: 50 },
                    { day: 'Sab', in: 120, out: 60 },
                    { day: 'Min', in: 110, out: 45 },
                  ].map((bar) => (
                    <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <div className="w-full flex items-end justify-center gap-1 h-36">
                        <div
                          className="w-1/2 bg-[#0070BA] rounded-t-md transition-all hover:bg-[#005B94]"
                          style={{ height: `${(bar.in / 120) * 100}%` }}
                          title={`Masuk: ${bar.in}`}
                        />
                        <div
                          className="w-1/2 bg-rose-400 rounded-t-md transition-all hover:bg-rose-500"
                          style={{ height: `${(bar.out / 120) * 100}%` }}
                          title={`Keluar: ${bar.out}`}
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-gray-400">{bar.day}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-center gap-6 text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#0070BA]" />
                    <span className="text-gray-600">Pemasukan Penjualan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-400" />
                    <span className="text-gray-600">Biaya Operasional &amp; HPP</span>
                  </div>
                </div>
              </div>

              {/* Quick AI Alert & Insight */}
              <div className="bg-gradient-to-br from-[#002B49] to-[#004B7A] text-white p-6 rounded-2xl flex flex-col justify-between shadow-lg">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#00A3C4] font-bold uppercase tracking-wider mb-2">
                    <span>✨</span> Rekomendasi Pintar AI
                  </div>
                  <h4 className="text-lg font-black text-white leading-snug">
                    Efisiensi Stok &amp; Strategi Harga Akhir Pekan
                  </h4>
                  <p className="text-xs text-gray-200 mt-3 leading-relaxed">
                    Tren menunjukkan transaksi Sabtu-Minggu meningkat 28%. Stok sirup dan susu disarankan ditambah 15 unit sebelum Jumat sore.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <button
                    onClick={() => setActiveMenu('ai')}
                    className="w-full bg-[#00A3C4] hover:bg-[#008CA8] text-white font-bold text-xs py-2.5 rounded-xl transition-colors shadow-md text-center"
                  >
                    Buka Asisten AI Lengkap &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════ VIEW 2: POINT OF SALE (POS / KASIR) ════ */}
        {activeMenu === 'pos' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Products Grid */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-[#002B49]">Katalog Kasir POS</h2>
                  <p className="text-xs text-gray-500">Klik item untuk menambahkan langsung ke keranjang kasir.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-[#DCFCE7] text-[#059669] font-bold px-3 py-1 rounded-full">
                    Kasir Aktif: Shift 1
                  </span>
                </div>
              </div>

              {/* Product Card Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {initialProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => addToCart(p)}
                    className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#0070BA] cursor-pointer transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-semibold">
                        {p.category}
                      </span>
                      <h4 className="font-bold text-sm text-[#002B49] mt-2 group-hover:text-[#0070BA] transition-colors leading-snug">
                        {p.name}
                      </h4>
                    </div>
                    <div className="mt-4 pt-2 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-black text-[#0070BA]">
                        Rp {p.price.toLocaleString('id-ID')}
                      </span>
                      <span className="text-[10px] text-gray-400">Stok: {p.stock}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Cart & Checkout Panel */}
            <div className="lg:col-span-5 xl:col-span-4 bg-white p-5 rounded-3xl border border-gray-200 shadow-xl flex flex-col justify-between h-[calc(100vh-140px)] sticky top-20">
              <div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
                  <h3 className="font-black text-[#002B49] text-base">Pesanan Baru</h3>
                  <button onClick={() => setCart([])} className="text-xs font-semibold text-rose-500 hover:underline">
                    Reset
                  </button>
                </div>

                {/* Customer field */}
                <div className="mb-3">
                  <label className="text-[11px] font-bold text-gray-500 uppercase">Nama Pelanggan</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#0070BA]"
                  />
                </div>

                {/* Cart items list */}
                <div className="overflow-y-auto max-h-64 space-y-2 pr-1">
                  {cart.length === 0 ? (
                    <div className="text-center py-10 text-gray-400 text-xs">
                      <span className="text-3xl block mb-2">🛒</span>
                      Keranjang kosong. Pilih produk di samping.
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.product.id} className="flex items-center justify-between bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-xs">
                        <div className="flex-1 pr-2">
                          <p className="font-bold text-[#002B49] truncate">{item.product.name}</p>
                          <p className="text-[11px] text-gray-500">
                            Rp {item.product.price.toLocaleString('id-ID')} x {item.qty}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateQty(item.product.id, -1)}
                            className="w-6 h-6 rounded-md bg-white border border-gray-300 font-bold flex items-center justify-center hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="w-5 text-center font-bold text-xs">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.product.id, 1)}
                            className="w-6 h-6 rounded-md bg-white border border-gray-300 font-bold flex items-center justify-center hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Checkout details */}
              <div className="border-t border-gray-200 pt-3 space-y-2">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>PPN 11% (Pajak Restoran/Barang)</span>
                  <span className="font-semibold">Rp {taxPPN.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-[#002B49] pt-2 border-t border-gray-100">
                  <span>Total Tagihan</span>
                  <span className="text-base text-[#0070BA]">Rp {totalBill.toLocaleString('id-ID')}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    disabled={cart.length === 0}
                    onClick={() => {
                      alert(`Pembayaran QRIS Berhasil untuk ${customerName} senilai Rp ${totalBill.toLocaleString('id-ID')}!`)
                      setCart([])
                    }}
                    className="w-full bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs py-3 rounded-xl disabled:opacity-50 transition-colors shadow-sm"
                  >
                    Bayar QRIS
                  </button>
                  <button
                    disabled={cart.length === 0}
                    onClick={() => {
                      alert(`Pembayaran Tunai Berhasil untuk ${customerName} senilai Rp ${totalBill.toLocaleString('id-ID')}!`)
                      setCart([])
                    }}
                    className="w-full bg-[#0070BA] hover:bg-[#005B94] text-white font-bold text-xs py-3 rounded-xl disabled:opacity-50 transition-colors shadow-sm"
                  >
                    Tunai / Kartu
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════ VIEW 3: INVENTORI & STOK ════ */}
        {activeMenu === 'inventory' && (
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-[#002B49]">Manajemen Inventori &amp; Stok</h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Pantau stok bahan baku, harga pokok pembelian (HPP), dan jadwal pemesanan ulang.
                </p>
              </div>
              <button
                onClick={() => alert('Fitur form tambah produk baru siap dihubungkan!')}
                className="bg-[#0070BA] hover:bg-[#005B94] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md"
              >
                + Tambah Produk Baru
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold">
                    <th className="p-3">Nama Produk / Bahan</th>
                    <th className="p-3">Kategori</th>
                    <th className="p-3">Harga Beli (HPP)</th>
                    <th className="p-3">Harga Jual</th>
                    <th className="p-3">Sisa Stok</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {initialProducts.map((p) => {
                    const isLow = p.stock < 15
                    return (
                      <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="p-3 font-bold text-[#002B49]">{p.name}</td>
                        <td className="p-3 text-gray-500">{p.category}</td>
                        <td className="p-3 font-medium">Rp {p.cost.toLocaleString('id-ID')}</td>
                        <td className="p-3 font-bold text-[#0070BA]">Rp {p.price.toLocaleString('id-ID')}</td>
                        <td className="p-3 font-semibold">{p.stock} {p.unit}</td>
                        <td className="p-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                              isLow ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {isLow ? 'Stok Menipis' : 'Stok Aman'}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ════ VIEW 4: LAPORAN KEUANGAN & KAS ════ */}
        {activeMenu === 'finance' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-[#002B49]">Laporan Keuangan &amp; Laba Rugi</h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Format pembukuan standar PSAK otomatis tanpa perlu manual input Excel.
                </p>
              </div>
              <button
                onClick={() => alert('Ekspor file Laporan Keuangan ke format PDF & Excel berhasil di-generate!')}
                className="bg-gray-100 hover:bg-gray-200 text-[#002B49] font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-gray-300"
              >
                📥 Download Laporan (PDF)
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Laba Rugi */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="font-bold text-base text-[#002B49] border-b border-gray-100 pb-2">
                  Laporan Laba Rugi (Bulan Berjalan)
                </h3>
                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="flex justify-between font-bold text-[#002B49]">
                    <span>1. Pendapatan Penjualan Bersih</span>
                    <span>Rp 48.250.000</span>
                  </div>
                  <div className="flex justify-between text-gray-600 pl-4">
                    <span>- Harga Pokok Penjualan (HPP / Bahan)</span>
                    <span className="text-rose-500">(Rp 18.200.000)</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#0070BA] pt-2 border-t border-dashed border-gray-200">
                    <span>Laba Kotor (Gross Profit)</span>
                    <span>Rp 30.050.000</span>
                  </div>
                  <div className="flex justify-between text-gray-600 pl-4 pt-2">
                    <span>- Beban Gaji &amp; Operasional</span>
                    <span className="text-rose-500">(Rp 3.650.000)</span>
                  </div>
                  <div className="flex justify-between font-black text-emerald-700 text-base pt-3 border-t border-gray-200">
                    <span>Laba Bersih Sebelum Pajak</span>
                    <span>Rp 26.400.000</span>
                  </div>
                </div>
              </div>

              {/* Posisi Kas & Bank */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="font-bold text-base text-[#002B49] border-b border-gray-100 pb-2">
                  Saldo Kas &amp; Bank Tersinkron
                </h3>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-3.5 bg-gray-50 rounded-xl flex items-center justify-between border border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🏦</span>
                      <div>
                        <p className="font-bold text-[#002B49]">BCA Giro Operasional</p>
                        <p className="text-[11px] text-gray-400">No. Rek: 8201-992-110</p>
                      </div>
                    </div>
                    <span className="font-bold text-sm text-[#002B49]">Rp 22.450.000</span>
                  </div>
                  <div className="p-3.5 bg-gray-50 rounded-xl flex items-center justify-between border border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">💳</span>
                      <div>
                        <p className="font-bold text-[#002B49]">QRIS Settlement Bank</p>
                        <p className="text-[11px] text-gray-400">Penyelesaian Harian</p>
                      </div>
                    </div>
                    <span className="font-bold text-sm text-[#002B49]">Rp 7.840.000</span>
                  </div>
                  <div className="p-3.5 bg-gray-50 rounded-xl flex items-center justify-between border border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">💵</span>
                      <div>
                        <p className="font-bold text-[#002B49]">Kas Kecil (Petty Cash)</p>
                        <p className="text-[11px] text-gray-400">Laci Kasir Toko</p>
                      </div>
                    </div>
                    <span className="font-bold text-sm text-[#002B49]">Rp 1.600.000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════ VIEW 5: PAJAK & E-FAKTUR INDONESIA ════ */}
        {activeMenu === 'tax' && (
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-2xl font-black text-[#002B49]">Kalkulator Pajak Usaha &amp; e-Faktur Indonesia</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Kepatuhan perpajakan otomatis: PPh Final UMKM 0.5% (PP 23/2018) dan PPN 11%.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#F0FDF4] to-white border border-[#BBF7D0]">
                <span className="text-xs font-bold text-[#166534] uppercase tracking-wide">Pajak Penghasilan UMKM</span>
                <h3 className="text-lg font-black text-[#14532D] mt-1">PPh Final 0.5% (Masa Ini)</h3>
                <div className="mt-4 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Omzet Bruto:</span>
                    <span className="font-bold">Rp 48.250.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tarif Pajak:</span>
                    <span className="font-bold text-[#059669]">0.5%</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-emerald-200 text-sm font-black text-[#14532D]">
                    <span>Total Pajak Disetor:</span>
                    <span>Rp 241.250</span>
                  </div>
                </div>
                <button
                  onClick={() => alert('Kode Billing DJP berhasil di-generate: 9812-3920-1120')}
                  className="mt-5 w-full bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs py-2.5 rounded-xl transition-colors"
                >
                  Buat Kode Billing Pajak DJP &rarr;
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#EFF6FF] to-white border border-[#BFDBFE]">
                <span className="text-xs font-bold text-[#1E40AF] uppercase tracking-wide">Pajak Pertambahan Nilai</span>
                <h3 className="text-lg font-black text-[#1E3A8A] mt-1">PPN 11% Faktur Keluaran</h3>
                <div className="mt-4 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Nilai DPP:</span>
                    <span className="font-bold">Rp 43.468.468</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tarif PPN:</span>
                    <span className="font-bold text-[#0070BA]">11%</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-blue-200 text-sm font-black text-[#1E3A8A]">
                    <span>Total PPN Terpungut:</span>
                    <span>Rp 4.781.532</span>
                  </div>
                </div>
                <button
                  onClick={() => alert('File CSV Skema e-Faktur DJP siap di-upload ke web e-Faktur!')}
                  className="mt-5 w-full bg-[#0070BA] hover:bg-[#005B94] text-white font-bold text-xs py-2.5 rounded-xl transition-colors"
                >
                  Ekspor Format CSV e-Faktur &rarr;
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ════ VIEW 6: ASISTEN AI NAIVENTORY ════ */}
        {activeMenu === 'ai' && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm flex flex-col h-[calc(100vh-140px)]">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00A3C4] to-[#0070BA] text-white flex items-center justify-center font-bold text-base shadow-sm">
                  ✨
                </div>
                <div>
                  <h3 className="font-black text-[#002B49] text-base">Naiventory AI Business Advisor</h3>
                  <p className="text-[11px] text-gray-500">Menganalisis data transaksi, kasir, inventori, dan laporan laba rugi Anda.</p>
                </div>
              </div>
              <span className="text-xs bg-[#DCFCE7] text-[#059669] font-bold px-3 py-1 rounded-full">
                AI Aktif 24/7
              </span>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {aiChatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-lg rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#0070BA] text-white rounded-br-none shadow-md'
                        : 'bg-[#F4F7F9] text-[#002B49] rounded-bl-none border border-gray-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Prompt Form */}
            <form onSubmit={handleAiSend} className="p-4 border-t border-gray-100 flex items-center gap-3">
              <input
                type="text"
                placeholder="Tanyakan analisis bisnis Anda... (misal: 'Berapa perkiraan stok yang harus dibeli?')"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0070BA]"
              />
              <button
                type="submit"
                className="bg-[#0070BA] hover:bg-[#005B94] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-md"
              >
                Kirim
              </button>
            </form>
          </div>
        )}

      </main>
    </div>
  )
}
