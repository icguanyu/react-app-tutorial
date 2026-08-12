import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../../store/reduxStore";
import ProductList from "./ProductList";
import CartSummary from "./CartSummary";
import "../shop/shop.scss";

export default function ShopReduxPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://hoyinleung.github.io/demoapi/react-basic-product.json")
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  return (
    // Redux 需要 Provider 包裹，把 store 傳給底下所有組件
    // 跟 Context 的 Provider 概念一樣，但通常包在最外層（main.tsx）
    // 這裡為了範例獨立，包在頁面層
    <Provider store={store}>
      <div className="shop">
        <h1>購物車練習（Redux）</h1>
        <div className="shop__layout">
          <ProductList products={products} />
          <CartSummary />
        </div>
      </div>
    </Provider>
  );
}
