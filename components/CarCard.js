"use client";

import Link from "next/link";
import { useCart } from "@/lib/cartContext";
import { formatPrice } from "@/lib/cars";

export default function CarCard({ car }) {
  const { addToCart } = useCart();

  return (
    <div className="car-card">
      <div className="car-card-image-wrapper">
        <img src={car.image} alt={car.name} className="car-card-image" />
        <span className="car-card-category">{car.category}</span>
      </div>
      <div className="car-card-body">
        <div className="car-card-header">
          <h3 className="car-card-name">{car.name}</h3>
          <p className="car-card-brand">{car.brand} &middot; {car.year}</p>
        </div>
        <div className="car-card-specs">
          <span>{car.horsepower} HP</span>
          <span>{car.transmission}</span>
          <span>{car.fuelType}</span>
        </div>
        <div className="car-card-footer">
          <span className="car-card-price">{formatPrice(car.price)}</span>
          <div className="car-card-actions">
            <Link href={`/cars/${car.id}`} className="btn btn-outline btn-sm">
              Details
            </Link>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => addToCart(car)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
