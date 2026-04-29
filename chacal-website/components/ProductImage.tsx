import type { Product } from '@/lib/products'
import ProductSilhouette from './ProductSilhouette'

type Props = {
  product: Product
  className?: string
}

export default function ProductImage({ product, className = '' }: Props) {
  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center ${className}`}
      style={{
        background:
          'linear-gradient(180deg, #0d0d0d 0%, #0a0a0a 60%, #060606 100%)',
      }}
    >
      {/* Faint red glow at the bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 40% at 50% 105%, #8b1a1a22 0%, transparent 70%)',
        }}
      />

      {/* Product silhouette */}
      <ProductSilhouette
        type={product.category === 'tees' ? 'tee' : 'hat'}
        className="w-3/5 h-3/5 relative z-10"
      />

      {/* Tiny brand mark at bottom */}
      <div
        className="absolute bottom-3 left-0 right-0 text-center"
        style={{
          fontFamily: 'Oswald, sans-serif',
          fontSize: '0.55rem',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: '#2a1a0a',
        }}
      >
        Chacal · MMXXIV
      </div>

      {product.badge && (
        <div
          className="absolute top-3 left-3"
          style={{
            fontFamily: 'Oswald, sans-serif',
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            padding: '0.25rem 0.55rem',
            background: '#8b1a1a',
            color: '#e8d5b0',
            fontWeight: 600,
          }}
        >
          {product.badge}
        </div>
      )}
    </div>
  )
}
