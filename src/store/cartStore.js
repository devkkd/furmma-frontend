// src/store/cartStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const items = get().items
        const found = items.find(i => i.productId === product.id)

        if (found) {
          set({
            items: items.map(i =>
              i.productId === product.id
                ? { ...i, qty: i.qty + 1 }
                : i
            ),
          })
        } else {
          set({
            items: [...items, { productId: product.id, qty: 1 }],
          })
        }
      },
    }),
    { name: 'guest-cart' }
  )
)
