import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePetStore = create(
  persist(
    (set) => ({
      petType: "dog",

      filters: {
        category: null,
        age: null,
        size: null,
        rating: null,
        sort: null,
      },

      setPet: (type) => set({ petType: type }),

      setFilter: (key, value) =>
        set((state) => ({
          filters: {
            ...state.filters,
            [key]: value,
          },
        })),

      resetFilters: () =>
        set({
          filters: {
            category: null,
            age: null,
            size: null,
            rating: null,
            sort: null,
          },
        }),
    }),
    { name: "pet-store" }
  )
);
