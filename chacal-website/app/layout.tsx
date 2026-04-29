import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CartProvider } from '@/context/CartContext'

export const metadata: Metadata = {
  title: 'Chacal Old School — Adapt to Anything',
  description:
    'A chacal adapts to any environment, any crowd, any situation — and still stands out. Different by nature. Unbreakable by choice. Est. MMXXIV.',
  openGraph: {
    title: 'Chacal Old School',
    description: 'Adapt to anything. Stand out from everyone.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <CartProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
