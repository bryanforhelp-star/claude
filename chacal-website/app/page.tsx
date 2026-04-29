import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import FlamesSVG from '@/components/FlamesSVG'
import { products } from '@/lib/products'

const featured = products.filter((p) => p.badge === 'BESTSELLER').slice(0, 3)

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        style={{ background: '#0a0a0a' }}
      >
        {/* Subtle red glow behind text */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 55%, #8b1a1a14 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          {/* Wordmark */}
          <h1
            style={{
              fontFamily: '"UnifrakturMaguntia", serif',
              fontSize: 'clamp(5.5rem, 20vw, 16rem)',
              color: '#e8d5b0',
              lineHeight: 0.9,
              textShadow: '0 0 80px #8b1a1a50, 0 0 160px #8b1a1a20',
            }}
          >
            Chacal
          </h1>

          <p
            className="mt-8 mb-12 max-w-md"
            style={{
              fontFamily: 'Oswald, sans-serif',
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              fontWeight: 300,
              letterSpacing: '0.12em',
              color: '#7a6a55',
              lineHeight: 1.7,
              textTransform: 'uppercase',
            }}
          >
            Doesn&apos;t follow trends.
            <br />
            <span style={{ color: '#c4922a', fontWeight: 500 }}>Builds its own lane.</span>
          </p>

          <Link
            href="/shop"
            style={{
              fontFamily: 'Oswald, sans-serif',
              fontWeight: 600,
              letterSpacing: '0.3em',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              padding: '1rem 3rem',
              background: '#8b1a1a',
              color: '#e8d5b0',
              display: 'inline-block',
              transition: 'background 0.2s',
            }}
          >
            Shop the Collection
          </Link>
        </div>

        {/* Flames at bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0">
          <FlamesSVG className="w-full" style={{ height: '220px' }} />
        </div>
      </section>

      {/* ── BRAND STATEMENT ── */}
      <section
        style={{ background: '#0a0a0a', padding: '7rem 1.5rem' }}
      >
        <div className="max-w-3xl mx-auto">
          <p
            style={{
              fontFamily: 'Oswald, sans-serif',
              fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
              fontWeight: 700,
              color: '#e8d5b0',
              lineHeight: 1.25,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            Wild, but smart.
            <br />
            <span style={{ color: '#8b1a1a' }}>Independent.</span>
            <br />
            The kind that moves alone
            <br />
            <span style={{ color: '#c4922a' }}>— and earns respect.</span>
          </p>

          <div
            style={{
              marginTop: '3rem',
              paddingTop: '3rem',
              borderTop: '1px solid #1e1e1e',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '2rem',
            }}
          >
            {[
              {
                label: 'Wild, not reckless',
                body: 'Street instinct. Reads any room.',
              },
              {
                label: 'Built different',
                body: 'Doesn\'t try to fit in. Never did.',
              },
              {
                label: 'Resilient',
                body: 'Adapts. Survives. Always finds a way.',
              },
            ].map(({ label, body }) => (
              <div key={label}>
                <p
                  style={{
                    fontFamily: 'Oswald, sans-serif',
                    fontSize: '0.7rem',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: '#8b1a1a',
                    marginBottom: '0.5rem',
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontFamily: 'Oswald, sans-serif',
                    fontSize: '0.9rem',
                    fontWeight: 300,
                    color: '#5a4a3a',
                    lineHeight: 1.6,
                  }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLLECTION ── */}
      <section style={{ background: '#0a0a0a', padding: '0 1.5rem 7rem' }}>
        <div className="max-w-6xl mx-auto">
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '3rem',
              paddingBottom: '1.5rem',
              borderBottom: '1px solid #1a1a1a',
            }}
          >
            <h2
              style={{
                fontFamily: 'Oswald, sans-serif',
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontWeight: 700,
                color: '#e8d5b0',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Bestsellers
            </h2>
            <Link
              href="/shop"
              style={{
                fontFamily: 'Oswald, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#5a4a3a',
              }}
            >
              View All →
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FLAMES DIVIDER ── */}
      <div style={{ background: '#0a0a0a', lineHeight: 0 }}>
        <FlamesSVG className="w-full" style={{ height: '180px' }} />
      </div>

      {/* ── VALUES ── */}
      <section
        style={{
          background: '#060606',
          padding: '4rem 1.5rem',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'Oswald, sans-serif',
            fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            color: '#3a2a1a',
          }}
        >
          Calle &nbsp;·&nbsp; Lealtad &nbsp;·&nbsp; Respeto &nbsp;·&nbsp; Fuerza &nbsp;·&nbsp; Libertad
        </p>
      </section>
    </>
  )
}
