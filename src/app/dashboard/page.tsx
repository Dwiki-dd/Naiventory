import { createClient } from '@/lib/supabase/server'
import { logout } from '@/app/auth/actions'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">
      {/* Top navigation bar */}
      <header className="border-b border-white/10 bg-[#0B0F1A]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] flex items-center justify-center shadow-lg shadow-[#3B82F6]/30">
                <span className="text-white font-black text-lg">N</span>
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] rounded-full" />
            </div>
            <span className="font-bold text-lg">
              Nai<span className="text-[#3B82F6]">ventory</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#94A3B8] text-sm hidden sm:block">
              {user.email}
            </span>
            <form action={logout}>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[#94A3B8] hover:text-white text-sm transition-all duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Keluar
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white">
            Selamat Datang! 🎉
          </h1>
          <p className="text-[#94A3B8] mt-2">
            Dashboard Naiventory sedang dalam pengembangan. Fitur-fitur akan segera hadir!
          </p>
        </div>

        {/* Coming soon cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '🛒', title: 'Kasir / POS', desc: 'Transaksi penjualan & struk digital', color: '#3B82F6', status: 'Segera Hadir' },
            { icon: '📦', title: 'Inventori', desc: 'Kelola stok & produk bisnis', color: '#6366F1', status: 'Segera Hadir' },
            { icon: '📊', title: 'Laporan Keuangan', desc: 'Laba rugi & analisis bisnis', color: '#06B6D4', status: 'Segera Hadir' },
            { icon: '🧾', title: 'Pajak', desc: 'Kelola pajak & kewajiban fiskal', color: '#8B5CF6', status: 'Segera Hadir' },
            { icon: '👥', title: 'Manajemen Tim', desc: 'Kelola karyawan & akses', color: '#22C55E', status: 'Segera Hadir' },
            { icon: '🤖', title: 'AI Assistant', desc: 'Analisis cerdas untuk bisnismu', color: '#F59E0B', status: 'Segera Hadir' },
          ].map((feature) => (
            <div
              key={feature.title}
              className="relative group bg-white/3 hover:bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 cursor-default overflow-hidden"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${feature.color}15 0%, transparent 70%)`,
                }}
              />
              <div className="relative">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-white font-semibold">{feature.title}</h3>
                <p className="text-[#94A3B8] text-sm mt-1">{feature.desc}</p>
                <div className="mt-4">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: `${feature.color}20`,
                      color: feature.color,
                      border: `1px solid ${feature.color}30`,
                    }}
                  >
                    {feature.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
