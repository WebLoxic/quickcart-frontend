"use client";
import { useRef, useState } from "react";
import products from "@/data/products";
import ProductCard from "../ProductCard";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function ProductSection({ title, category }) {
  const scrollRef = useRef(null);
  const [showAll, setShowAll] = useState(false);

  // ✅ Filter products by category
  const filteredProducts = products.filter(
    (item) => item.category === category
  );

  const scroll = (direction) => {
    scrollRef.current.scrollBy({
      left: direction === "right" ? 400 : -400,
      behavior: "smooth",
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold">{title}</h2>

        <button
          onClick={() => setShowAll(!showAll)}
          className="text-green-600 font-medium text-sm"
        >
          {showAll ? "Show Less" : "See All"}
        </button>
      </div>

      {showAll ? (
        // ✅ Grid View
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        // ✅ Horizontal Scroll
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hidden md:block"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hidden md:block"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </section>
  );
}