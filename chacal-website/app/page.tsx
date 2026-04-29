import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { products } from '@/lib/products'

const featured = products.filter((p) => p.badge === 'BESTSELLER').slice(0, 3)

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
        style={{ background: '#0a0a0a' }}
      >
        {/* Background texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 80% 60% at 50% 100%, #8b1a1a18 0%, transparent 70%),
              radial-gradient(ellipse 40% 40% at 50% 80%, #c4922a08 0%, transparent 60%)
            `,
          }}
        />

        {/* Flame lines at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, #8b1a1a, transparent)' }}
        />

        {/* Corner accents */}
        <div className="absolute top-8 left-8 text-[10px] tracking-[0.4em] uppercase opacity-40" style={{ color: '#8b1a1a' }}>
          MARCA DE ROPA
        </div>
        <div className="absolute top-8 right-8 text-[10px] tracking-[0.4em] uppercase opacity-40 text-right" style={{ color: '#8b6a3a' }}>
          CALLE<br />ACTITUD<br />HISTORIA
        </div>

        {/* Main brand name */}
        <div className="relative z-10">
          <p className="text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: '#8b1a1a' }}>
            Est. MMXXIV
          </p>

          <h1
            className="leading-none mb-2"
            style={{
              fontFamily: '"UnifrakturMaguntia", serif',
              fontSize: 'clamp(5rem, 18vw, 14rem)',
              color: '#e8d5b0',
              textShadow: '0 0 40px #8b1a1a60, 0 0 80px #8b1a1a30, 0 0 160px #8b1a1a15',
            }}
          >
            Chacal
          </h1>

          <div
            className="inline-flex items-center gap-4 px-6 py-1.5 border mb-8"
            style={{ borderColor: '#8b6a3a', background: '#8b6a3a15' }}
          >
            <span className="w-8 h-px" style={{ background: '#8b6a3a' }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: '#8b6a3a' }}>
              Old School
            </span>
            <span className="w-8 h-px" style={{ background: '#8b6a3a' }} />
          </div>

          <p
            className="text-lg md:text-xl max-w-lg mx-auto leading-relaxed mb-12"
            style={{ color: '#a89070', fontFamily: 'Oswald, sans-serif', fontWeight: 300, letterSpacing: '0.05em' }}
          >
            Adapt to anything.
            <br />
            <span style={{ color: '#e8d5b0', fontWeight: 500 }}>Stand out from everyone.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="px-10 py-4 text-sm tracking-[0.3em] uppercase font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: '#8b1a1a',
                color: '#e8d5b0',
                border: '1px solid #8b1a1a',
              }}
            >
              Shop the Collection
            </Link>
            <Link
              href="/shop?cat=hats"
              className="px-10 py-4 text-sm tracking-[0.3em] uppercase font-semibold transition-all duration-300 hover:border-chacal-cream"
              style={{
                background: 'transparent',
                color: '#a89070',
                border: '1px solid #2a2a2a',
              }}
            >
              Hats
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: '#8b6a3a' }}>Scroll</span>
          <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, #8b6a3a, transparent)' }} />
        </div>
      </section>

      {/* WHAT IS A CHACAL */}
      <section className="py-32 px-6" style={{ background: '#0d0d0d' }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, #8b1a1a)' }} />
            <span className="text-[10px] tracking-[0.5em] uppercase" style={{ color: '#8b1a1a' }}>
              Historial
            </span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, #8b1a1a)' }} />
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2
                className="mb-6"
                style={{
                  fontFamily: '"UnifrakturMaguntia", serif',
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  color: '#e8d5b0',
                  lineHeight: 1.1,
                }}
              >
                What is a Chacal?
              </h2>
              <p className="text-base leading-loose mb-6" style={{ color: '#8a7060', fontWeight: 300 }}>
                A chacal isn&apos;t defined by where they come from. It&apos;s someone who can adapt to
                any environment, any crowd, any situation — and still stand out.
              </p>
              <p className="text-base leading-loose mb-8" style={{ color: '#8a7060', fontWeight: 300 }}>
                Not a follower. Not a fraud. A chacal moves through the world on their own terms.
                Different by nature. Unbreakable by choice.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Calle', 'Lealtad', 'Respeto', 'Fuerza', 'Libertad'].map((word) => (
                  <span
                    key={word}
                    className="text-[10px] tracking-[0.3em] uppercase px-3 py-1.5 border"
                    style={{ borderColor: '#2a2a2a', color: '#8b6a3a' }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="relative border p-8 flex flex-col items-center justify-center aspect-square"
              style={{ borderColor: '#2a2a2a', background: 'linear-gradient(145deg, #111 0%, #0d0d0d 100%)' }}
            >
              {/* Decorative wolf crest placeholder */}
              <div
                className="text-8xl mb-4 opacity-20"
                style={{
                  fontFamily: '"UnifrakturMaguntia", serif',
                  color: '#8b1a1a',
                }}
              >
                C
              </div>
              <svg viewBox="0 0 120 120" className="w-32 h-32 opacity-15" fill="#8b1a1a">
                <path d="M60 10 C44 10 30 20 24 36 C16 32 8 36 8 44 C8 52 16 56 24 52 C22 60 24 70 30 78 C34 84 40 88 48 90 L48 104 L56 104 L56 96 L64 96 L64 104 L72 104 L72 90 C80 88 86 84 90 78 C96 70 98 60 96 52 C104 56 112 52 112 44 C112 36 104 32 96 36 C90 20 76 10 60 10Z" />
                <circle cx="45" cy="44" r="4" fill="#e8d5b0" opacity="0.5" />
                <circle cx="75" cy="44" r="4" fill="#e8d5b0" opacity="0.5" />
              </svg>
              <div
                className="text-xs tracking-[0.3em] uppercase mt-4"
                style={{ color: '#4a3a2a' }}
              >
                Est. MMXXIV
              </div>

              {/* Corner lines */}
              {[
                'top-0 left-0 border-t border-l',
                'top-0 right-0 border-t border-r',
                'bottom-0 left-0 border-b border-l',
                'bottom-0 right-0 border-b border-r',
              ].map((cls, i) => (
                <div
                  key={i}
                  className={`absolute w-6 h-6 ${cls}`}
                  style={{ borderColor: '#8b1a1a' }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-24 px-6" style={{ background: '#0a0a0a' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[10px] tracking-[0.5em] uppercase mb-2" style={{ color: '#8b1a1a' }}>
                The Collection
              </p>
              <h2
                className="text-3xl md:text-4xl"
                style={{ fontFamily: 'Oswald, sans-serif', color: '#e8d5b0', fontWeight: 600, letterSpacing: '0.05em' }}
              >
                Bestsellers
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs tracking-[0.25em] uppercase transition-colors hidden md:block"
              style={{ color: '#8b6a3a' }}
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link
              href="/shop"
              className="text-xs tracking-[0.25em] uppercase"
              style={{ color: '#8b6a3a' }}
            >
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* VALUES MARQUEE */}
      <section
        className="py-5 border-y overflow-hidden"
        style={{ borderColor: '#1a1a1a', background: '#0d0d0d' }}
      >
        <div className="flex gap-16 whitespace-nowrap">
          {Array.from({ length: 4 }).flatMap((_, i) =>
            ['CALLE', '·', 'LEALTAD', '·', 'RESPETO', '·', 'FUERZA', '·', 'LIBERTAD', '·'].map((w, j) => (
              <span
                key={`${i}-${j}`}
                className="text-xs tracking-[0.4em] font-semibold"
                style={{ color: w === '·' ? '#3a2a1a' : '#8b1a1a' }}
              >
                {w}
              </span>
            ))
          )}
        </div>
      </section>
    </>
  )
}
