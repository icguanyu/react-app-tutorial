import { useDispatch } from "react-redux";
import { addItem } from "../../store/cartSlice";

export default function ProductList({ products }) {
  // dispatch：負責「發送」action 去改變 state
  // 對應 Zustand 的 const addItem = useCartStore(s => s.addItem)
  const dispatch = useDispatch();

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
            <button
              className="btn btn--primary"
              onClick={() => dispatch(addItem(p))}
              // Zustand：addItem(p)
              // Redux：dispatch(addItem(p)) ← 多一層 dispatch
            >
              加入購物車
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
