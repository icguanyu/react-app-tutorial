import { create } from 'zustand'

// Vue 等價: const count = ref(0)
//           const increment = () => count.value++
//           → 但 Zustand 是全域的，不需要 provide/inject

interface CounterStore {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))
