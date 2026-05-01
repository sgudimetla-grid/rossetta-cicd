"use client";

import { use } from "react";
import Link from "next/link";
import { getCarById, formatPrice } from "@/lib/cars";
import { useCart } from "@/lib/cartContext";

export default function CarDetailPage({ params }) {
  const { id } = use(params);
  const car = getCarById(id);
  const { addToCart } = useCart();

  if (!car) {
    return (
      <div className="container">
        <div className="cart-empty">
          <h2>Car Not Found</h2>
          <p>The car you are looking for does not exist.</p>
          <Link href="/cars" className="btn btn-primary">
            Browse Cars
          </Link>
        </div>
      </div>
    );
  }

  const specs = [
    { label: "Horsepower", value: `${car.horsepower} HP` },
    { label: "Top Speed", value: car.topSpeed },
    { label: "0-60 mph", value: car.acceleration },
    { label: "Transmission", value: car.transmission },
    { label: "Fuel Type", value: car.fuelType },
    { label: "Seats", value: car.seats },
    { label: "Color", value: car.color },
    { label: "Range", value: car.range },
  ];

  return (
    <div className="container">
      <div style={{ padding: "1rem 0" }}>
        <Link href="/cars" className="btn btn-outline btn-sm">
          &larr; Back to Cars
        </Link>
      </div>

      <div className="car-detail">
        <div>
          <img src={car.image} alt={car.name} className="car-detail-image" />
        </div>

        <div className="car-detail-info">
          <h1>{car.name}</h1>
          <p className="car-detail-meta">
            {car.brand} &middot; {car.year} &middot; {car.category}
          </p>
          <p className="car-detail-price">{formatPrice(car.price)}</p>
          <p className="car-detail-description">{car.description}</p>

          <div className="specs-grid">
            {specs.map((spec) => (
              <div key={spec.label} className="spec-item">
                <p className="spec-label">{spec.label}</p>
                <p className="spec-value">{spec.value}</p>
              </div>
            ))}
          </div>

          <button className="btn btn-primary btn-lg" onClick={() => addToCart(car)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
