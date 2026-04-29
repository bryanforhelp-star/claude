import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import LightningSVG from '@/components/LightningSVG'
import FlamesSVG from '@/components/FlamesSVG'
import { products, getProductsByCategory } from '@/lib/products'

const tees = getProductsByCategory('tees')
const hats = getProductsByCategory('hats')

export default function HomePage() {
  return (
    <>
      {/* ── COMPACT HERO with lightning ── */}
      <section
        style={{
          position: 'relative',
          height: '52vh',
          minHeight: '420px',
          background: '#080808',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LightningSVG
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
          opacity={0.5}
        />

        {/* Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, #080808dd 80%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 1.5rem' }}>
          <h1
            style={{
              fontFamily: '"UnifrakturMaguntia", serif',
              fontSize: 'clamp(4rem, 14vw, 11rem)',
              color: '#e8d5b0',
              lineHeight: 0.9,
              margin: 0,
              textShadow: '0 0 40px #00000080',
            }}
          >
            Chacal
          </h1>
          <p
            style={{
              fontFamily: 'Oswald, sans-serif',
              fontSize: 'clamp(0.65rem, 1.2vw, 0.75rem)',
              fontWeight: 500,
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              color: '#8b6a3a',
              marginTop: '1rem',
            }}
          >
            Old School &nbsp;·&nbsp; Est. MMXXIV
          </p>
        </div>
      </section>

      {/* ── DROP STRIP ── */}
      <div
        style={{
          background: '#0a0a0a',
          borderTop: '1px solid #1a1a1a',
          borderBottom: '1px solid #1a1a1a',
          padding: '0.9rem 1.5rem',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'Oswald, sans-serif',
            fontSize: '0.7rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: '#8b6a3a',
          }}
        >
          <span style={{ color: '#dc2626' }}>●</span>&nbsp;&nbsp;Drop 01 Live Now &nbsp;·&nbsp; Free shipping over $100
        </p>
      </div>

      {/* ── NEW IN ── */}
      <section style={{ background: '#0a0a0a', padding: '4rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: '2rem',
            }}
          >
            <h2
              style={{
                fontFamily: 'Oswald, sans-serif',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#e8d5b0',
                margin: 0,
              }}
            >
              New In
            </h2>
            <Link
              href="/shop"
              style={{
                fontFamily: 'Oswald, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#5a4a3a',
                textDecoration: 'none',
              }}
            >
              View All →
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FLAMES DIVIDER ── */}
      <div style={{ background: '#0a0a0a', lineHeight: 0 }}>
        <FlamesSVG className="w-full" style={{ height: '120px', display: 'block' }} />
      </div>

      {/* ── TEES SECTION ── */}
      <section style={{ background: '#080808', padding: '4rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: '2rem',
            }}
          >
            <h2
              style={{
                fontFamily: 'Oswald, sans-serif',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#e8d5b0',
                margin: 0,
              }}
            >
              Tees
            </h2>
            <span
              style={{
                fontFamily: 'Oswald, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#3a2a1a',
              }}
            >
              {tees.length} Styles
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {tees.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HATS SECTION ── */}
      <section style={{ background: '#0a0a0a', padding: '4rem 1.5rem 5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: '2rem',
            }}
          >
            <h2
              style={{
                fontFamily: 'Oswald, sans-serif',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#e8d5b0',
                margin: 0,
              }}
            >
              Hats
            </h2>
            <span
              style={{
                fontFamily: 'Oswald, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#3a2a1a',
              }}
            >
              {hats.length} Styles
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {hats.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
