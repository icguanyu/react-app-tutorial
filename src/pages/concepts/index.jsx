const accent = "#3d5af1";
const green = "#22c55e";
const yellow = "#f59e0b";
const red = "#ef4444";

const styles = {
  page: {
    maxWidth: "860px",
    margin: "0 auto",
    padding: "32px 24px 64px",
    fontFamily: "system-ui, 'Segoe UI', sans-serif",
    color: "#1a1a2e",
  },
  pageTitle: {
    fontSize: "1.6rem",
    fontWeight: 700,
    marginBottom: "4px",
  },
  pageSubtitle: {
    color: "#777",
    fontSize: "0.9rem",
    marginBottom: "40px",
  },
  card: {
    background: "#fff",
    border: "1px solid #e8eaf0",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
    flexWrap: "wrap",
  },
  cardTitle: {
    fontSize: "1.05rem",
    fontWeight: 700,
    margin: 0,
  },
  routeBadge: {
    fontSize: "0.75rem",
    background: "#f0f2ff",
    color: accent,
    padding: "2px 10px",
    borderRadius: "99px",
    fontFamily: "monospace",
  },
  conceptGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "12px",
    marginBottom: "0",
  },
  conceptRow: {
    background: "#f8f9ff",
    borderRadius: "8px",
    padding: "12px 14px",
    borderLeft: `3px solid ${accent}`,
  },
  conceptName: {
    fontFamily: "monospace",
    fontWeight: 700,
    fontSize: "0.9rem",
    color: accent,
    marginBottom: "2px",
  },
  conceptDesc: {
    fontSize: "0.82rem",
    color: "#444",
    marginBottom: "6px",
    lineHeight: 1.5,
  },
  vueTag: {
    display: "inline-block",
    fontSize: "0.72rem",
    background: "#dcfce7",
    color: "#166534",
    padding: "1px 8px",
    borderRadius: "99px",
    fontFamily: "monospace",
  },
  sectionLabel: {
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#999",
    marginBottom: "12px",
  },
};

