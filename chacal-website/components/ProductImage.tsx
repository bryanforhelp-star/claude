import type { Product } from '@/lib/products'

type Props = {
  product: Product
  className?: string
}

export default function ProductImage({ product, className = '' }: Props) {
  return (
    <div
      className={`relative overflow-hidden flex items-end justify-center ${className}`}
      style={{ background: '#0d0d0d' }}
    >
      {/* Subtle red glow from below */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 35% at 50% 100%, #8b1a1a28 0%, transparent 65%)',
        }}
      />

      {/* Flame-shaped light lines */}
      <svg
        viewBox="0 0 200 300"
        className="absolute bottom-0 left-0 right-0 w-full opacity-10"
        preserveAspectRatio="none"
        style={{ height: '55%' }}
        aria-hidden="true"
      >
        <path
          d="M 60 300 C 55 260 65 220 58 180 C 52 145 60 110 55 80 C 53 68 65 62 68 76 C 74 105 68 150 72 195 C 78 240 75 278 75 300 Z"
          fill="#8b1a1a"
        />
        <path
          d="M 100 300 C 94 250 105 200 100 155 C 96 118 100 80 95 52 C 93 40 107 36 110 50 C 117 78 114 125 118 175 C 124 225 120 270 120 300 Z"
          fill="#8b1a1a"
        />
        <path
          d="M 140 300 C 135 265 148 230 144 195 C 141 165 146 130 140 105 C 138 94 150 88 153 100 C 159 125 156 165 159 200 C 163 235 160 270 160 300 Z"
          fill="#8b1a1a"
        />
      </svg>

      {/* Center content */}
      <div className="relative z-10 w-full text-center pb-6 pt-10">
        <div
          style={{
            fontFamily: '"UnifrakturMaguntia", serif',
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            color: '#e8d5b0',
            lineHeight: 1,
            textShadow: '0 0 30px #8b1a1a60',
          }}
        >
          Chacal
        </div>
        <div
          style={{
            fontFamily: 'Oswald, sans-serif',
            fontSize: '0.6rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#3a2a1a',
            marginTop: '0.4rem',
          }}
        >
          {product.category === 'tees' ? 'Old School Tee' : 'Old School Hat'}
        </div>
      </div>

      {product.badge && (
        <div
          className="absolute top-3 right-3"
          style={{
            fontFamily: 'Oswald, sans-serif',
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            padding: '0.3rem 0.6rem',
            background: '#8b1a1a',
            color: '#e8d5b0',
          }}
        >
          {product.badge}
        </div>
      )}
    </div>
  )
}
