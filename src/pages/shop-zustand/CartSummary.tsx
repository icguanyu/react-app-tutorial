// @ts-nocheck
import { useCartStore } from "../../store/cartStore";

export default function CartSummary() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) =>
    state.items.reduce((sum, i) => sum + i.price * i.qty, 0),
  );
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);

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
                  onClick={() => decrement(item.id)}
                >
                  −
                </button>
                <span>{item.qty}</span>
                <button
                  className="btn btn--qty"
                  onClick={() => increment(item.id)}
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
