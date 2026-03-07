"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/component/ProductCard";
import Link from "next/link";

export default function CategorySection({ category }) {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const res = await fetch(
          "https://bobby.webloxic.cloud/api/products"
        );

        const data = await res.json();

        const filtered = data.products
          .filter(p => Number(p.category_id) === Number(category.id))
          .slice(0,5);

        setProducts(filtered);

      } catch (error) {

        console.log(error);

      }

    };

    fetchProducts();

  }, [category.id]);

  return (

    <section className="max-w-[1250px] mx-auto px-4 py-16">

      <h2 className="text-center text-2xl md:text-3xl font-semibold mb-10">
        {category.name.toUpperCase()}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}

      </div>

      <div className="flex justify-center mt-10">

        <Link
          href={`/collections/${category.name.toLowerCase()}`}
          className="border border-gray-400 px-10 py-3 hover:bg-black hover:text-white transition"
        >
          View all
        </Link>

      </div>

    </section>

  );

}