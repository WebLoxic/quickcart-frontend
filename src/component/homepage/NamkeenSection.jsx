"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function NamkeenSection() {

  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  /* fetch categories */

  useEffect(() => {

    const fetchCategories = async () => {

      try {

        const res = await fetch(
          "https://bobby.webloxic.cloud/api/categories"
        );

        const data = await res.json();

        setCategories(data);

      } catch (error) {

        console.log("Category API Error:", error);

      }

    };

    fetchCategories();

  }, []);

  /* fetch products */

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const res = await fetch(
          "https://bobby.webloxic.cloud/api/products",
          { cache: "no-store" }
        );

        const data = await res.json();

        if (data.status) {
          setProducts(data.products);
        }

      } catch (error) {

        console.log("Products API Error:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, []);

  /* find namkeens category */

  const namkeenCategory = categories.find(
    (c) => c.name.toLowerCase() === "namkeens"
  );

  const namkeenId = namkeenCategory?.id;

  /* filter products */

  const namkeenProducts = products
    .filter((p) => Number(p.category_id) === Number(namkeenId))
    .slice(0, 5);

  if (loading) {

    return (
      <div className="text-center py-20 text-gray-500">
        Loading products...
      </div>
    );

  }

  return (

    <section className="max-w-[1250px] mx-auto px-4 py-16">

      <h2 className="text-center text-2xl md:text-3xl font-semibold mb-10">
        CRUNCHY NAMKEEN TREATS
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

        {namkeenProducts.length === 0 ? (

          <p className="col-span-full text-center text-gray-500">
            No Namkeen products found
          </p>

        ) : (

          namkeenProducts.map((product) => (

            <div key={product.id} className="text-center flex flex-col h-full">

              <Link href={`/product/${product.id}`}>

                <div className="cursor-pointer">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full object-contain mb-4"
                  />

                </div>

              </Link>

              <Link href={`/product/${product.id}`}>

                <h3 className="text-sm leading-snug mb-2 hover:underline cursor-pointer min-h-[48px]">
                  {product.name}
                </h3>

              </Link>

              <div className="h-[20px]"></div>

              <p className="mb-4 text-gray-700">
                MRP ₹ {Number(product.price).toFixed(2)}
              </p>

              <button
                onClick={() => addToCart(product)}
                className="border border-gray-400 w-full py-3 hover:bg-black hover:text-white transition mt-auto"
              >
                Add to cart
              </button>

            </div>

          ))

        )}

      </div>

      <div className="flex justify-center mt-10">

        <Link
          href="/collections/namkeens"
          className="border border-gray-400 px-10 py-3 hover:bg-black hover:text-white transition"
        >
          View all
        </Link>

      </div>

    </section>

  );

}