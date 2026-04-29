import type { Product } from '@/lib/products'

type Props = {
  product: Product
  className?: string
}

const categoryColors = {
  tees: { bg: '#0f0a0a', accent: '#8b1a1a' },
  hats: { bg: '#0a0a0f', accent: '#1a1a6b' },
}

export default function ProductImage({ product, className = '' }: Props) {
  const colors = categoryColors[product.category]

  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center ${className}`}
      style={{ background: `linear-gradient(145deg, ${colors.bg} 0%, #111 50%, ${colors.bg} 100%)` }}
    >
      {/* Flame glow at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3"
        style={{
          background: `linear-gradient(to top, ${colors.accent}40, transparent)`,
        }}
      />

      {/* Center content */}
      <div className="relative z-10 text-center px-4 select-none">
        <div
          className="font-gothic text-4xl md:text-5xl mb-1"
          style={{
            color: '#e8d5b0',
            textShadow: `0 0 30px ${colors.accent}, 0 0 60px ${colors.accent}60`,
            fontFamily: '"UnifrakturMaguntia", serif',
          }}
        >
          Chacal
        </div>
        <div className="text-xs tracking-[0.3em] uppercase" style={{ color: '#8b6a3a' }}>
          {product.category === 'tees' ? 'Old School Tee' : 'Old School Hat'}
        </div>

        {/* Wolf silhouette placeholder */}
        <div className="mt-3 flex justify-center">
          <svg viewBox="0 0 60 60" className="w-12 h-12 opacity-30" fill={colors.accent}>
            <path d="M30 5 C22 5 15 10 12 18 C8 16 4 18 4 22 C4 26 8 28 12 26 C11 30 12 35 15 39 C17 42 20 44 24 45 L24 52 L28 52 L28 48 L32 48 L32 52 L36 52 L36 45 C40 44 43 42 45 39 C48 35 49 30 48 26 C52 28 56 26 56 22 C56 18 52 16 48 18 C45 10 38 5 30 5Z" />
          </svg>
        </div>
      </div>

      {/* Top-left decorative text */}
      <div
        className="absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase opacity-40"
        style={{ color: colors.accent }}
      >
        MMXXIV
      </div>

      {/* Bottom-right decorative */}
      <div
        className="absolute bottom-3 right-3 text-[9px] tracking-[0.15em] uppercase opacity-40"
        style={{ color: '#8b6a3a' }}
      >
        EST.
      </div>

      {product.badge && (
        <div
          className="absolute top-3 right-3 text-[9px] tracking-[0.2em] font-bold px-2 py-1"
          style={{ background: colors.accent, color: '#e8d5b0' }}
        >
          {product.badge}
        </div>
      )}
    </div>
  )
}
