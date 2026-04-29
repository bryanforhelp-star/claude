import Link from 'next/link'
import FlamesSVG from '@/components/FlamesSVG'

export default function Footer() {
  return (
    <footer style={{ background: '#060606' }}>
      {/* Flames at top of footer */}
      <div style={{ lineHeight: 0 }}>
        <FlamesSVG className="w-full" style={{ height: '160px' }} flip />
      </div>

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '4rem 1.5rem 2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              fontFamily: '"UnifrakturMaguntia", serif',
              fontSize: '2.5rem',
              color: '#e8d5b0',
              marginBottom: '0.5rem',
              lineHeight: 1,
            }}
          >
            Chacal
          </div>
          <p
            style={{
              fontFamily: 'Oswald, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 300,
              letterSpacing: '0.1em',
              color: '#3a2a1a',
              marginTop: '1rem',
              lineHeight: 1.8,
            }}
          >
            Adapt to anything.
            <br />
            Stand out from everyone.
          </p>
        </div>

        {/* Shop */}
        <div>
          <p
            style={{
              fontFamily: 'Oswald, sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#8b1a1a',
              marginBottom: '1.25rem',
            }}
          >
            Shop
          </p>
          {[
            { href: '/shop', label: 'All Products' },
            { href: '/shop?cat=tees', label: 'Tees' },
            { href: '/shop?cat=hats', label: 'Hats' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: 'Oswald, sans-serif',
                fontSize: '0.85rem',
                fontWeight: 300,
                color: '#3a2a1a',
                display: 'block',
                marginBottom: '0.75rem',
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Connect */}
        <div>
          <p
            style={{
              fontFamily: 'Oswald, sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#8b1a1a',
              marginBottom: '1.25rem',
            }}
          >
            Connect
          </p>
          {[
            { label: 'Instagram', href: '#' },
            { label: 'TikTok', href: '#' },
            { label: 'Contact', href: 'mailto:info@chacaloldschool.com' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{
                fontFamily: 'Oswald, sans-serif',
                fontSize: '0.85rem',
                fontWeight: 300,
                color: '#3a2a1a',
                display: 'block',
                marginBottom: '0.75rem',
                textDecoration: 'none',
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid #111',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <p
          style={{
            fontFamily: 'Oswald, sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            color: '#2a1a0a',
            textTransform: 'uppercase',
          }}
        >
          © 2024 Chacal Old School · Est. MMXXIV
        </p>
      </div>
    </footer>
  )
}
