// React 筆記內可以直接操作的練習頁面，key 對應 react.ts 的 lesson id
import App from "@/App";
import Demo from "@/demo";
import ApiTest from "@/pages/apitest";
import ShopPage from "@/pages/shop";
import ShopZustandPage from "@/pages/shop-zustand";
import ShopReduxPage from "@/pages/shop-redux";

export const reactPreviews = {
  "todo-components": App,
  "zustand-hook-rules": Demo,
  "use-effect": ApiTest,
  "cart-context": ShopPage,
  "cart-zustand": ShopZustandPage,
  "cart-redux": ShopReduxPage,
};
