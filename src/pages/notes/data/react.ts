import type { NotesConfig } from "../types";

// 程式碼直接讀取本專案的原始檔（Vite ?raw），練習檔改了筆記會自動同步
import appSrc from "@/App.tsx?raw";
import todoInputSrc from "@/components/TodoInput.tsx?raw";
import todoItemSrc from "@/components/TodoItem.tsx?raw";
import todoFilterSrc from "@/components/TodoFilter.tsx?raw";
import useTodosSrc from "@/hooks/useTodos.ts?raw";
import articleLayoutSrc from "@/pages/articles/ArticleLayout.tsx?raw";
import articleDetailSrc from "@/pages/articles/[id].tsx?raw";
import useArticleSrc from "@/hooks/useArticle.ts?raw";
import demoSrc from "@/demo.tsx?raw";
import counterStoreSrc from "@/store/counterStore.ts?raw";
import apiTestSrc from "@/pages/apitest.tsx?raw";
import cartContextSrc from "@/context/CartContext.tsx?raw";
import useCartSrc from "@/context/useCart.ts?raw";
import shopProductListSrc from "@/pages/shop/ProductList.jsx?raw";
import shopCartSummarySrc from "@/pages/shop/CartSummary.jsx?raw";
import cartStoreSrc from "@/store/cartStore.ts?raw";
import zustandIndexSrc from "@/pages/shop-zustand/index.tsx?raw";
import zustandProductListSrc from "@/pages/shop-zustand/ProductList.tsx?raw";
import zustandCartSummarySrc from "@/pages/shop-zustand/CartSummary.tsx?raw";
import cartSliceSrc from "@/store/cartSlice.js?raw";
import reduxStoreSrc from "@/store/reduxStore.js?raw";
import reduxIndexSrc from "@/pages/shop-redux/index.jsx?raw";
import reduxProductListSrc from "@/pages/shop-redux/ProductList.jsx?raw";
import reduxCartSummarySrc from "@/pages/shop-redux/CartSummary.jsx?raw";

