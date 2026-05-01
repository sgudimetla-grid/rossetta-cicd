"use client";

import Link from "next/link";
import { useCart } from "@/lib/cartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="logo">
          <span className="logo-icon">&#9670;</span>
          AutoElite
        </Link>
        <nav className="nav">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/cars" className="nav-link">Cars</Link>
          <Link href="/cart" className="nav-link cart-link">
            Cart
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}
