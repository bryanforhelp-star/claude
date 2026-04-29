'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'

type Step = 'contact' | 'shipping' | 'payment' | 'confirmed'

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  country: string
  cardNumber: string
  expiry: string
  cvv: string
  cardName: string
}

const emptyForm: FormData = {
  firstName: '', lastName: '', email: '', phone: '',
  address: '', city: '', state: '', zip: '', country: 'US',
  cardNumber: '', expiry: '', cvv: '', cardName: '',
}

const steps: Step[] = ['contact', 'shipping', 'payment']
const stepLabels = { contact: 'Contact', shipping: 'Shipping', payment: 'Payment' }

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [step, setStep] = useState<Step>('contact')
  const [form, setForm] = useState<FormData>(emptyForm)
  const [processing, setProcessing] = useState(false)
  const [orderNum] = useState(() => Math.floor(100000 + Math.random() * 900000).toString())

  if (items.length === 0 && step !== 'confirmed') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: '#0a0a0a' }}>
        <p className="text-sm mb-4" style={{ color: '#6a5a4a' }}>Nothing in your cart.</p>
        <Link href="/shop" className="text-xs tracking-[0.25em] uppercase" style={{ color: '#8b1a1a' }}>
          Go Shop
        </Link>
      </div>
    )
  }

  function set(key: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function handleNext() {
    if (step === 'contact') setStep('shipping')
    else if (step === 'shipping') setStep('payment')
    else if (step === 'payment') {
      setProcessing(true)
      setTimeout(() => {
        setProcessing(false)
        clearCart()
        setStep('confirmed')
      }, 1800)
    }
  }

  const inputClass = 'w-full bg-transparent border px-4 py-3 text-sm outline-none transition-colors focus:border-chacal-crimson'
  const inputStyle = { borderColor: '#2a2a2a', color: '#e8d5b0' }
  const labelStyle = { color: '#8b6a3a', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase' as const }

  function Field({
    label, name, type = 'text', placeholder = '', half = false,
  }: {
    label: string; name: keyof FormData; type?: string; placeholder?: string; half?: boolean
  }) {
    return (
      <div className={half ? 'col-span-1' : 'col-span-2'}>
        <label className="block mb-1.5" style={labelStyle}>{label}</label>
        <input
          type={type}
          value={form[name]}
          onChange={(e) => set(name, e.target.value)}
          placeholder={placeholder}
          className={inputClass}
          style={inputStyle}
        />
      </div>
    )
  }

  if (step === 'confirmed') {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20"
        style={{ background: '#0a0a0a' }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-8 mx-auto"
          style={{ background: '#1a3a1a', border: '1px solid #2a6a2a' }}
        >
          <svg className="w-8 h-8" fill="none" stroke="#4a9a4a" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        <div
          className="text-4xl mb-2"
          style={{ fontFamily: '"UnifrakturMaguntia", serif', color: '#e8d5b0' }}
        >
          Chacal
        </div>
        <p className="text-[10px] tracking-[0.5em] uppercase mb-8" style={{ color: '#8b6a3a' }}>
          Order Confirmed
        </p>

        <div
          className="border p-8 max-w-sm w-full mb-10"
          style={{ borderColor: '#2a2a2a', background: '#111' }}
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: '#4a3a2a' }}>Order number</p>
          <p className="text-xl font-semibold mb-6" style={{ color: '#c4922a' }}>#{orderNum}</p>

          <p className="text-sm leading-relaxed" style={{ color: '#6a5a4a' }}>
            A confirmation has been sent to{' '}
            <span style={{ color: '#a89070' }}>{form.email || 'your email'}</span>.
          </p>
          <p className="text-sm mt-3" style={{ color: '#6a5a4a' }}>
            Ships to {form.city || 'your address'} within 3–5 business days.
          </p>
        </div>

        <Link
          href="/shop"
          className="px-8 py-3 text-xs tracking-[0.3em] uppercase"
          style={{ background: '#8b1a1a', color: '#e8d5b0' }}
        >
          Keep Shopping
        </Link>
      </div>
    )
  }

  const stepIndex = steps.indexOf(step)

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a' }}>
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" style={{ fontFamily: '"UnifrakturMaguntia", serif', fontSize: '2rem', color: '#e8d5b0' }}>
            Chacal
          </Link>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-0 mb-12">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  className="w-7 h-7 flex items-center justify-center text-xs font-bold border transition-all duration-300"
                  style={{
                    borderColor: i <= stepIndex ? '#8b1a1a' : '#2a2a2a',
                    background: i < stepIndex ? '#8b1a1a' : i === stepIndex ? '#8b1a1a20' : 'transparent',
                    color: i <= stepIndex ? '#e8d5b0' : '#4a3a2a',
                  }}
                >
                  {i < stepIndex ? '✓' : i + 1}
                </div>
                <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: i <= stepIndex ? '#8b6a3a' : '#3a2a1a' }}>
                  {stepLabels[s as keyof typeof stepLabels]}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="w-16 h-px mx-3 mb-4" style={{ background: i < stepIndex ? '#8b1a1a' : '#2a2a2a' }} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Form */}
          <div className="border p-8" style={{ borderColor: '#2a2a2a', background: '#111' }}>
            <h2
              className="text-xl mb-8"
              style={{ fontFamily: 'Oswald, sans-serif', color: '#e8d5b0', fontWeight: 500, letterSpacing: '0.1em' }}
            >
              {stepLabels[step as keyof typeof stepLabels]}
            </h2>

            {step === 'contact' && (
              <div className="grid grid-cols-2 gap-4">
                <Field label="First Name" name="firstName" half />
                <Field label="Last Name" name="lastName" half />
                <Field label="Email" name="email" type="email" placeholder="you@example.com" />
                <Field label="Phone" name="phone" type="tel" placeholder="+1 (000) 000-0000" />
              </div>
            )}

            {step === 'shipping' && (
              <div className="grid grid-cols-2 gap-4">
                <Field label="Address" name="address" placeholder="123 Street Ave" />
                <Field label="City" name="city" half />
                <Field label="State / Province" name="state" half />
                <Field label="ZIP / Postal Code" name="zip" half />
                <Field label="Country" name="country" half />
              </div>
            )}

            {step === 'payment' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 p-3 border text-xs tracking-[0.2em] uppercase flex items-center gap-2" style={{ borderColor: '#2a4a2a', background: '#0a1a0a', color: '#4a8a4a' }}>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                  </svg>
                  SSL Encrypted · Secure Checkout
                </div>
                <Field label="Name on Card" name="cardName" />
                <Field label="Card Number" name="cardNumber" placeholder="1234 5678 9012 3456" />
                <Field label="Expiry (MM/YY)" name="expiry" placeholder="MM/YY" half />
                <Field label="CVV" name="cvv" placeholder="123" half />
              </div>
            )}

            <div className="flex gap-3 mt-8">
              {step !== 'contact' && (
                <button
                  onClick={() => setStep(steps[stepIndex - 1])}
                  className="px-6 py-3 text-xs tracking-[0.25em] uppercase border transition-colors hover:border-chacal-cream"
                  style={{ borderColor: '#2a2a2a', color: '#6a5a4a' }}
                >
                  ← Back
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={processing}
                className="flex-1 py-3 text-sm tracking-[0.3em] uppercase font-semibold transition-all duration-200"
                style={{
                  background: processing ? '#4a1a1a' : '#8b1a1a',
                  color: '#e8d5b0',
                }}
              >
                {processing
                  ? 'Processing...'
                  : step === 'payment'
                  ? 'Place Order'
                  : 'Continue →'}
              </button>
            </div>
          </div>

          {/* Order summary */}
          <div>
            <div className="border p-6" style={{ borderColor: '#2a2a2a', background: '#111' }}>
              <p className="text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: '#8b1a1a' }}>
                Order Summary
              </p>

              <div className="flex flex-col gap-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 shrink-0 border flex items-center justify-center"
                      style={{ borderColor: '#2a2a2a', background: '#0f0f0f' }}
                    >
                      <span
                        className="text-xs"
                        style={{ fontFamily: '"UnifrakturMaguntia", serif', color: '#8b6a3a' }}
                      >
                        C
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs truncate" style={{ color: '#a89070' }}>{item.product.name}</p>
                      <p className="text-[10px]" style={{ color: '#4a3a2a' }}>
                        {item.size} · Qty {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-semibold shrink-0" style={{ color: '#c4922a' }}>
                      ${item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px mb-4" style={{ background: '#1a1a1a' }} />

              <div className="flex justify-between text-sm mb-2">
                <span style={{ color: '#6a5a4a' }}>Subtotal</span>
                <span style={{ color: '#a89070' }}>${total}</span>
              </div>
              <div className="flex justify-between text-sm mb-4">
                <span style={{ color: '#6a5a4a' }}>Shipping</span>
                <span style={{ color: '#6a5a4a' }}>Free</span>
              </div>

              <div className="h-px mb-4" style={{ background: '#1a1a1a' }} />

              <div className="flex justify-between">
                <span className="text-sm font-semibold" style={{ color: '#e8d5b0' }}>Total</span>
                <span className="text-lg font-bold" style={{ color: '#c4922a' }}>${total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
