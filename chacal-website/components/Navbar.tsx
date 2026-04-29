'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'

export default function Navbar() {
  const { itemCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(10,10,10,0.96)',
        borderBottom: '1px solid #1a1a1a',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', lineHeight: 1 }}>
          <span
            style={{
              fontFamily: '"UnifrakturMaguntia", serif',
              fontSize: '1.75rem',
              color: '#e8d5b0',
              display: 'block',
              lineHeight: 1,
            }}
          >
            Chacal
          </span>
        </Link>

        {/* Desktop nav */}
        <div
          className="hidden md:flex"
          style={{ alignItems: 'center', gap: '2.5rem' }}
        >
          {[
            { href: '/shop', label: 'Shop' },
            { href: '/shop?cat=tees', label: 'Tees' },
            { href: '/shop?cat=hats', label: 'Hats' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: 'Oswald, sans-serif',
                fontSize: '0.8rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#6a5a4a',
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Cart + mobile toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <Link href="/cart" style={{ position: 'relative', color: '#6a5a4a' }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            {itemCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-7px',
                  right: '-7px',
                  width: '16px',
                  height: '16px',
                  background: '#8b1a1a',
                  color: '#e8d5b0',
                  fontSize: '9px',
                  fontFamily: 'Oswald, sans-serif',
                  fontWeight: 600,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {itemCount}
              </span>
            )}
          </Link>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: '#6a5a4a', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          style={{
            borderTop: '1px solid #1a1a1a',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            background: '#0a0a0a',
          }}
        >
          {[
            { href: '/shop', label: 'Shop All' },
            { href: '/shop?cat=tees', label: 'Tees' },
            { href: '/shop?cat=hats', label: 'Hats' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'Oswald, sans-serif',
                fontSize: '0.85rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#6a5a4a',
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
