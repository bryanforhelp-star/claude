'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { getProductById, products } from '@/lib/products'
import { useCart } from '@/context/CartContext'
import ProductImage from '@/components/ProductImage'
import ProductCard from '@/components/ProductCard'

export default function ProductPage() {
  const { id } = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const product = getProductById(id as string)
  const [selectedSize, setSelectedSize] = useState('')
  const [added, setAdded] = useState(false)
  const [error, setError] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0a' }}>
        <div className="text-center">
          <p style={{ color: '#8b6a3a' }}>Product not found.</p>
          <Link href="/shop" className="text-sm mt-4 block" style={{ color: '#8b1a1a' }}>
            ← Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  function handleAddToCart() {
    if (!selectedSize) {
      setError(true)
      setTimeout(() => setError(false), 2000)
      return
    }
    addItem(product!, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a' }}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-10 text-xs tracking-[0.2em] uppercase" style={{ color: '#4a3a2a' }}>
          <Link href="/shop" className="hover:text-chacal-cream transition-colors">Shop</Link>
          <span>·</span>
          <span style={{ color: '#8b6a3a' }}>{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="border" style={{ borderColor: '#2a2a2a' }}>
            <ProductImage product={product} className="w-full aspect-square" />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                {product.badge && (
                  <span
                    className="inline-block text-[9px] tracking-[0.3em] uppercase px-2 py-1 mb-3"
                    style={{ background: '#8b1a1a', color: '#e8d5b0' }}
                  >
                    {product.badge}
                  </span>
                )}
                <h1
                  className="text-2xl md:text-3xl"
                  style={{ fontFamily: 'Oswald, sans-serif', color: '#e8d5b0', fontWeight: 600, letterSpacing: '0.05em' }}
                >
                  {product.name}
                </h1>
                <p className="text-xs tracking-[0.25em] uppercase mt-1" style={{ color: '#8b6a3a' }}>
                  {product.category}
                </p>
              </div>
              <p className="text-2xl font-semibold shrink-0" style={{ color: '#c4922a' }}>
                ${product.price}
              </p>
            </div>

            <div className="h-px my-6" style={{ background: '#2a2a2a' }} />

            <p className="text-sm leading-relaxed mb-8" style={{ color: '#8a7060', fontWeight: 300 }}>
              {product.description}
            </p>

            {/* Size picker */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] tracking-[0.3em] uppercase" style={{ color: '#8b6a3a' }}>
                  Size
                </span>
                {error && (
                  <span className="text-[11px] tracking-[0.2em] uppercase" style={{ color: '#8b1a1a' }}>
                    Select a size
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="px-4 py-2 text-xs tracking-[0.2em] uppercase border transition-all duration-200"
                    style={{
                      borderColor: selectedSize === size ? '#8b1a1a' : error ? '#4a1a1a' : '#2a2a2a',
                      color: selectedSize === size ? '#e8d5b0' : '#6a5a4a',
                      background: selectedSize === size ? '#8b1a1a20' : 'transparent',
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 text-sm tracking-[0.3em] uppercase font-semibold transition-all duration-300"
              style={{
                background: added ? '#1a4a1a' : '#8b1a1a',
                color: '#e8d5b0',
                border: `1px solid ${added ? '#2a6a2a' : '#8b1a1a'}`,
              }}
            >
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>

            {added && (
              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => router.push('/cart')}
                  className="flex-1 py-3 text-xs tracking-[0.2em] uppercase border transition-colors hover:border-chacal-cream"
                  style={{ borderColor: '#2a2a2a', color: '#8b6a3a' }}
                >
                  View Cart
                </button>
                <button
                  onClick={() => router.push('/checkout')}
                  className="flex-1 py-3 text-xs tracking-[0.2em] uppercase border transition-colors"
                  style={{ borderColor: '#c4922a', color: '#c4922a' }}
                >
                  Checkout →
                </button>
              </div>
            )}

            <div className="h-px my-8" style={{ background: '#2a2a2a' }} />

            {/* Details */}
            <div>
              <p className="text-[10px] tracking-[0.35em] uppercase mb-4" style={{ color: '#8b1a1a' }}>
                Details
              </p>
              <ul className="flex flex-col gap-2">
                {product.details.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm" style={{ color: '#6a5a4a' }}>
                    <span style={{ color: '#8b1a1a' }}>·</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-24">
            <div className="h-px mb-12" style={{ background: '#2a2a2a' }} />
            <p className="text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color: '#8b1a1a' }}>
              You might also like
            </p>
            <h3
              className="text-2xl mb-8"
              style={{ fontFamily: 'Oswald, sans-serif', color: '#e8d5b0', fontWeight: 500 }}
            >
              More {product.category === 'tees' ? 'Tees' : 'Hats'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
