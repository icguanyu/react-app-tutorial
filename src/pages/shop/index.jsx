import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import CartSummary from "./CartSummary";
import "./shop.scss";


export default function ShopPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://hoyinleung.github.io/demoapi/react-basic-product.json")
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  return (
    
      <div className="shop">
        <h1>購物車練習（useContext）</h1>
        <div className="shop__layout">
          <ProductList products={products} />
          <CartSummary />
        </div>
      </div>
   
  );
}
