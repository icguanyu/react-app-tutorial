import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../../store/cartSlice";

export default function CartSummary() {
  // useSelector：從 store 取值，對應 Zustand 的 useCartStore(s => s.items)
  // state.cart → reduxStore.js 裡設定的 key 名稱
  const items = useSelector((state) => state.cart.items);
  const total = useSelector((state) =>
    state.cart.items.reduce((sum, i) => sum + i.price * i.qty, 0),
  );
  const dispatch = useDispatch();

  return (
    <div className="cart">
      <h2>購物車（{items.length} 種）</h2>
      {items.length === 0 ? (
        <p className="cart__empty">購物車是空的</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {items.map((item) => (
            <li key={item.id} className="cart__item">
              <span className="cart__item-name">{item.name}</span>
              <div className="cart__item-controls">
                <button
                  className="btn btn--qty"
                  onClick={() => dispatch(decrement(item.id))}
                >
                  −
                </button>
                <span>{item.qty}</span>
                <button
                  className="btn btn--qty"
                  onClick={() => dispatch(increment(item.id))}
                >
                  +
                </button>
              </div>
              <span className="cart__item-subtotal">
                ${item.price * item.qty}
              </span>
            </li>
          ))}
        </ul>
      )}
      <div className="cart__total">
        <span>總計</span>
        <span>${total}</span>
      </div>
    </div>
  );
}
