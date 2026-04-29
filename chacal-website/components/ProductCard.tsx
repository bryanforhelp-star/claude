import Link from 'next/link'
import ProductImage from './ProductImage'
import type { Product } from '@/lib/products'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.id}`} className="group block">
      <div
        className="overflow-hidden border transition-all duration-300 group-hover:border-chacal-crimson"
        style={{ borderColor: '#2a2a2a', background: '#111' }}
      >
        <ProductImage
          product={product}
          className="w-full aspect-[4/5] transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      <div className="mt-3 px-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-medium tracking-wide" style={{ color: '#e8d5b0' }}>
              {product.name}
            </p>
            <p className="text-[11px] tracking-[0.2em] uppercase mt-0.5" style={{ color: '#8b6a3a' }}>
              {product.category}
            </p>
          </div>
          <p className="text-sm font-semibold shrink-0" style={{ color: '#c4922a' }}>
            ${product.price}
          </p>
        </div>
      </div>
    </Link>
  )
}
