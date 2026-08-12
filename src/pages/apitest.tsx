import { useEffect, useState } from "react";

export default function ApiTest() {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  // created 等價 — 直接寫在函數體裡
  console.log("每次 render 都執行");

  // mounted 等價 — 空陣列依賴
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://hoyinleung.github.io/demoapi/react-basic-product.json",
      );
      const data = await response.json();
      console.log("Fetched products:", data);
      setAllProducts(data);
    };

    fetchProducts();

    console.log("useEffect 1");
    // 離開時執行（unmounted）
    return () => {
      console.log("離開頁面");
    };
  }, []);

  // updated 等價 — 有依賴時，依賴變化才執行
  useEffect(() => {
    console.log("allProducts 改變了", allProducts);
  }, [allProducts]);

  useEffect(() => {
    console.log("useEffect 2");
  }, []);

  // 不需要 useEffect：filter 是純計算，直接在 render 算就好
  const displayed =
    userInput === ""
      ? allProducts
      : allProducts.filter((product) =>
          product.name.toLowerCase().includes(userInput.toLowerCase()),
        );

  return (
    <div>
      <h1>API 測試頁面</h1>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="輸入搜尋關鍵字"
      />
      <ul>
        {displayed.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
