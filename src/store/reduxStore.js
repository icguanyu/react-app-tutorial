import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

// Redux 需要一個全域的 store 把所有 slice 組裝在一起
// 對應 Zustand 不需要這步，每個 store 各自獨立

export const store = configureStore({
  reducer: {
    // key 名稱決定之後 useSelector 怎麼取值
    // state.cart.items → 這個 cart 就是這裡的 key
    cart: cartReducer,
    // 未來有其他 slice 繼續加：
    // auth: authReducer,
    // order: orderReducer,
  },
});
