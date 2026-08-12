import { useEffect, useState } from "react";
import { CartProvider } from "../../context/CartContext";
import ProductList from "./ProductList";
import CartSummary from "./CartSummary";
import CodeViewer from "../../components/CodeViewer";
import "./shop.scss";

const CODE_CART_CONTEXT = `import { createContext, useContext, useState } from "react";

// 1. 建立 Context（廣播頻道）
const CartContext = createContext(null);

// 2. Provider：存放 state，包住需要共享的子組件
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increment = (id) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)),
    );
  };

  const decrement = (id) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0),
    );
  };

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, increment, decrement, total }}>
      {children}
    </CartContext.Provider>
  );
}

// 3. 封裝成 custom hook，子組件只需要 import useCart
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart 必須在 CartProvider 內使用");
  return ctx;
}`;

const CODE_PAGE = `import { CartProvider } from "../../context/CartContext";
import ProductList from "./ProductList";
import CartSummary from "./CartSummary";

export default function ShopPage() {
  return (
    // CartProvider 包住兩個子組件
    // ProductList 和 CartSummary 共享同一份 cart state
    // 完全不需要 props 傳遞
    <CartProvider>
      <div className="shop">
        <ProductList products={products} />
        <CartSummary />
      </div>
    </CartProvider>
  );
}`;

const CODE_PRODUCT_LIST = `import { useCart } from "../../context/CartContext";

export default function ProductList({ products }) {
  // 從 Context 取出 addItem，不需要 props 傳入
  const { addItem } = useCart();

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          {p.name} — \${p.price}
          <button onClick={() => addItem(p)}>加入購物車</button>
        </li>
      ))}
    </ul>
  );
}`;

const CODE_CART_SUMMARY = `import { useCart } from "../../context/CartContext";

export default function CartSummary() {
  // 和 ProductList 是兄弟組件，卻能取到同一份 cart state
  const { items, increment, decrement, total } = useCart();

  return (
    <div>
      {items.map((item) => (
        <li key={item.id}>
          {item.name}
          <button onClick={() => decrement(item.id)}>−</button>
          {item.qty}
          <button onClick={() => increment(item.id)}>+</button>
          \${item.price * item.qty}
        </li>
      ))}
      <p>總計：\${total}</p>
    </div>
  );
}`;

const files = [
  {
    name: "CartContext.jsx",
    code: CODE_CART_CONTEXT,
    desc: "建立 Context、Provider 和封裝好的 useCart() hook",
  },
  {
    name: "index.jsx（頁面）",
    code: CODE_PAGE,
    desc: "用 CartProvider 包住子組件，底下所有組件都能取到 cart state",
  },
  {
    name: "ProductList.jsx",
    code: CODE_PRODUCT_LIST,
    desc: "透過 useCart() 取得 addItem，不需要任何 props",
  },
  {
    name: "CartSummary.jsx",
    code: CODE_CART_SUMMARY,
    desc: "和 ProductList 是兄弟組件，共享同一份 cart state",
  },
];

export default function ShopPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://hoyinleung.github.io/demoapi/react-basic-product.json")
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  return (
    <CartProvider>
      <div className="shop">
        <h1>購物車練習（useContext）</h1>
        <div className="shop__layout">
          <ProductList products={products} />
          <CartSummary />
        </div>

        {/* 程式碼展示區 */}
        <div style={{ marginTop: "40px" }}>
          <h2 style={{ fontSize: "1rem", color: "#555e7a", marginBottom: "12px" }}>
            完整程式碼
          </h2>
          <CodeViewer files={files} />
        </div>
      </div>
    </CartProvider>
  );
}
