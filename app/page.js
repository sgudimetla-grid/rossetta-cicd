import Link from "next/link";
import { getFeaturedCars } from "@/lib/cars";
import CarCard from "@/components/CarCard";

export default function Home() {
  const featured = getFeaturedCars();

  return (
    <div className="container">
      <section className="hero">
        <h1>Find Your Dream Car</h1>
        <p>
          Explore our curated collection of premium vehicles. From electric
          performance to classic sports cars.
        </p>
        <div className="hero-actions">
          <Link href="/cars" className="btn btn-primary btn-lg">
            Browse All Cars
          </Link>
          <Link href="/cars" className="btn btn-outline btn-lg">
            View Categories
          </Link>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Featured Cars</h2>
        <div className="car-grid">
          {featured.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      <section className="section">
        <div style={{ textAlign: "center", padding: "2rem 0" }}>
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>
            Ready to Find Your Car?
          </h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            Browse our full catalog of 9 premium vehicles across Electric,
            Sports, and SUV categories.
          </p>
          <Link href="/cars" className="btn btn-primary btn-lg">
            View Full Catalog
          </Link>
        </div>
      </section>
    </div>
  );
}
