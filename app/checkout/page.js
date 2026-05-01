"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cartContext";
import { formatPrice } from "@/lib/cars";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (orderPlaced) {
    return (
      <div className="container">
        <div className="success-page">
          <div className="success-icon">&#10003;</div>
          <h1>Order Placed Successfully!</h1>
          <p>
            Thank you for your purchase. You will receive a confirmation email
            shortly.
          </p>
          <Link href="/cars" className="btn btn-primary btn-lg">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container">
        <div className="cart-empty">
          <h2>Nothing to Checkout</h2>
          <p>Your cart is empty. Add some cars first.</p>
          <Link href="/cars" className="btn btn-primary btn-lg">
            Browse Cars
          </Link>
        </div>
      </div>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    clearCart();
    setOrderPlaced(true);
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Checkout</h1>
        <p>Complete your purchase</p>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" placeholder="John" required />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" placeholder="Doe" required />
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="john@example.com" required />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" placeholder="+1 (555) 000-0000" required />
            </div>
          </div>

          <div className="form-section">
            <h3>Shipping Address</h3>
            <div className="form-group">
              <label>Street Address</label>
              <input type="text" placeholder="123 Main Street" required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input type="text" placeholder="New York" required />
              </div>
              <div className="form-group">
                <label>State</label>
                <input type="text" placeholder="NY" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>ZIP Code</label>
                <input type="text" placeholder="10001" required />
              </div>
              <div className="form-group">
                <label>Country</label>
                <select required defaultValue="">
                  <option value="" disabled>Select country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="DE">Germany</option>
                  <option value="IN">India</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Payment Method</h3>
            <div className="form-group">
              <label>Card Number</label>
              <input type="text" placeholder="4242 4242 4242 4242" required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input type="text" placeholder="MM/YY" required />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input type="text" placeholder="123" required />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-success btn-lg" style={{ width: "100%" }}>
            Place Order &mdash; {formatPrice(totalPrice)}
          </button>
        </form>

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
        </div>
      </div>
    </div>
  );
}
