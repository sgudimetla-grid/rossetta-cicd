"use client";

import Link from "next/link";
import { useCart } from "@/lib/cartContext";
import { formatPrice } from "@/lib/cars";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="container">
        <div className="cart-empty">
          <h2>Your Cart is Empty</h2>
          <p>Browse our collection and add some cars to your cart.</p>
          <Link href="/cars" className="btn btn-primary btn-lg">
            Browse Cars
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Shopping Cart</h1>
        <p>{totalItems} {totalItems === 1 ? "item" : "items"} in your cart</p>
      </div>

      <div className="cart-layout">
        <div>
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-info">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-brand">
                  {item.brand} &middot; {item.year}
                </p>
                <div className="cart-item-bottom">
                  <span className="cart-item-price">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <div className="quantity-control">
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      &minus;
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.id)}
                      style={{ marginLeft: "0.5rem" }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          {items.map((item) => (
            <div key={item.id} className="summary-row">
              <span>
                {item.name} x{item.quantity}
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className="summary-row">
            <span>Shipping</span>
            <span style={{ color: "var(--success)" }}>Free</span>
          </div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <span className="total-price">{formatPrice(totalPrice)}</span>
          </div>
          <Link href="/checkout" className="btn btn-primary btn-lg">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
