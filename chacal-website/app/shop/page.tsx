'use client'

import { useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { products } from '@/lib/products'

const categories = ['all', 'tees', 'hats'] as const
type Cat = (typeof categories)[number]

export default function ShopPage() {
  const [active, setActive] = useState<Cat>('all')

  const filtered =
    active === 'all' ? products : products.filter((p) => p.category === active)

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a' }}>
      {/* Header */}
      <div
        className="border-b py-16 px-6 text-center"
        style={{
          borderColor: '#2a2a2a',
          background: 'linear-gradient(to bottom, #0d0d0d, #0a0a0a)',
        }}
      >
        <p className="text-[10px] tracking-[0.5em] uppercase mb-3" style={{ color: '#8b1a1a' }}>
          Chacal Old School
        </p>
        <h1
          className="text-4xl md:text-5xl"
          style={{ fontFamily: 'Oswald, sans-serif', color: '#e8d5b0', fontWeight: 600, letterSpacing: '0.08em' }}
        >
          The Collection
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Filter tabs */}
        <div className="flex items-center gap-0 mb-12 border-b" style={{ borderColor: '#2a2a2a' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-6 py-3 text-xs tracking-[0.3em] uppercase transition-all duration-200 border-b-2 -mb-px"
              style={{
                color: active === cat ? '#e8d5b0' : '#6a5a4a',
                borderColor: active === cat ? '#8b1a1a' : 'transparent',
                background: 'transparent',
              }}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
          <span className="ml-auto text-xs" style={{ color: '#4a3a2a' }}>
            {filtered.length} item{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
