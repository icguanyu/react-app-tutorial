// @ts-nocheck
import { useCartStore } from "../../store/cartStore";

export default function ProductList({ products }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="product-list">
      <h2>商品列表</h2>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {products.map((p) => (
          <li key={p.id} className="product-list__item">
            <div className="product-list__item-info">
              <span>{p.name}</span>
              <span>${p.price}</span>
            </div>
            <button className="btn btn--primary" onClick={() => addItem(p)}>
              加入購物車
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