export const reactNotes: NotesConfig = {
  language: "tsx",
  name: "React",
  color: "#3d5af1",
  repo: "my-app/src/",
  lessons: [
    {
      id: "todo-components",
      title: "Todo App：元件拆分與 Props",
      source: "components/Todo*.tsx",
      date: "2026-08-06",
      tags: ["基礎", "Props", "元件"],
      summary: "把 Todo App 拆成輸入、項目、篩選三個元件，父層用 props 傳資料和事件下去。",
      points: [
        "Props 是**唯讀**的：子元件不能改，要改就呼叫父層傳下來的函式，例如 `onAdd(text)`。",
        "**受控輸入**：`value={text}` 綁 state，`onChange` 更新 state，輸入框的值完全由 React 掌控。",
        "`e.preventDefault()` 阻止 form 送出時重新整理頁面。",
        "**列表渲染**：`.map()` 回傳 JSX，每個元素要有穩定且唯一的 `key`（用 `todo.id`，不要用 index）。",
        "**條件渲染**：`{editing ? <input /> : <>...</>}` 與 `{completedCount > 0 && <button />}`。",
        "`useRef` 拿到 DOM 元素，搭配 `useEffect` 在進入編輯模式後自動 focus。",
        "TypeScript：`interface Props` 定義 props 型別；`type FilterType = 'all' | 'active' | 'completed'` 用聯合型別限制可用值。",
      ],
      compare: [
        ["Props", "`defineProps()`"],
        ["`onAdd` 之類的函式 props", "`defineEmits()` + `emit('add')`"],
        ["受控輸入 value + onChange", "`v-model`"],
        ["條件渲染 `&&` / 三元", "`v-if` / `v-else`"],
        ["`.map()` + `key`", "`v-for` + `:key`"],
        ["`useRef<HTMLInputElement>`", "template ref `ref=\"inputRef\"`"],
      ],
      files: [
        { name: "TodoInput.tsx", code: todoInputSrc },
        { name: "TodoItem.tsx", code: todoItemSrc },
        { name: "TodoFilter.tsx", code: todoFilterSrc },
      ],
      pitfalls: [
        "`<>...</>` 是 Fragment，多個元素又不想多包一層 div 時使用。",
        "`onClick={() => onDelete(todo.id)}` 要包成箭頭函式；寫成 `onClick={onDelete(todo.id)}` 會在 render 時就直接執行。",
      ],
    },
    {
      id: "custom-hook",
      title: "Custom Hook：useTodos + useMemo / useCallback",
      source: "hooks/useTodos.ts",
      date: "2026-08-10",
      tags: ["Hook", "狀態", "效能"],
      summary: "把 todos 的 state 和所有操作抽成 `useTodos()`，頁面元件只負責組裝畫面。",
      points: [
        "Custom Hook 就是**以 `use` 開頭、裡面有用到其他 Hook 的函式**，用來重用「狀態 + 邏輯」。",
        "更新陣列 / 物件要產生**新的**值（`[...prev, x]`、`map`、`filter`），不能直接 `push` 或改屬性。",
        "`setTodos(prev => ...)` 函式寫法：拿到最新的前一個值，避免連續更新時讀到舊 state。",
        "`useMemo`：快取計算結果（篩選後的列表、未完成數量），依賴不變就不重算。",
        "`useCallback`：快取函式本身，讓傳給子元件的函式在每次 render 都是同一個參考。",
        "能從現有 state 算出來的值（`completedCount`）就直接算，不要再開一個 state。",
      ],
      compare: [
        ["Custom Hook `useTodos()`", "Composable `useTodos()`"],
        ["`useState`", "`ref()` / `reactive()`"],
        ["`useMemo`", "`computed()`"],
        ["`useCallback`", "不需要，Vue 的函式本來就是穩定的"],
      ],
      files: [
        { name: "useTodos.ts", code: useTodosSrc },
        { name: "App.tsx", code: appSrc },
      ],
      pitfalls: [
        "`update` 這層包裝其實可以省略：`setTodos` 本身就是穩定的，可以直接 `setTodos(prev => ...)`。",
        "Todo App 下方的購物車清單永遠是空的：「購物車（一）」的 `ShopPage` 自己又包了一層 `CartProvider`，裡面的元件讀的是**最近的那層 Provider**，跟 main.jsx 外層那份是兩份不同的 state。",
        "`useCart() as any` 跳過了型別檢查，CartContext 補上型別後就能拿掉。",
      ],
    },
    {
      id: "router-nested",
      title: "React Router：巢狀路由 + useParams",
      source: "pages/articles/",
      date: "2026-08-10",
      tags: ["Router", "Hook", "非同步"],
      demo: "/articles",
      summary: "`/articles` 是外框，`/articles/:id` 的內容渲染在 `<Outlet />`，並用 custom hook 抓資料。",
      points: [
        "在 `<Route>` 裡面再放 `<Route>` 就是巢狀路由，子路由會渲染在父層的 `<Outlet />` 位置。",
        "`<NavLink>` 在路由符合時自動加上 `active` class，適合做選單。",
        "路由練習需要真正的網址變化，所以沒有嵌在筆記裡，用右上角「看實際頁面」開啟。",
        "`useParams()` 取得網址上的動態參數，例如 `/articles/3` 的 `id`。",
        "`useArticle(id)` 把 **loading / error / data** 包在一起回傳，頁面只管顯示（內部只存一份結果，loading 由它推導，見 #09）。",
        "`useEffect(..., [id])`：id 改變時重新抓資料；回傳的函式是 cleanup。",
        "**Early return**：`if (loading) return <p>載入中...</p>`，讓主要的 return 保持乾淨。",
      ],
      compare: [
        ["`<NavLink>`", "`<RouterLink>`（active-class）"],
        ["`<Outlet />`", "`<RouterView />`"],
        ["`useParams().id`", "`useRoute().params.id`"],
        ["`useEffect(fn, [id])`", "`watch(id, fn, { immediate: true })`"],
        ["early return", "`v-if` / `v-else-if` / `v-else`"],
      ],
      files: [
        { name: "ArticleLayout.tsx", code: articleLayoutSrc },
        { name: "[id].tsx", code: articleDetailSrc },
        { name: "useArticle.ts", code: useArticleSrc },
      ],
      pitfalls: [
        "快速切換文章時可能出現**競態（race condition）**：舊的請求比較晚回來，會蓋掉新文章。已在 #09 用 `let ignore = false` 修正：cleanup 時設成 `true`，回來的結果若 `ignore` 就不 set。",
        "`article!` 是非空斷言，等於告訴 TypeScript「我保證不是 null」；如果判斷順序寫錯就會在執行時出錯。",
      ],
    },
    {
      id: "zustand-hook-rules",
      title: "Zustand Counter 與 Hook 規則",
      source: "demo.tsx",
      date: "2026-08-11",
      tags: ["Zustand", "Hook", "狀態"],
      summary: "用 Zustand 建全域 counter；並搞懂 React 是靠**呼叫順序（槽位）**對應每個 Hook，所以 Hook 只能在元件最頂層呼叫。",
      points: [
        "`create()` 建立 store，state 和 action 放在同一個物件；**不需要 Provider**。",
        "**Selector**：`useCounterStore(s => s.count)` 只訂閱 count，其他值變了不會重新 render。",
        "`CountDisplay` 只訂閱 count、`CountActions` 只訂閱 actions，按按鈕時只有 `CountDisplay` 重新 render。",
        "**槽位機制**：React 不是靠「變數名稱」，而是靠「**呼叫順序**」儲存與對應每個 Hook 的狀態。",
        "**絕不能 Conditional**：不能「某條件成立才呼叫 Hook」。`if` 插在 Hook 之間，重新渲染時槽位會錯位，拿到錯誤的資料甚至直接報錯。",
        "**區域變數 vs Hook**：一般 JS 區域變數可以放在 `if` 裡；`useState` 等 Hook **不行**放在 `if`、迴圈（`for` / `while`）或巢狀函式中。",
      ],
      sections: [
        {
          title: "一、槽位機制：React 怎麼對應 Hook",
          items: [
            "React 在每個元件實例上維護一條 Hook 串列，依照**呼叫順序**把狀態放進第 0、1、2… 個槽位。",
            "每次重新渲染（re-render），React 會再執行一次元件函式，並**照順序**去槽位拿值：",
            "第 1 次呼叫 `useState` → 讀槽位 `[0]`；第 2 次 → 讀 `[1]`；第 3 次 → 讀 `[2]`。",
          ],
        },
        {
          title: "二、把 Hook 放進 if 會發生什麼（對照「錯誤示範」頁籤）",
          items: [
            "**情況 A：`show === false`（初次渲染）**：`useState(false)` → `[0]` 是 show；`if` 為假，name 的 Hook 被跳過；`useState(0)` → `[1]` 是 count。共 2 個槽位。",
            "**情況 B：切換成 `show === true`**：`[0]` 讀到 show = `true`；`if` 成立，`useState('Alice')` 讀 `[1]` — **錯位開始**：`[1]` 上次存的是 count，name 拿到的是 `0` 而不是 `'Alice'`。",
            "接著 `useState(0)` 要讀 `[2]`，但上一次根本沒有 `[2]`。React 會偵測到 Hook 數量變多，直接丟出錯誤 `Rendered more hooks than during the previous render`，畫面崩潰。",
            "反過來（Hook 數量變少）同樣會出錯：`Rendered fewer hooks than expected`。",
          ],
        },
        {
          title: "三、比喻：郵局排隊劃位",
          items: [
            "**正確（頂層呼叫）**：每次排隊順序都是 1 號小明、2 號小華、3 號小美。櫃台看號碼拿檔案，永遠不會拿錯。",
            "**錯誤（條件式呼叫）**：2 號小華看心情決定要不要來。小華沒來時，小美變成「第 2 個」，櫃台就把小華的檔案拿給小美 — 資料整個套錯。",
          ],
        },
        {
          title: "四、條件成立才需要某些狀態時的正確寫法",
          items: [
            "**作法 1（推薦）**：Hook 全部寫在頂層，條件放在 **JSX** 或邏輯裡，例如 `{show && <p>名字：{name}</p>}`。每次渲染 Hook 的順序與數量都一樣。",
            "**作法 2：拆成子元件**：狀態只在某條件下才有意義時，把它搬進子元件。父元件決定要不要渲染子元件，子元件在**自己的頂層**呼叫 Hook。",
          ],
        },
      ],
      compare: [
        ["`create()`", "Pinia `defineStore()`"],
        ["Selector", "`storeToRefs()`"],
        ["Hook 必須在頂層", "Vue 沒有這個限制，Composable 可以放在 setup 任何位置"],
      ],
      files: [
        {
          name: "錯誤示範.jsx",
          code: `function UserProfile() {
  const [show, setShow] = useState(false); // 永遠是第 1 個 Hook

  if (show) {
    const [name, setName] = useState('Alice'); // ❌ 條件 Hook
  }

  const [count, setCount] = useState(0); // 期望是第 3 個 Hook
}`,
        },
        {
          name: "作法1-條件放JSX.jsx",
          code: `function UserProfile() {
  // ✅ 所有 Hook 永遠在最頂層，每次渲染的呼叫順序與數量完全一致
  const [show, setShow] = useState(false);   // 槽位 [0]
  const [name, setName] = useState('Alice'); // 槽位 [1]
  const [count, setCount] = useState(0);     // 槽位 [2]

  return (
    <div>
      {/* ✅ 條件判斷放在 JSX 裡面 */}
      {show && <p>名字：{name}</p>}
      <button onClick={() => setShow(!show)}>切換顯示</button>
    </div>
  );
}`,
        },
        {
          name: "作法2-拆子元件.jsx",
          code: `// 父元件：控制要不要渲染子元件
function UserProfile({ isLoggedIn }) {
  if (!isLoggedIn) return <p>請先登入</p>;

  // ✅ 條件成立時才渲染，子元件內部自然呼叫自己的 Hook
  return <LoggedInUserInfo />;
}

// 子元件：Hook 依然在自己的頂層
function LoggedInUserInfo() {
  const [age, setAge] = useState(25); // ✅ 在子元件最頂層呼叫
  return <div>年齡：{age}</div>;
}`,
        },
        { name: "counterStore.ts", code: counterStoreSrc },
        { name: "demo.tsx", code: demoSrc },
      ],
      pitfalls: [
        "**禁忌一**：不要在條件句（`if` / `else`、三元運算子、`&&`）裡呼叫 Hook。",
        "**禁忌二**：不要在迴圈（`for` / `while`）或巢狀函式（例如事件處理函式、`useEffect` 的 callback）裡呼叫 Hook。",
        "**Early return 要放在所有 Hook 之後**：作法 2 的父元件可以 `if (!isLoggedIn) return`，是因為它**沒有** Hook。如果 `return` 寫在某個 `useState` 前面，那個 Hook 就變成「有時候才呼叫」，一樣違規。",
        "**核心準則**：條件成立才需要的狀態，把條件放在渲染層（JSX / 所有 Hook 之後的 early return）或拆成子元件，而不是把 `useState` 塞進 `if`。",
        "`eslint-plugin-react-hooks` 的 `rules-of-hooks` 規則會自動抓出這些錯誤。專案已經裝了，但目前 `eslint.config.js` 只檢查 `.js` / `.jsx`，`.ts` / `.tsx` 檔（例如 demo.tsx）不在範圍內。",
        "`const { count } = useCounterStore()` 不加 selector 會訂閱整個 store，任何欄位變動都會重新 render。",
      ],
    },
    {
      id: "use-effect",
      title: "useEffect：打 API 與生命週期",
      source: "pages/apitest.tsx",
      date: "2026-08-12",
      tags: ["Hook", "非同步", "生命週期"],
      summary: "用依賴陣列控制 effect 執行的時機，對應 mounted / updated / unmounted。",
      points: [
        "**沒有依賴陣列**：每次 render 後都執行。",
        "**空陣列 `[]`**：只在掛載後執行一次，適合打 API。",
        "**`[dep]`**：dep 改變時才執行。",
        "effect **回傳的函式**是 cleanup，元件卸載或下次 effect 執行前呼叫。",
        "effect 本身不能是 async，要在裡面另外定義 async 函式再呼叫。",
        "搜尋過濾是純計算，**直接在 render 裡算**就好，不需要 useEffect + 另一個 state。",
      ],
      compare: [
        ["函式本體（每次 render）", "`setup()` 內直接執行（只執行一次）"],
        ["`useEffect(fn, [])`", "`onMounted()`"],
        ["`useEffect(fn, [dep])`", "`watch(dep, fn)`"],
        ["cleanup 函式", "`onUnmounted()`"],
        ["render 內直接計算", "`computed()`"],
      ],
      files: [{ name: "apitest.tsx", code: apiTestSrc }],
      pitfalls: [
        "開發模式如果有包 `<StrictMode>`，effect 會刻意被執行兩次來幫你檢查 cleanup，這是正常的（目前 main.jsx 沒有包）。",
        "`useState<any[]>` 先求能跑沒問題，之後可以定義 `interface Product { id; name; price }` 取代 `any`。",
      ],
    },
    {
      id: "cart-context",
      title: "購物車（一）：useContext",
      source: "context/CartContext.tsx",
      date: "2026-08-12",
      tags: ["狀態管理", "Context"],
      summary: "用 Context 讓兩個兄弟元件共用同一份購物車 state，不必一層層傳 props。",
      points: [
        "`createContext()` 建立頻道 → `<Provider value={...}>` 廣播 → `useContext()` 在任何深度接收。",
        "把 `useContext(CartContext)` 包成 `useCart()`，外面只要 import 一個東西，還能加上「沒包 Provider」的錯誤提示。",
        "`ProductList` 與 `CartSummary` 是兄弟元件，卻讀到同一份 `items`。",
        "總金額 `total` 由 `items` 直接算出，不另存 state。",
      ],
      compare: [
        ["`createContext` + `Provider`", "`provide('key', value)`"],
        ["`useContext()`", "`inject('key')`"],
        ["`useCart()` 封裝", "Composable 包住 `inject()`"],
      ],
      files: [
        { name: "CartContext.tsx", code: cartContextSrc },
        { name: "useCart.ts", code: useCartSrc },
        { name: "ProductList.jsx", code: shopProductListSrc },
        { name: "CartSummary.jsx", code: shopCartSummarySrc },
      ],
      pitfalls: [
        "Context **沒有精準訂閱**：value 任何一部分改變，所有 `useContext` 的元件都會重新 render。",
        "`value={{ items, addItem, ... }}` 每次 render 都是新物件，購物車變大後可以用 `useMemo` 包起來。",
        "檔案開頭有 `// @ts-nocheck`，關掉了整個檔案的型別檢查。",
      ],
    },
    {
      id: "cart-zustand",
      title: "購物車（二）：Zustand + persist",
      source: "store/cartStore.ts",
      date: "2026-08-12",
      tags: ["狀態管理", "Zustand"],
      summary: "同一個購物車改用 Zustand：免 Provider、selector 精準訂閱，並用 persist 存進 localStorage。",
      points: [
        "`create((set, get) => ({ ... }))`：`set` 更新 state、`get` 在 action 裡讀目前的 state。",
        "`set` 回傳的物件會被 **merge** 進 state，只要寫有變動的欄位。",
        "`persist(..., { name: 'cart' })`：自動同步到 localStorage，重新整理後購物車還在。",
        "`total` 用 selector 算出來，相當於 Pinia 的 getter。",
        "頁面**不需要 Provider**，任何元件 import `useCartStore` 就能用。",
      ],
      compare: [
        ["`create()`", "`defineStore()`（Setup Store）"],
        ["`set()`", "直接改 `ref.value` / state"],
        ["selector 算 total", "getters"],
        ["`persist` middleware", "`pinia-plugin-persistedstate`"],
      ],
      files: [
        { name: "cartStore.ts", code: cartStoreSrc },
        { name: "index.tsx", code: zustandIndexSrc },
        { name: "ProductList.tsx", code: zustandProductListSrc },
        { name: "CartSummary.tsx", code: zustandCartSummarySrc },
      ],
      pitfalls: [
        "selector 如果每次都回傳**新的物件或陣列**（例如 `s => ({ a: s.a, b: s.b })`），會造成每次都重新 render；需要多個值時分開取或用 `useShallow`。",
        "persist 存的資料結構改版後，舊的 localStorage 可能對不上，可以用 `version` + `migrate` 處理。",
      ],
    },
    {
      id: "cart-redux",
      title: "購物車（三）：Redux Toolkit",
      source: "store/cartSlice.js",
      date: "2026-08-12",
      tags: ["狀態管理", "Redux"],
      summary: "同一個購物車改用 Redux Toolkit：slice 定義 reducer，透過 dispatch(action) 改變 state。",
      points: [
        "`createSlice` 一次定義 `initialState` 與 `reducers`，並自動產生對應的 action creators。",
        "Redux Toolkit 內建 **immer**，reducer 裡可以直接寫 `existing.qty += 1`，不用自己 spread。",
        "`configureStore({ reducer: { cart: cartReducer } })` 組裝 store，`cart` 這個 key 決定 `state.cart.items` 的路徑。",
        "讀值用 `useSelector`，改值一律 `dispatch(addItem(p))`。",
        "需要 `<Provider store={store}>` 把 store 注入元件樹。",
      ],
      compare: [
        ["`createSlice`", "Pinia store / Vuex module"],
        ["reducer（immer 可直接改）", "Pinia action 直接改 state"],
        ["`useSelector`", "`computed(() => store.items)`"],
        ["`dispatch(action)`", "直接呼叫 `store.addItem()`"],
        ["`<Provider store>`", "`app.use(pinia)`"],
      ],
      files: [
        { name: "cartSlice.js", code: cartSliceSrc },
        { name: "reduxStore.js", code: reduxStoreSrc },
        { name: "index.jsx", code: reduxIndexSrc },
        { name: "ProductList.jsx", code: reduxProductListSrc },
        { name: "CartSummary.jsx", code: reduxCartSummarySrc },
      ],
      pitfalls: [
        "immer 的兩種寫法**擇一**：直接修改 `state`，或 `return` 新的 state，不能同時做。",
        "store 是模組層級的變數，所以就算 Provider 包在頁面裡，收合「實際操作」再展開，購物車內容也還在（但重新整理就沒了，沒有 persist）。",
      ],
    },
    {
      id: "eslint-fixes",
      title: "ESLint 抓到的 3 個 Hook 問題與修正",
      source: "hooks/、context/",
      date: "2026-10-01",
      tags: ["Hook", "ESLint", "效能"],
      summary: "把 `react-hooks` 規則擴大到 `.ts` / `.tsx` 後，在既有的練習裡抓到 3 個問題，逐一修正。",
      points: [
        "`eslint-plugin-react-hooks` v7 除了 `rules-of-hooks`，還包含 React Compiler 的規則（`purity`、`set-state-in-effect`…），會檢查元件是否「純粹」。",
        "**能推導的就不要存成 state**：loading 可以從「目前的結果是不是這個 id 的」算出來，不必在 effect 裡 `setLoading(true)`。",
        "**`useState(() => 初始值)`**：初始值的計算只在第一次 render 執行。",
        "**一個檔案只匯出元件**：Context 物件和 `useCart` 搬到另一個檔案，Fast Refresh 才能正常熱更新。",
        "跑 `npm run lint` 就能自己檢查；三個問題修完後 lint 是 0 個錯誤。",
      ],
      sections: [
        {
          title: "一、useArticle：set-state-in-effect",
          items: [
            "**問題**：effect 一開始就同步呼叫 `setLoading(true)`、`setError(null)`。",
            "**原因**：effect 是在畫面 render 完之後才跑，這時再 setState 會**立刻觸發第二次 render**（連鎖渲染）。effect 應該用來和外部系統同步，setState 放在非同步的 callback 裡。",
            "**修法**：只存 `{ id, article, error }` 一份結果。`loading` 推導成 `result?.id !== id` — id 一變，loading 自然就是 true，不需要手動設。",
            "**順便修好競態**：加上 `let ignore = false`，cleanup 時設成 `true`；舊 id 的請求比較晚回來時直接丟掉，不會蓋掉新文章。",
          ],
        },
        {
          title: "二、useTodos：purity",
          items: [
            "**問題**：`useState([{ ..., createdAt: Date.now() }])` 在 render 期間呼叫了不純的函式。",
            "**原因**：傳給 `useState` 的值**每次 render 都會被計算**，只是第一次之後被丟掉。`Date.now()`、`crypto.randomUUID()` 每次結果都不同，屬於不純的呼叫，也白白浪費效能。",
            "**修法**：改成 lazy initializer `useState(() => [...])`，React 只在第一次 render 呼叫這個函式。",
          ],
        },
        {
          title: "三、CartContext：only-export-components",
          items: [
            "**問題**：`CartContext.tsx` 同時匯出 `CartProvider`（元件）和 `useCart`（一般函式）。",
            "**原因**：Vite 的 Fast Refresh 只有在「檔案只匯出元件」時才能保留 state 做熱更新；混了非元件就只能整頁重新載入。",
            "**修法**：新增 `context/useCart.ts` 放 `CartContext` 物件與 `useCart()`；`CartContext.tsx` 只匯出 `CartProvider`。使用端改成 `import { useCart } from \"context/useCart\"`。",
            "沒有取名 `cartContext.ts`：Windows 的檔名不分大小寫，會跟 `CartContext.tsx` 撞名。",
          ],
        },
      ],
      compare: [
        ["從 state 推導 loading", "`computed(() => result.value?.id !== id)`"],
        ["cleanup 設 `ignore = true`", "`onWatcherCleanup()`（Vue 3.5+）"],
        ["`useState(() => 初始值)`", "`ref()` 的初始值本來就只算一次（setup 只執行一次）"],
      ],
      files: [
        {
          name: "修正前-useArticle.ts",
          code: `const [article, setArticle] = useState<Article | null>(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)

useEffect(() => {
  setLoading(true) // ❌ effect 本體同步 setState
  setError(null)

  fetchArticle(id)
    .then((data) => {
      if (!data) setError(\`找不到文章（id: \${id}）\`)
      else setArticle(data) // ❌ 舊請求晚回來會蓋掉新文章
    })
    .finally(() => setLoading(false))

  return () => {
    setArticle(null)
  }
}, [id])`,
        },
        { name: "修正後-useArticle.ts", code: useArticleSrc },
        {
          name: "修正前-useTodos.ts",
          code: `// ❌ 每次 render 都會執行 Date.now() / randomUUID()
const [todos, setTodos] = useState<Todo[]>([
  {
    id: crypto.randomUUID(),
    text: 'Learn React',
    completed: true,
    createdAt: Date.now(),
  }
])`,
        },
        { name: "修正後-useTodos.ts", code: useTodosSrc },
        {
          name: "修正前-CartContext.tsx",
          code: `const CartContext = createContext(null);

export function CartProvider({ children }) { /* ... */ }

// ❌ 和元件放在同一個檔案匯出
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart 必須在 CartProvider 內使用");
  return ctx;
}`,
        },
        { name: "修正後-useCart.ts", code: useCartSrc },
        { name: "修正後-CartContext.tsx", code: cartContextSrc },
      ],
      pitfalls: [
        "不是所有 effect 裡的 setState 都違規：在 `.then()`、事件、計時器等**非同步 callback** 裡 setState 是正常用法。",
        "`useState(computeInitial())` 和 `useState(computeInitial)` 不一樣：前者每次 render 都執行，後者只在第一次。",
        "這些規則只是 lint，不修也能跑；但它們抓到的通常是效能問題或之後很難查的 bug。",
      ],
    },
  ],
  reference: {
    title: "三種狀態管理比較",
    columns: ["", "Context", "Zustand", "Redux Toolkit"],
    rows: [
      ["需要 Provider", "要", "不用", "要"],
      ["精準訂閱", "沒有，value 變就全部重新 render", "selector", "`useSelector`"],
      ["更新方式", "`setState`", "`set()`", "`dispatch(action)`"],
      ["樣板程式碼", "少", "最少", "較多（slice + store）"],
      ["持久化", "自己寫", "`persist` middleware", "redux-persist"],
      ["DevTools", "React DevTools", "可接 Redux DevTools", "Redux DevTools（內建時間回溯）"],
      ["適合", "少量、不常變的全域資料（主題、登入者）", "中小型專案的共享狀態", "大型專案、多人協作、需要嚴格流程"],
    ],
  },
};
