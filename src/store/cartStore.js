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
            items: [...items, { productId: product.id, qty: 1, product: { id: product.id, name: product.name, image: product.image || product.images?.[0], price: product.price } }],
          })
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter(i => i.productId !== productId) })
      },
      updateQty: (productId, qty) => {
        if (qty < 1) return
        set({
          items: get().items.map(i =>
            i.productId === productId ? { ...i, qty } : i
          ),
        })
      },
    }),
    { name: 'guest-cart' }
  )
)
