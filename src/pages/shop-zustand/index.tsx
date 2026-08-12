// @ts-nocheck
import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import CartSummary from "./CartSummary";
import "../shop/shop.scss";


export default function ShopZustandPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://hoyinleung.github.io/demoapi/react-basic-product.json")
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  return (
    // 注意：不需要 Provider 包裹！
    // Zustand store 是全域的，任何組件直接 import 就能用
    <div className="shop">
      <h1>購物車練習（Zustand）</h1>
      <div className="shop__layout">
        <ProductList products={products} />
        <CartSummary />
      </div>
    </div>
  );
}
