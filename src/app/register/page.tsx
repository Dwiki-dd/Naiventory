'use client'

import { useState, useTransition } from 'react'
import { signup } from '@/app/auth/actions'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import Link from 'next/link'

export default function ShopeeStyleRegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!name.trim()) {
      setError('Silakan masukkan nama lengkap atau nama bisnis Anda.')
      return
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Masukkan alamat email yang valid.')
      return
    }

    if (password.length < 6) {
      setError('Password minimal harus 6 karakter.')
      return
    }

    startTransition(async () => {
      const formData = new FormData()
      formData.set('name', name)
      formData.set('email', email)
      formData.set('password', password)
      formData.set('confirmPassword', password)

      const result = await signup(formData)
      if (result?.error) {
        setError(result.error)
      } else {
        setSuccess('Pendaftaran berhasil! Akun Anda telah dibuat. Silakan masuk.')
      }
    })
  }

  // Google OAuth Handler via Supabase
  const handleGoogleLogin = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })
    if (error) {
      setError('Gagal menghubungkan Google: ' + error.message)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-[#111827]">
      {/* ─── HEADER ─── */}
      <header className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 relative">
                <Image src="/logo.jpg" alt="Naiventory Logo" fill className="object-contain" priority />
              </div>
              <span className="text-2xl font-black text-[#002B49] tracking-tight">
                Nai<span className="text-[#0070BA]">ventory</span>
              </span>
            </Link>
            <span className="text-xl text-gray-300 font-light mx-1">|</span>
            <span className="text-xl font-bold text-[#002B49]">Daftar Akun</span>
          </div>

          <Link href="/login" className="text-sm font-semibold text-[#0070BA] hover:underline">
            Butuh bantuan?
          </Link>
        </div>
      </header>

      {/* ─── MAIN BANNER / SPLIT SECTION (SHOPEE STYLE) ─── */}
      <section className="relative flex-1 bg-white">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">

          {/* LEFT: Copy & Benefits (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center px-6 sm:px-12 lg:pl-16 lg:pr-8 py-12 lg:py-16">
            <div className="max-w-md mx-auto lg:mx-0 space-y-6">
              <div>
                <h1 className="text-4xl sm:text-5xl font-black text-[#002B49] tracking-tight leading-[1.15]">
                  Mulai Kelola <br />
                  <span className="text-[#0070BA]">Bisnis Sekarang!</span>
                </h1>
                <p className="text-base text-gray-500 mt-3 font-medium leading-relaxed">
                  Nikmati kemudahan kasir, stok otomatis, dan pembukuan terpadu untuk UMKM dan bisnis modern
                </p>
              </div>

              {/* 3 Points */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#E0F2FE] text-[#0070BA] flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
                    🚀
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#002B49]">Gratis coba 30 hari, langsung mulai</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Tanpa syarat kartu kredit, langsung akses seluruh sistem</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#DCFCE7] text-[#059669] flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
                    📊
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#002B49]">Laporan keuangan &amp; pajak otomatis</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Laba rugi real-time dan kalkulasi tarif PPN &amp; PPh Final</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#EDE9FE] text-[#6D28D9] flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
                    🤖
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#002B49]">Didukung Asisten AI Pintar 24/7</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Analisa tren penjualan dan peringatan stok menipis otomatis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Register Card with Geometric Pattern (6 Cols) */}
          <div className="lg:col-span-6 relative bg-gradient-to-br from-[#002B49] via-[#003B64] to-[#0070BA] flex items-center justify-center p-6 sm:p-12 overflow-hidden">
            {/* Background Pattern Overlay ala Shopee */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)`,
                backgroundSize: '100px 100px',
              }}
            />

            {/* Registration Box Card */}
            <div className="relative z-10 bg-white rounded-3xl p-8 sm:p-10 shadow-2xl w-full max-w-md border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-black text-[#002B49] mb-1">
                Daftar sebagai Pengguna
              </h2>
              <p className="text-xs text-gray-500 mb-6 font-medium">
                Buat akun Naiventory Anda dalam 1 menit
              </p>

              {/* Success Message */}
              {success && (
                <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2">
                  <span>✓</span>
                  <span>{success}</span>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-semibold flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Form Input */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Nama Lengkap / Nama Bisnis"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#0070BA] focus:ring-1 focus:ring-[#0070BA] transition-all"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    placeholder="Alamat Email Bisnis"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#0070BA] focus:ring-1 focus:ring-[#0070BA] transition-all"
                  />
                </div>

                <div>
                  <input
                    type="password"
                    required
                    placeholder="Buat Password (min. 6 karakter)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#0070BA] focus:ring-1 focus:ring-[#0070BA] transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-3.5 bg-[#0070BA] hover:bg-[#005B94] text-white font-black text-sm uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#0070BA]/30 disabled:opacity-70 mt-2"
                >
                  {isPending ? 'MEMPROSES...' : 'BERIKUTNYA'}
                </button>
              </form>

              {/* Divider ATAU */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <span className="relative bg-white px-3 text-[11px] font-bold text-gray-400 tracking-wider uppercase">
                  ATAU
                </span>
              </div>

              {/* Social Login: GOOGLE SAJA (Facebook dihilangkan) */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-3 px-4 border border-gray-300 hover:border-gray-400 rounded-xl text-xs sm:text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transition-all flex items-center justify-center gap-3 shadow-sm"
              >
                {/* Google SVG Icon */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Daftar dengan Google</span>
              </button>

              {/* Login Link */}
              <div className="mt-6 text-center text-xs text-gray-500 font-medium">
                Punya akun?{' '}
                <Link href="/login" className="text-[#0070BA] font-bold hover:underline">
                  Log In
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── BOTTOM 3 STEPS (LANGKAH MUDAH BERJUALAN / BERBISNIS) ─── */}
      <section className="bg-[#F8FAFC] border-t border-gray-200 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-black text-[#002B49] mb-10">
            Langkah Mudah Menggunakan Naiventory
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <span className="text-4xl font-black text-[#0070BA]">1</span>
              <h3 className="font-bold text-base text-[#002B49]">Buat Akun Naiventory</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                Cukup gunakan email Anda untuk mendaftar dan mulai coba gratis 30 hari
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-4xl font-black text-[#0070BA]">2</span>
              <h3 className="font-bold text-base text-[#002B49]">Atur Profil &amp; Tambahkan Produk</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                Masukkan daftar barang, harga jual, dan stok awal toko Anda dengan mudah
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-4xl font-black text-[#0070BA]">3</span>
              <h3 className="font-bold text-base text-[#002B49]">Mulai Transaksi &amp; Pantau Kas</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                Gunakan kasir POS, cetak struk, dan lihat laporan laba rugi otomatis setiap hari
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
