'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'

export default function Navbar() {
  const { itemCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ background: 'rgba(10,10,10,0.95)', borderColor: '#2a2a2a', backdropFilter: 'blur(8px)' }}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none">
          <span
            className="text-2xl"
            style={{
              fontFamily: '"UnifrakturMaguntia", serif',
              color: '#e8d5b0',
              textShadow: '0 0 15px #8b1a1a80',
            }}
          >
            Chacal
          </span>
          <span className="text-[8px] tracking-[0.35em] uppercase" style={{ color: '#8b6a3a' }}>
            Old School
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { href: '/shop', label: 'Shop' },
            { href: '/shop?cat=tees', label: 'Tees' },
            { href: '/shop?cat=hats', label: 'Hats' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-xs tracking-[0.25em] uppercase transition-colors hover:text-chacal-cream"
              style={{ color: '#a89070' }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative group">
            <svg
              className="w-5 h-5 transition-colors"
              style={{ color: '#a89070' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            {itemCount > 0 && (
              <span
                className="absolute -top-2 -right-2 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: '#8b1a1a', color: '#e8d5b0' }}
              >
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: '#a89070' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t px-4 py-4 flex flex-col gap-4"
          style={{ borderColor: '#2a2a2a', background: '#0a0a0a' }}
        >
          {[
            { href: '/shop', label: 'Shop All' },
            { href: '/shop?cat=tees', label: 'Tees' },
            { href: '/shop?cat=hats', label: 'Hats' },
            { href: '/cart', label: `Cart (${itemCount})` },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-[0.2em] uppercase"
              style={{ color: '#a89070' }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
