'use client'

import { useState, useTransition } from 'react'
import { login } from '@/app/auth/actions'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const result = await login(formData)
      if (result?.error) {
        setError(result.error)
      }
    })
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col items-center justify-center">
      <div className="w-full max-w-sm min-h-screen bg-[#F0F2F5] flex flex-col">

        {/* Header */}
        <div className="bg-[#0B1340] px-5 py-4 flex items-center gap-4">
          <Link href="/" className="text-white text-xl leading-none">←</Link>
          <span className="text-white font-semibold text-sm">Masuk</span>
        </div>

        {/* Body */}
        <div className="flex-1 px-6 pt-8 flex flex-col">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 relative mb-3">
              <Image src="/logo.jpg" alt="Naiventory" fill className="object-contain" priority />
            </div>
            <h1 className="text-2xl font-black text-[#111827] tracking-wide">
              Nai<span className="text-[#2563EB]">ventory</span>
            </h1>
            <p className="text-[#6B7280] text-sm mt-1">Sistem Manajemen Bisnis Terpadu</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#EF4444] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-[#EF4444] text-sm">{error}</span>
            </div>
          )}

          {/* Form */}
          <form action={handleSubmit} className="space-y-3">
            <div>
              <p className="text-[#111827] font-bold text-lg mb-2">Apa emailmu?</p>
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                className="w-full px-4 py-4 border-2 border-[#111827] rounded-2xl text-[#111827] text-base bg-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] transition-colors"
              />
            </div>
            <div>
              <p className="text-[#111827] font-bold text-lg mb-2">Password</p>
              <input
                name="password"
                type="password"
                required
                placeholder="Password"
                className="w-full px-4 py-4 border-2 border-[#111827] rounded-2xl text-[#111827] text-base bg-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-2xl font-bold text-base transition-all duration-200 disabled:opacity-70"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Memproses...
                  </span>
                ) : (
                  'Masuk'
                )}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-[#6B7280] mt-5">
            Belum punya akun?{' '}
            <Link href="/register" className="text-[#2563EB] font-semibold">
              Daftar sekarang
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 pb-8 text-center">
          <p className="text-xs text-[#9CA3AF]">© 2024 Naiventory. Semua hak dilindungi.</p>
        </div>

      </div>
    </div>
  )
}