function ConceptCard({ title, route, color = accent, concepts }) {
  return (
    <div style={{ ...styles.card, borderTop: `3px solid ${color}` }}>
      <div style={styles.cardHeader}>
        <h2 style={styles.cardTitle}>{title}</h2>
        {route && <span style={styles.routeBadge}>{route}</span>}
      </div>
      <p style={styles.sectionLabel}>React 概念 ╱ Vue 3 對照</p>
      <div style={styles.conceptGrid}>
        {concepts.map((c, i) => (
          <div key={i} style={styles.conceptRow}>
            <div style={styles.conceptName}>{c.name}</div>
            <div style={styles.conceptDesc}>{c.desc}</div>
            {c.vue && <span style={styles.vueTag}>Vue: {c.vue}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ConceptsPage() {
  return (
    <div style={styles.page}>
      <h1 style={styles.pageTitle}>React 概念索引</h1>
      <p style={styles.pageSubtitle}>
        本專案各頁面涵蓋的重點概念，附 Vue 3 對照，方便快速建立對應關係
      </p>

      <ConceptCard
        title="首頁 — Todo App"
        route="/"
        color={accent}
        concepts={[
          {
            name: "useState",
            desc: "記錄組件的本地狀態，值改變時觸發重新 render",
            vue: "ref() / reactive()",
          },
          {
            name: "useMemo",
            desc: "快取計算結果，依賴不變時不重新計算，用於昂貴的衍生值",
            vue: "computed()",
          },
          {
            name: "useCallback",
            desc: "快取函式本身，避免每次 render 都建立新函式導致子組件重渲",
            vue: "不需要，Vue 函式天生穩定不會造成此問題",
          },
          {
            name: "Custom Hook (useTodos)",
            desc: "把 state + 操作函式抽成可重用的函式，以 use 開頭命名",
            vue: "Composable (useXxx.ts)",
          },
          {
            name: "useContext (useCart)",
            desc: "取得 CartContext 的購物車資料，不需要 props 傳遞",
            vue: "inject()",
          },
          {
            name: "Props",
            desc: "父組件傳資料給子組件，子組件只能讀取不能直接修改",
            vue: "defineProps()",
          },
          {
            name: "條件渲染",
            desc: "{condition && <JSX>} 或三元運算子，決定要不要渲染某段 JSX",
            vue: "v-if / v-else",
          },
          {
            name: "列表渲染",
            desc: ".map() 回傳 JSX 陣列，每個元素必須有唯一的 key prop",
            vue: "v-for + :key",
          },
        ]}
      />

      <ConceptCard
        title="Demo — Zustand Counter & Hook 規則"
        route="/demo"
        color={yellow}
        concepts={[
          {
            name: "Zustand",
            desc: "輕量全域狀態管理，不需要 Provider，任何組件直接 import 使用",
            vue: "Pinia defineStore()",
          },
          {
            name: "Selector",
            desc: "useStore(state => state.count) 只訂閱需要的值，精準避免不必要的 render",
            vue: "storeToRefs() 的概念",
          },
          {
            name: "Hook 必須在頂層呼叫",
            desc: "React 用槽位順序追蹤 Hook，放在 if/for 裡會讓順序錯位，導致讀到錯誤的值",
            vue: "Vue 無此限制，Composable 可以放在任何位置",
          },
          {
            name: "組件拆分與 re-render",
            desc: "CountDisplay 和 CountActions 各自訂閱不同值，count 變時只有 CountDisplay 重渲",
            vue: "Vue 響應式系統自動追蹤，不需要特別拆分",
          },
        ]}
      />

      <ConceptCard
        title="API 測試頁面"
        route="/apitest"
        color="#8b5cf6"
        concepts={[
          {
            name: "useEffect — mounted",
            desc: "第二個參數傳空陣列 []，只在組件掛載時執行一次，用來打 API",
            vue: "onMounted()",
          },
          {
            name: "useEffect — updated",
            desc: "第二個參數傳依賴陣列 [dep]，dep 改變時重新執行",
            vue: "watch(dep, callback)",
          },
          {
            name: "useEffect — cleanup",
            desc: "useEffect 回傳一個函式，組件卸載時執行，用來清除 timer / 取消訂閱",
            vue: "onUnmounted()",
          },
          {
            name: "受控輸入",
            desc: "value 綁定 state，onChange 更新 state，React 完全掌控輸入框的值",
            vue: "v-model（雙向綁定的語法糖）",
          },
          {
            name: "render 內直接計算",
            desc: "filter 等純計算不需要 useEffect，直接在 render 裡算，每次 render 都是最新值",
            vue: "computed() 或 template 內直接運算",
          },
        ]}
      />

      <ConceptCard
        title="文章列表 — 巢狀路由"
        route="/articles"
        color="#06b6d4"
        concepts={[
          {
            name: "React Router — NavLink",
            desc: "當路由匹配時自動加上 active class，用於導覽選單",
            vue: "RouterLink（active-class prop）",
          },
          {
            name: "React Router — Outlet",
            desc: "巢狀路由的渲染出口，/articles/:id 的內容會渲染在 Outlet 的位置",
            vue: "RouterView（子路由出口）",
          },
          {
            name: "useParams",
            desc: "取得 URL 中的動態參數，如 /articles/3 中的 3",
            vue: "useRoute().params.id",
          },
          {
            name: "Custom Hook (useArticle)",
            desc: "封裝 fetch + loading + error 三個狀態，讓頁面組件只關心渲染邏輯",
            vue: "Composable useArticle()",
          },
          {
            name: "條件渲染 — early return",
            desc: "loading / error 時提前 return JSX，讓主要 return 保持乾淨",
            vue: "v-if / v-else-if / v-else",
          },
          {
            name: "巢狀路由設定",
            desc: "在 main.jsx 的 Route 內再放 Route，父層用 Outlet 決定子路由位置",
            vue: "router children 陣列 + RouterView",
          },
        ]}
      />

      <ConceptCard
        title="購物車 — useContext 版"
        route="/shop"
        color={green}
        concepts={[
          {
            name: "createContext",
            desc: "建立一個 Context 物件，作為資料的「廣播頻道」",
            vue: "provide() 的頻道概念",
          },
          {
            name: "Context.Provider",
            desc: "包住子組件，底下所有組件都能取到 value 裡的資料",
            vue: "父組件呼叫 provide('key', value)",
          },
          {
            name: "useContext",
            desc: "在任意深度的子組件取得 Context 的資料，不需要 props 一層層傳",
            vue: "inject('key')",
          },
          {
            name: "Custom Hook 封裝 useContext",
            desc: "把 useContext 包成 useCart()，外層不用 import 兩個東西，且可加入錯誤提示",
            vue: "Composable 包住 inject()",
          },
          {
            name: "Context 的限制",
            desc: "Provider 下任何值改變，底下所有 useContext 的組件都會重渲，沒有精準訂閱",
            vue: "provide/inject 同樣沒有選擇性訂閱",
          },
        ]}
      />

      <ConceptCard
        title="購物車 — Zustand 版"
        route="/shop-zustand"
        color={yellow}
        concepts={[
          {
            name: "create()",
            desc: "建立 store，裡面同時放 state（初始值）和 actions（函式）",
            vue: "defineStore() — Setup Store 寫法",
          },
          {
            name: "set()",
            desc: "更新 state 的唯一方式，傳入新的 state 片段，其他欄位不受影響",
            vue: "直接修改 ref.value 或 reactive 的屬性",
          },
          {
            name: "get()",
            desc: "在 action 內讀取當前 state，或呼叫其他 action",
            vue: "直接讀 ref.value，或呼叫其他函式",
          },
          {
            name: "Selector 精準訂閱",
            desc: "useCartStore(s => s.items) 只有 items 變才重渲，其他 state 變動無感",
            vue: "storeToRefs() 或直接 store.items",
          },
          {
            name: "persist middleware",
            desc: "包住 store，自動同步到 localStorage，reload 後狀態仍在",
            vue: "pinia-plugin-persistedstate",
          },
          {
            name: "無需 Provider",
            desc: "Zustand store 是全域的，任何組件直接 import 就能用，不需要包 Provider",
            vue: "Pinia 也不需要 provide，直接 useXxxStore()",
          },
        ]}
      />

      <ConceptCard
        title="購物車 — Redux 版"
        route="/shop-redux"
        color={red}
        concepts={[
          {
            name: "createSlice",
            desc: "定義一個功能模組，包含 initialState 和 reducers（actions）",
            vue: "Vuex module / Pinia defineStore",
          },
          {
            name: "reducer / immer",
            desc: "更新 state 的函式，Redux Toolkit 內建 immer，可以直接修改 state 不用 spread",
            vue: "Pinia action 直接修改 state",
          },
          {
            name: "action.payload",
            desc: "呼叫 dispatch 時傳入的參數，在 reducer 內用 action.payload 取得",
            vue: "action 的函式參數",
          },
          {
            name: "configureStore",
            desc: "把所有 slice 組裝成一個全域 store，需要在最外層 Provider 注入",
            vue: "Vuex createStore / Pinia createPinia",
          },
          {
            name: "useSelector",
            desc: "從 store 取值，state.cart.items 的 cart 對應 configureStore 裡的 key 名稱",
            vue: "computed(() => store.items)",
          },
          {
            name: "useDispatch + dispatch(action)",
            desc: "所有 state 變更都要透過 dispatch，讓 DevTools 追蹤每一個操作的歷史",
            vue: "直接呼叫 store.addItem() — 不需要 dispatch",
          },
          {
            name: "Provider",
            desc: "Redux 需要 Provider 把 store 注入給子組件，通常包在 main.jsx 最外層",
            vue: "app.use(store) 全域安裝",
          },
        ]}
      />
    </div>
  );
}
