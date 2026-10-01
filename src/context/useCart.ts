// @ts-nocheck
import { createContext, useContext } from "react";

// Context 物件與 useCart 放在這個檔案，CartContext.tsx 只匯出 CartProvider 元件
// （同一個檔案同時匯出元件和非元件，Vite 的 Fast Refresh 就無法只熱更新元件）
export const CartContext = createContext(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart 必須在 CartProvider 內使用");
  return ctx;
}
