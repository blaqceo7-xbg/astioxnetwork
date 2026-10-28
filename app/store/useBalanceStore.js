// app/store/useBalanceStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useBalanceStore = create(
  persist(
    (set) => ({
      isVisible: true, // default state
      isVisible2: true, // default state

      toggleVisibility: () =>
        set((state) => ({ isVisible: !state.isVisible })),

      setVisibility: (value) =>
        set({ isVisible: value }),

      toggleVisibility2: () =>
        set((state) => ({ isVisible2: !state.isVisible2 })),

      setVisibility2: (value) =>
        set({ isVisible2: value }),
    }),
    {
      name: 'balance-visibility', // key in localStorage
      name2: 'balance-visibility2',
    }
  )
)