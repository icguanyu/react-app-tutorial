# React 學習專案

Vue 3 開發者轉學 React 的實作練習專案，每個頁面聚焦一組核心概念，並附 Vue 3 對照說明。

## 啟動

```bash
npm install
npm run dev
```

---

## 教學單元總覽

### 單元一 — 首頁 Todo App `/`

**檔案：** `src/App.tsx` `src/hooks/useTodos.ts` `src/components/`

| React 概念 | Vue 3 對照 |
|---|---|
| `useState` | `ref()` / `reactive()` |
| `useMemo` | `computed()` |
| `useCallback` | 不需要（Vue 函式天生穩定） |
| Custom Hook `useTodos` | Composable |
| `useContext` 取購物車 | `inject()` |
| Props 父傳子 | `defineProps()` |
| 條件渲染 `{condition && ...}` | `v-if` |
| 列表渲染 `.map()` + `key` | `v-for` + `:key` |

---

### 單元二 — Demo：Zustand Counter & Hook 規則 `/demo`

**檔案：** `src/demo.tsx` `src/store/counterStore.ts`

| React 概念 | Vue 3 對照 |
|---|---|
| Zustand `create()` | Pinia `defineStore()` |
| Selector 精準訂閱 | `storeToRefs()` |
| Hook 只能在頂層呼叫 | Vue 無此限制 |
| 組件拆分減少不必要 re-render | Vue 響應式自動追蹤 |

**重點：** 視覺化展示 Hook 槽位錯位的問題，理解為什麼 Hook 不能放在 if / for 裡。

---

### 單元三 — 生命週期 & API 呼叫 `/apitest`

**檔案：** `src/pages/apitest.tsx`

| React 概念 | Vue 3 對照 |
|---|---|
| `useEffect(fn, [])` mounted | `onMounted()` |
| `useEffect(fn, [dep])` updated | `watch(dep, fn)` |
| `useEffect` return cleanup | `onUnmounted()` |
| 受控輸入 `value` + `onChange` | `v-model` |
| render 內直接計算 filter | `computed()` 或 template 內運算 |

---

### 單元四 — 巢狀路由 & Custom Hook `/articles`

**檔案：** `src/pages/articles/` `src/hooks/useArticle.ts`

| React 概念 | Vue 3 對照 |
|---|---|
| `NavLink` | `RouterLink` + `active-class` |
| `Outlet` 巢狀路由出口 | `RouterView` |
| `useParams` 取路由參數 | `useRoute().params` |
| Custom Hook `useArticle` | Composable |
| 條件渲染 early return | `v-if / v-else` |
| 巢狀路由設定（Route children） | `router` 的 `children` 陣列 |

---

### 單元五 — 跨組件狀態：useContext 購物車 `/shop`

**檔案：** `src/pages/shop/` `src/context/CartContext.tsx`

| React 概念 | Vue 3 對照 |
|---|---|
| `createContext` | `provide()` 的頻道概念 |
| `Context.Provider` | 父組件 `provide('key', value)` |
| `useContext` | `inject('key')` |
| Custom Hook 封裝 `useContext` | Composable 封裝 `inject` |

**重點：** Provider 底下任何值改變，所有使用 `useContext` 的組件都會重渲（無精準訂閱），適合 UI 層狀態（主題、語言），不適合大型業務狀態。

---

### 單元六 — 全域狀態：Zustand 購物車 `/shop-zustand`

**檔案：** `src/pages/shop-zustand/` `src/store/cartStore.ts`

| React 概念 | Vue 3 對照 |
|---|---|
| `create()` 建立 store | `defineStore()` Setup Store 寫法 |
| `set()` 更新 state | 直接修改 `ref.value` |
| `get()` 在 action 內讀取 state | 直接讀 `ref.value` |
| Selector 精準訂閱 | `storeToRefs()` |
| `persist` middleware | `pinia-plugin-persistedstate` |
| 無需 Provider | Pinia 也不需要 |

**重點：** 對比 useContext 版，Zustand 無需 Provider、支援精準訂閱、自動 localStorage 持久化。

---

### 單元七 — 全域狀態：Redux 購物車 `/shop-redux`

**檔案：** `src/pages/shop-redux/` `src/store/cartSlice.js` `src/store/reduxStore.js`

| React 概念 | Vue 3 對照 |
|---|---|
| `createSlice` | Vuex module / Pinia defineStore |
| `reducer` + immer | Pinia action（可直接修改 state） |
| `action.payload` | action 的函式參數 |
| `configureStore` | Vuex `createStore` |
| `useSelector` | `computed(() => store.xxx)` |
| `dispatch(action())` | 直接呼叫 `store.action()` |
| `Provider` 注入 store | `app.use(store)` |

**重點：** Redux 是較舊的架構（對應 Vuex），所有狀態變更必須透過 `dispatch`，方便 DevTools 追蹤歷史。現代新專案多改用 Zustand。

---

### 概念索引頁 `/concepts`

**檔案：** `src/pages/concepts/index.jsx`

以卡片方式整理本專案所有 React 概念，每個概念附 Vue 3 對照，方便快速查閱。

---

## 技術棧

| 項目 | 版本 |
|---|---|
| React | 19 |
| TypeScript | 5 |
| Vite | 6 |
| React Router | 6 |
| Zustand | 5 |
| Redux Toolkit | 2 |
| React Redux | 9 |
| SCSS | — |
