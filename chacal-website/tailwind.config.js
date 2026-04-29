/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'chacal-black': '#0a0a0a',
        'chacal-dark': '#111111',
        'chacal-card': '#161616',
        'chacal-crimson': '#8b1a1a',
        'chacal-red': '#b91c1c',
        'chacal-red-bright': '#dc2626',
        'chacal-gold': '#c4922a',
        'chacal-cream': '#e8d5b0',
        'chacal-cream-dim': '#a89070',
        'chacal-border': '#2a2a2a',
      },
      fontFamily: {
        gothic: ['var(--font-gothic)', 'serif'],
        heading: ['var(--font-heading)', 'sans-serif'],
      },
      backgroundImage: {
        'flame-gradient': 'linear-gradient(to top, #8b1a1a 0%, #c4922a 40%, transparent 70%)',
        'card-gradient': 'linear-gradient(135deg, #161616 0%, #0f0f0f 100%)',
      },
    },
  },
  plugins: [],
}
