export type Product = {
  id: string
  name: string
  category: 'tees' | 'hats'
  price: number
  sizes: string[]
  description: string
  badge?: string
  details: string[]
}

export const products: Product[] = [
  {
    id: 'classic-tee',
    name: 'Classic Wolf Tee',
    category: 'tees',
    price: 45,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    badge: 'BESTSELLER',
    description: 'The one that started it all. Wolf crest on the chest, heavy black cotton built to last.',
    details: [
      '100% heavyweight cotton, 280gsm',
      'Screen-printed wolf crest',
      'Distressed vintage finish',
      'Unisex relaxed fit',
      'Machine wash cold',
    ],
  },
  {
    id: 'old-school-tee',
    name: 'Old School Tee',
    category: 'tees',
    price: 45,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    description: 'Gothic lettering across the back. The streets know what this means.',
    details: [
      '100% heavyweight cotton, 280gsm',
      'Gothic back print',
      'Small logo on chest',
      'Unisex relaxed fit',
      'Machine wash cold',
    ],
  },
  {
    id: 'flames-tee',
    name: 'Flames Tee',
    category: 'tees',
    price: 50,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    badge: 'NEW',
    description: 'Full back graphic. Fire doesn\'t bow to anything — neither do you.',
    details: [
      '100% heavyweight cotton, 280gsm',
      'Full back flame graphic',
      'Embroidered chest logo',
      'Oversized fit',
      'Machine wash cold',
    ],
  },
  {
    id: 'classic-snapback',
    name: 'Chacal Snapback',
    category: 'hats',
    price: 35,
    sizes: ['ONE SIZE'],
    badge: 'BESTSELLER',
    description: 'Structured black snapback. Embroidered wolf logo. No explanation needed.',
    details: [
      'Structured 6-panel snapback',
      'Embroidered wolf logo',
      'Flat brim',
      'Adjustable snap closure',
      'One size fits most',
    ],
  },
  {
    id: 'wolf-dad-hat',
    name: 'Wolf Dad Hat',
    category: 'hats',
    price: 30,
    sizes: ['ONE SIZE'],
    description: 'Low-profile, unstructured. Understated but you know what it means.',
    details: [
      'Unstructured 6-panel dad hat',
      'Embroidered wolf',
      'Curved brim',
      'Adjustable strap',
      'One size fits most',
    ],
  },
  {
    id: 'gothic-tee',
    name: 'Gothic Script Tee',
    category: 'tees',
    price: 48,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    badge: 'NEW',
    description: 'CALLE · LEALTAD · RESPETO · FUERZA · LIBERTAD. Every word earned.',
    details: [
      '100% heavyweight cotton, 280gsm',
      'Gothic script front print',
      'Values text on sleeve',
      'Boxy oversized fit',
      'Machine wash cold',
    ],
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: 'tees' | 'hats'): Product[] {
  return products.filter((p) => p.category === category)
}
