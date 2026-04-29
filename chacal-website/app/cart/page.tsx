'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import ProductImage from '@/components/ProductImage'

export default function CartPage() {
  const { items, removeItem, updateQty, total, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center text-center px-6"
        style={{ background: '#0a0a0a' }}
      >
        <div
          className="text-5xl mb-2 opacity-10"
          style={{ fontFamily: '"UnifrakturMaguntia", serif', color: '#e8d5b0' }}
        >
          Chacal
        </div>
        <p className="text-sm tracking-[0.2em] uppercase mb-2" style={{ color: '#4a3a2a' }}>
          Your cart is empty
        </p>
        <p className="text-xs mb-8" style={{ color: '#3a2a1a' }}>
          Nothing here yet — go find something worth wearing.
        </p>
        <Link
          href="/shop"
          className="px-8 py-3 text-xs tracking-[0.3em] uppercase"
          style={{ background: '#8b1a1a', color: '#e8d5b0' }}
        >
          Shop Now
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a' }}>
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[10px] tracking-[0.5em] uppercase mb-1" style={{ color: '#8b1a1a' }}>
              Your Order
            </p>
            <h1
              className="text-3xl"
              style={{ fontFamily: 'Oswald, sans-serif', color: '#e8d5b0', fontWeight: 600, letterSpacing: '0.05em' }}
            >
              Cart ({items.reduce((s, i) => s + i.quantity, 0)})
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs tracking-[0.2em] uppercase transition-colors hover:text-red-500"
            style={{ color: '#4a3a2a' }}
          >
            Clear all
          </button>
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-8">
          {/* Items */}
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex gap-4 border p-4"
                style={{ borderColor: '#2a2a2a', background: '#111' }}
              >
                <div className="w-20 h-20 shrink-0 overflow-hidden">
                  <ProductImage product={item.product} className="w-full h-full" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#e8d5b0' }}>
                        {item.product.name}
                      </p>
                      <p className="text-xs tracking-[0.2em] uppercase mt-0.5" style={{ color: '#8b6a3a' }}>
                        Size: {item.size}
                      </p>
                    </div>
                    <p className="text-sm font-semibold shrink-0" style={{ color: '#c4922a' }}>
                      ${item.product.price * item.quantity}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty controls */}
                    <div className="flex items-center border" style={{ borderColor: '#2a2a2a' }}>
                      <button
                        onClick={() => updateQty(item.product.id, item.size, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-sm transition-colors hover:bg-chacal-crimson"
                        style={{ color: '#8b6a3a' }}
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm" style={{ color: '#e8d5b0' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.product.id, item.size, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-sm transition-colors hover:bg-chacal-crimson"
                        style={{ color: '#8b6a3a' }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.product.id, item.size)}
                      className="text-xs tracking-[0.15em] uppercase transition-colors hover:text-red-500"
                      style={{ color: '#4a3a2a' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div
              className="border p-6 sticky top-20"
              style={{ borderColor: '#2a2a2a', background: '#111' }}
            >
              <p className="text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: '#8b1a1a' }}>
                Order Summary
              </p>

              <div className="flex flex-col gap-3 mb-6">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="flex justify-between text-sm"
                  >
                    <span style={{ color: '#6a5a4a' }}>
                      {item.product.name} × {item.quantity}
                    </span>
                    <span style={{ color: '#a89070' }}>${item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="h-px mb-4" style={{ background: '#2a2a2a' }} />

              <div className="flex justify-between items-center mb-2">
                <span className="text-sm" style={{ color: '#a89070' }}>Subtotal</span>
                <span className="text-sm font-semibold" style={{ color: '#e8d5b0' }}>${total}</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs" style={{ color: '#6a5a4a' }}>Shipping</span>
                <span className="text-xs" style={{ color: '#6a5a4a' }}>Calculated at checkout</span>
              </div>

              <Link
                href="/checkout"
                className="block w-full py-4 text-center text-sm tracking-[0.3em] uppercase font-semibold transition-all duration-300 hover:scale-[1.02]"
                style={{ background: '#8b1a1a', color: '#e8d5b0' }}
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/shop"
                className="block text-center text-xs tracking-[0.2em] uppercase mt-4 transition-colors"
                style={{ color: '#4a3a2a' }}
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
