'use client'

import { useState, useTransition } from 'react'
import { signup } from '@/app/auth/actions'
import Image from 'next/image'
import Link from 'next/link'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  agreed: boolean
}

const TOTAL_STEPS = 4 // name, email, phone, password

export default function RegisterPage() {
  const [step, setStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    agreed: false,
  })

  function update(field: keyof FormData, value: string | boolean) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError(null)
  }

  function goBack() {
    if (step > 0) setStep((s) => s - 1)
  }

  function goNext() {
    // Validation per step
    if (step === 0) {
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        setError('Nama depan dan belakang harus diisi.')
        return
      }
    }
    if (step === 1) {
      if (!formData.email.trim() || !formData.email.includes('@')) {
        setError('Masukkan email yang valid.')
        return
      }
      if (!formData.agreed) {
        setError('Kamu harus menyetujui syarat & ketentuan.')
        return
      }
    }
    if (step === 2) {
      if (!formData.phone.trim() || formData.phone.length < 8) {
        setError('Masukkan nomor telepon yang valid.')
        return
      }
    }
    if (step === 3) {
      if (formData.password.length < 6) {
        setError('Password minimal 6 karakter.')
        return
      }
      // Submit
      handleSubmit()
      return
    }
    setError(null)
    setStep((s) => s + 1)
  }

  function handleSubmit() {
    startTransition(async () => {
      const data = new FormData()
      data.set('name', `${formData.firstName} ${formData.lastName}`)
      data.set('email', formData.email)
      data.set('password', formData.password)
      data.set('confirmPassword', formData.password)
      data.set('phone', formData.phone)

      const result = await signup(data)
      if (result?.error) {
        setError(result.error)
      } else {
        setIsComplete(true)
      }
    })
  }

  // ─── EMAIL CONFIRMATION SCREEN ───────────────────────────────────
  if (isComplete) {
    return (
      <div className="min-h-screen bg-[#F0F2F5] flex flex-col items-center justify-center">
        <div className="w-full max-w-sm min-h-screen bg-[#F0F2F5] flex flex-col">
          {/* Header */}
          <div className="bg-[#0B1340] px-5 py-4 flex items-center gap-4">
            <Link href="/login">
              <span className="text-white text-xl">←</span>
            </Link>
            <span className="text-white font-semibold text-sm">Detail Akun</span>
          </div>

          {/* Body */}
          <div className="flex-1 flex flex-col items-center px-6 pt-10">
            <h1 className="text-xl font-black text-[#111827] text-center leading-tight mb-8">
              Konfirmasi email kamu untuk mengaktifkan akun
            </h1>

            {/* Illustration */}
            <div className="relative w-56 h-44 mb-8">
              {/* Paper plane */}
              <svg viewBox="0 0 200 160" className="w-full h-full">
                {/* Shadow ellipse */}
                <ellipse cx="100" cy="150" rx="60" ry="8" fill="#E5E7EB" />
                {/* Paper plane body */}
                <polygon points="20,80 140,30 110,90" fill="#60B8E8" />
                <polygon points="20,80 110,90 70,120" fill="#3B82F6" />
                <polygon points="110,90 140,30 160,100" fill="#93C5FD" />
                {/* Speed lines */}
                <line x1="5" y1="85" x2="30" y2="85" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                <line x1="10" y1="95" x2="28" y2="95" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                <line x1="15" y1="75" x2="28" y2="75" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                {/* Green checkmark circle */}
                <circle cx="80" cy="45" r="22" fill="#34D399" />
                <polyline points="70,45 78,53 93,37" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                {/* Sparkles */}
                <line x1="58" y1="30" x2="58" y2="22" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
                <line x1="54" y1="34" x2="48" y2="34" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
                <line x1="55" y1="27" x2="51" y2="23" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
                {/* Clock */}
                <circle cx="158" cy="100" r="18" fill="#2563EB" />
                <circle cx="158" cy="100" r="14" fill="white" opacity="0.15" />
                <line x1="158" y1="92" x2="158" y2="100" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="158" y1="100" x2="164" y2="104" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                {/* Clock top knob */}
                <rect x="154" y="83" width="8" height="4" rx="2" fill="#2563EB" />
                <circle cx="152" cy="85" r="2" fill="#1D4ED8" />
                <circle cx="164" cy="85" r="2" fill="#1D4ED8" />
              </svg>
            </div>

            {/* Text */}
            <p className="text-[#6B7280] text-sm text-center">
              Kami mengirim email ke
            </p>
            <p className="text-[#111827] font-semibold text-sm text-center mt-0.5">
              {formData.email}
            </p>
            <button className="text-[#2563EB] font-semibold text-sm mt-2 hover:underline">
              Kirim ulang email
            </button>
          </div>

          {/* Button */}
          <div className="px-6 pb-10">
            <Link href="/login">
              <button className="w-full py-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-2xl font-bold text-base transition-all duration-200">
                Buka aplikasi email
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ─── STEP SCREENS ─────────────────────────────────────────────────
  const stepContent = [
    // STEP 0: Name
    {
      question: 'Siapa namamu?',
      content: (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Nama depan"
            value={formData.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            className="w-full px-4 py-4 border-2 border-[#111827] rounded-2xl text-[#111827] text-base bg-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] transition-colors"
          />
          <input
            type="text"
            placeholder="Nama belakang"
            value={formData.lastName}
            onChange={(e) => update('lastName', e.target.value)}
            className="w-full px-4 py-4 border-2 border-[#111827] rounded-2xl text-[#111827] text-base bg-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] transition-colors"
          />
        </div>
      ),
      footer: (
        <div className="bg-[#E5E7EB] rounded-2xl px-4 py-3 flex items-center gap-2">
          <span className="text-base">🇮🇩</span>
          <span className="text-[#6B7280] text-sm">
            Lokasi kamu:{' '}
            <span className="text-[#2563EB] font-semibold">Indonesia</span>
          </span>
        </div>
      ),
    },
    // STEP 1: Email
    {
      question: 'Apa emailmu?',
      content: (
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => update('email', e.target.value)}
          className="w-full px-4 py-4 border-2 border-[#111827] rounded-2xl text-[#111827] text-base bg-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] transition-colors"
        />
      ),
      footer: (
        <label className="flex items-start gap-3 cursor-pointer">
          <div
            onClick={() => update('agreed', !formData.agreed)}
            className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
              formData.agreed ? 'bg-[#2563EB] border-[#2563EB]' : 'bg-white border-[#9CA3AF]'
            }`}
          >
            {formData.agreed && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="text-[#6B7280] text-sm leading-relaxed">
            Dengan melanjutkan, kamu menyetujui{' '}
            <span className="text-[#2563EB] font-semibold">syarat penggunaan</span>,{' '}
            <span className="text-[#2563EB] font-semibold">kebijakan privasi</span> dan{' '}
            <span className="text-[#2563EB] font-semibold">ketentuan penawaran</span>
          </span>
        </label>
      ),
    },
    // STEP 2: Phone
    {
      question: 'Apa nomor teleponmu?',
      content: (
        <input
          type="tel"
          placeholder="Nomor telepon"
          value={formData.phone}
          onChange={(e) => update('phone', e.target.value)}
          className="w-full px-4 py-4 border-2 border-[#111827] rounded-2xl text-[#111827] text-base bg-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] transition-colors"
        />
      ),
    },
    // STEP 3: Password
    {
      question: 'Buat passwordmu',
      content: (
        <input
          type="password"
          placeholder="Password (min. 6 karakter)"
          value={formData.password}
          onChange={(e) => update('password', e.target.value)}
          className="w-full px-4 py-4 border-2 border-[#111827] rounded-2xl text-[#111827] text-base bg-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] transition-colors"
        />
      ),
    },
  ]

  const current = stepContent[step]

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col items-center justify-center">
      <div className="w-full max-w-sm min-h-screen bg-[#F0F2F5] flex flex-col">

        {/* Header */}
        <div className="bg-[#0B1340] px-5 py-4 flex items-center gap-4">
          {step > 0 ? (
            <button onClick={goBack} className="text-white text-xl leading-none">←</button>
          ) : (
            <Link href="/" className="text-white text-xl leading-none">←</Link>
          )}
          <span className="text-white font-semibold text-sm">Detail Akun</span>
        </div>

        {/* Body */}
        <div className="flex-1 px-6 pt-6 flex flex-col">

          {/* Progress dots */}
          <div className="flex gap-2 mb-6">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full transition-colors duration-300"
                style={{ background: i <= step ? '#111827' : '#D1D5DB' }}
              />
            ))}
          </div>

          {/* Question */}
          <h1 className="text-2xl font-black text-[#111827] leading-tight mb-5">
            {current.question}
          </h1>

          {/* Input fields */}
          {current.content}

          {/* Error */}
          {error && (
            <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-200">
              <p className="text-[#EF4444] text-sm">{error}</p>
            </div>
          )}

          {/* Optional footer content (location / terms) */}
          {current.footer && (
            <div className="mt-auto mb-4">{current.footer}</div>
          )}
        </div>

        {/* Bottom button */}
        <div className="px-6 pb-10 mt-auto">
          <button
            onClick={goNext}
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
            ) : step === 3 ? (
              'Buat Akun'
            ) : (
              'Lanjut'
            )}
          </button>

          {step === 0 && (
            <p className="text-center text-sm text-[#6B7280] mt-4">
              Sudah punya akun?{' '}
              <Link href="/login" className="text-[#2563EB] font-semibold">
                Masuk
              </Link>
            </p>
          )}
        </div>

      </div>
    </div>
  )
}
