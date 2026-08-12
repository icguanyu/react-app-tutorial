import { createSlice } from "@reduxjs/toolkit";

// Redux 術語對照 Zustand / Pinia：
//   slice   → 一個功能模組的 store（類似 Pinia 的一個 defineStore）
//   state   → 初始資料
//   reducer → action（負責更新 state 的函式）
//   action  → reducer 對外暴露的呼叫介面

const cartSlice = createSlice({
  name: "cart", // slice 名稱，Redux DevTools 裡會顯示

  // 初始 state，對應 Zustand 的 items: []
  initialState: {
    items: [],
  },

  // reducers：定義所有會改變 state 的操作
  // Redux Toolkit 內部用 immer，所以可以直接「修改」state，
  // 不需要像原始 Redux 一樣手動 return 新物件
  reducers: {
    addItem: (state, action) => {
      // action.payload = 呼叫時傳進來的參數（product）
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.qty += 1; // immer 讓你直接改，不用 spread
      } else {
        state.items.push({ ...action.payload, qty: 1 });
      }
    },

    removeItem: (state, action) => {
      // action.payload = id
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    increment: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.qty += 1;
    },

    decrement: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.qty -= 1;
        if (item.qty === 0) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
    },
  },
});

// 把 reducers 匯出成 actions，組件呼叫時用
export const { addItem, removeItem, increment, decrement } = cartSlice.actions;

// 把 reducer 本身匯出，給 store 組裝用
export default cartSlice.reducer;
