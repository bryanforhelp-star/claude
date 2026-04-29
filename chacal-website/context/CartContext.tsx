'use client'

import { createContext, useContext, useEffect, useReducer } from 'react'
import type { Product } from '@/lib/products'

export type CartItem = {
  product: Product
  size: string
  quantity: number
}

type CartState = { items: CartItem[] }

type CartAction =
  | { type: 'ADD'; product: Product; size: string }
  | { type: 'REMOVE'; productId: string; size: string }
  | { type: 'UPDATE_QTY'; productId: string; size: string; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; items: CartItem[] }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return { items: action.items }
    case 'ADD': {
      const existing = state.items.find(
        (i) => i.product.id === action.product.id && i.size === action.size
      )
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id && i.size === action.size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        }
      }
      return {
        items: [...state.items, { product: action.product, size: action.size, quantity: 1 }],
      }
    }
    case 'REMOVE':
      return {
        items: state.items.filter(
          (i) => !(i.product.id === action.productId && i.size === action.size)
        ),
      }
    case 'UPDATE_QTY':
      if (action.quantity <= 0) {
        return {
          items: state.items.filter(
            (i) => !(i.product.id === action.productId && i.size === action.size)
          ),
        }
      }
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId && i.size === action.size
            ? { ...i, quantity: action.quantity }
            : i
        ),
      }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

type CartContextType = {
  items: CartItem[]
  addItem: (product: Product, size: string) => void
  removeItem: (productId: string, size: string) => void
  updateQty: (productId: string, size: string, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  useEffect(() => {
    const saved = localStorage.getItem('chacal-cart')
    if (saved) {
      try {
        dispatch({ type: 'HYDRATE', items: JSON.parse(saved) })
      } catch {}
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('chacal-cart', JSON.stringify(state.items))
  }, [state.items])

  const total = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem: (product, size) => dispatch({ type: 'ADD', product, size }),
        removeItem: (productId, size) => dispatch({ type: 'REMOVE', productId, size }),
        updateQty: (productId, size, quantity) =>
          dispatch({ type: 'UPDATE_QTY', productId, size, quantity }),
        clearCart: () => dispatch({ type: 'CLEAR' }),
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
