import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t mt-24" style={{ borderColor: '#2a2a2a', background: '#0a0a0a' }}>
      {/* Values strip */}
      <div
        className="border-b py-4 overflow-hidden"
        style={{ borderColor: '#1a1a1a', background: '#0d0d0d' }}
      >
        <div className="flex gap-12 animate-none whitespace-nowrap px-8">
          {['CALLE', 'LEALTAD', 'RESPETO', 'FUERZA', 'LIBERTAD', 'CALLE', 'LEALTAD', 'RESPETO', 'FUERZA', 'LIBERTAD'].map((word, i) => (
            <span
              key={i}
              className="text-xs tracking-[0.4em] font-bold"
              style={{ color: i % 2 === 0 ? '#8b1a1a' : '#4a3a1a' }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <div
            className="text-3xl mb-2"
            style={{ fontFamily: '"UnifrakturMaguntia", serif', color: '#e8d5b0' }}
          >
            Chacal
          </div>
          <div className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: '#8b6a3a' }}>
            Old School · Est. MMXXIV
          </div>
          <p className="text-sm leading-relaxed" style={{ color: '#6a5a4a' }}>
            A chacal adapts to anything. Stands out from everyone.
          </p>
        </div>

        {/* Links */}
        <div>
          <div className="text-[10px] tracking-[0.35em] uppercase mb-5" style={{ color: '#8b1a1a' }}>
            Shop
          </div>
          <div className="flex flex-col gap-3">
            {[
              { href: '/shop', label: 'All Products' },
              { href: '/shop?cat=tees', label: 'Tees' },
              { href: '/shop?cat=hats', label: 'Hats' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm transition-colors hover:text-chacal-cream"
                style={{ color: '#6a5a4a' }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact / Social */}
        <div>
          <div className="text-[10px] tracking-[0.35em] uppercase mb-5" style={{ color: '#8b1a1a' }}>
            Connect
          </div>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Instagram', href: '#' },
              { label: 'TikTok', href: '#' },
              { label: 'Contact', href: 'mailto:info@chacaloldschool.com' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-sm transition-colors hover:text-chacal-cream"
                style={{ color: '#6a5a4a' }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        className="border-t px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderColor: '#1a1a1a' }}
      >
        <span className="text-xs" style={{ color: '#3a2a1a' }}>
          © 2024 Chacal Old School. All rights reserved.
        </span>
        <div className="flex gap-6">
          {['Privacy', 'Terms', 'Shipping'].map((l) => (
            <a key={l} href="#" className="text-xs" style={{ color: '#3a2a1a' }}>
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
