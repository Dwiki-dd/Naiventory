'use client'

import { useEffect, useState, useTransition } from 'react'
import { createClient } from '@/lib/supabase/client'
import { logout } from '@/app/auth/actions'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <svg className="animate-spin w-5 h-5 text-[#3B82F6]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm font-medium text-[#94A3B8]">Memuat dashboard...</span>
        </div>
      </div>
    )
  }

  const features = [
    { title: 'POS / Kasir', icon: '🛒', desc: 'Transaksi penjualan, cetak struk digital & fisik', status: 'Coming Soon', color: 'from-blue-500/20 to-blue-600/10' },
    { title: 'Inventori', icon: '📦', desc: 'Stok opname, alert stok menipis, multi-gudang', status: 'Coming Soon', color: 'from-cyan-500/20 to-cyan-600/10' },
    { title: 'Keuangan', icon: '📊', desc: 'Laba rugi, arus kas, neraca standar PSAK', status: 'Coming Soon', color: 'from-indigo-500/20 to-indigo-600/10' },
    { title: 'Pajak', icon: '🧾', desc: 'PPh, PPN, ekspor e-Faktur & hitung otomatis', status: 'Coming Soon', color: 'from-purple-500/20 to-purple-600/10' },
    { title: 'AI Assistant', icon: '🤖', desc: 'Tanya insight bisnis, analisis tren via chat', status: 'Coming Soon', color: 'from-pink-500/20 to-pink-600/10' },
    { title: 'Tim & Akses', icon: '👥', desc: 'Multi-kasir, role permission, log aktivitas', status: 'Coming Soon', color: 'from-emerald-500/20 to-emerald-600/10' },
  ]

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">
      {/* Top navigation bar */}
      <header className="border-b border-white/10 bg-[#0B0F1A]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] flex items-center justify-center shadow-lg shadow-[#3B82F6]/30">
                <span className="text-white font-black text-lg">N</span>
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] rounded-full" />
            </div>
            <span className="font-bold text-lg">
              Nai<span className="text-[#3B82F6]">ventory</span>
            </span>
            <span className="hidden sm:inline-block text-xs bg-white/10 text-[#94A3B8] px-2 py-0.5 rounded-full font-medium">
              v0.1.0-alpha
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-[#94A3B8]">Masuk sebagai</p>
              <p className="text-sm font-medium text-white truncate max-w-[200px]">
                {user?.email}
              </p>
            </div>
            <button
              onClick={() => startTransition(async () => { await logout() })}
              disabled={isPending}
              className="text-xs text-[#94A3B8] hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-lg transition-colors duration-200"
            >
              {isPending ? 'Keluar...' : 'Keluar'}
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Selamat Datang di <span className="text-[#3B82F6]">Naiventory</span> 👋
          </h1>
          <p className="text-[#94A3B8] mt-1 text-sm sm:text-base">
            Platform manajemen bisnis terpadu: POS, inventori, keuangan, dan AI assistant.
          </p>
        </div>

        {/* Status card */}
        <div className="mb-8 p-4 sm:p-6 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎉</span>
            <div>
              <p className="font-semibold text-white">Setup Supabase Berhasil!</p>
              <p className="text-xs sm:text-sm text-[#94A3B8]">
                Koneksi database dan autentikasi sudah aktif. Fitur-fitur lain sedang dalam tahap pengembangan.
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block text-xs bg-[#22C55E]/20 text-[#22C55E] px-3 py-1 rounded-full font-medium">
            Database Terhubung
          </span>
        </div>

        {/* Feature roadmap cards */}
        <h2 className="text-lg font-semibold mb-4 text-[#94A3B8]">Fitur yang Akan Datang</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feat) => (
            <div
              key={feat.title}
              className={`p-6 rounded-2xl border border-white/10 bg-gradient-to-br ${feat.color} backdrop-blur-sm relative overflow-hidden`}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{feat.icon}</span>
                <span className="text-xs bg-white/10 text-[#94A3B8] px-2.5 py-0.5 rounded-full font-medium">
                  {feat.status}
                </span>
              </div>
              <h3 className="font-semibold text-white text-base mb-1">{feat.title}</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
