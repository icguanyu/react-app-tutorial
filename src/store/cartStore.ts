// @ts-nocheck
import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─────────────────────────────────────────────────────────────
// Zustand store 結構說明
//
// Vue Pinia 對照：
//   create(...)        → defineStore(...)
//   store 內的值       → state: () => ({})
//   store 內的函式     → actions: {}
//   useCartStore(s=>s.xxx) → storeToRefs() 或直接 store.xxx
//
// Zustand 把 state 和 actions 全部放在同一個物件裡，
// 不像 Pinia 分成 state / getters / actions 三區塊。
// ─────────────────────────────────────────────────────────────

export const useCartStore = create(

  // persist middleware：自動把 state 同步到 localStorage
  // 等同於 Pinia 的 pinia-plugin-persistedstate
  persist(

    // (set, get) 是 Zustand 提供的兩個工具：
    //   set(fn)  → 更新 state，類似 Pinia action 內的 this.xxx = yyy
    //   get()    → 在 action 內讀取當前 state（不透過參數時用）
    (set, get) => ({

      // ── State ──────────────────────────────────────────────
      // 直接宣告初始值，對應 Pinia 的 state: () => ({ items: [] })
      items: [],

      // ── Actions ────────────────────────────────────────────
      // 每個 action 都是一個函式，透過 set() 回傳新的 state 片段。
      // Zustand 會自動把回傳的物件 merge 進現有 state，
      // 所以只需要寫「有變動的部分」，其他 key 不受影響。

      addItem: (product) =>
        set((state) => {
          // set 的參數可以是函式（接收舊 state），也可以直接是物件。
          // 有需要讀舊值時用函式，不需要時直接傳物件即可。
          const existing = state.items.find((i) => i.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
              ),
            };
          }
          return { items: [...state.items, { ...product, qty: 1 }] };
        }),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      increment: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, qty: i.qty + 1 } : i,
          ),
        })),

      decrement: (id) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
            .filter((i) => i.qty > 0),
        })),
    }),

    // persist 設定物件
    {
      name: "cart", // localStorage 存入的 key 名稱
      // 預設會把整個 state 都存入。
      // 如果只想存部分欄位，可以加：
      // partialize: (state) => ({ items: state.items }),
    },
  ),
);

// ─────────────────────────────────────────────────────────────
// 在組件內使用方式：
//
//   // 只訂閱需要的值，其他值改變時這個組件不會重新 render
//   const items = useCartStore((state) => state.items)
//   const addItem = useCartStore((state) => state.addItem)
//
//   // Selector 也可以做衍生計算（對應 Pinia 的 getters）
//   const total = useCartStore((state) =>
//     state.items.reduce((sum, i) => sum + i.price * i.qty, 0)
//   )
//
//   // 不推薦：訂閱整個 store，任何值變動都會重新 render
//   const store = useCartStore()
// ─────────────────────────────────────────────────────────────
