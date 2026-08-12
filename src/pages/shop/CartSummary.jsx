// @ts-nocheck
import { useCart } from "../../context/CartContext";

export default function CartSummary() {
  const { items, increment, decrement, total } = useCart();

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
