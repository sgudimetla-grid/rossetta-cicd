"use client";

import { useState } from "react";
import { cars, getAllCategories } from "@/lib/cars";
import CarCard from "@/components/CarCard";

export default function CarsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...getAllCategories()];

  const filtered =
    activeCategory === "All"
      ? cars
      : cars.filter((car) => car.category === activeCategory);

  return (
    <div className="container">
      <div className="page-header">
        <h1>All Cars</h1>
        <p>Browse our full collection of {cars.length} premium vehicles.</p>
      </div>

      <div className="filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="car-grid">
        {filtered.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: "center", color: "var(--text-muted)", padding: "3rem 0" }}>
          No cars found in this category.
        </p>
      )}
    </div>
  );
}
