"use client";

import products from "@/data/products";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function NamkeenSection() {

  const { addToCart } = useCart();

  const namkeenProducts = products
    .filter((item) => item.category === "Namkeens")
    .slice(0, 5);

  return (

    <section className="max-w-[1250px] mx-auto px-4 py-16">

      <h2 className="text-center text-2xl md:text-3xl font-semibold mb-10">
        CRUNCHY NAMKEEN TREATS
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

        {namkeenProducts.map((product) => {

          const imageSrc =
            product?.images?.length
              ? product.images[0]
              : product.image;

          return (

            <div key={product.id} className="text-center flex flex-col h-full">

              {/* Image */}

              <Link href={`/product/${product.slug || product.id}`}>

                <div className="cursor-pointer">

                  <img
                    src={imageSrc}
                    alt={product.name}
                    className="w-full object-contain mb-4"
                  />

                </div>

              </Link>

              {/* Name */}

              <Link href={`/product/${product.slug || product.id}`}>

                <h3 className="text-sm leading-snug mb-2 hover:underline cursor-pointer min-h-[48px]">
                  {product.name}
                </h3>

              </Link>

              {/* Rating space */}

              <div className="h-[20px]"></div>

              {/* Price */}

              <p className="mb-4 text-gray-700">
                MRP ₹ {product.price.toFixed(2)}
              </p>

              {/* Button */}

              <button
                onClick={() => addToCart(product)}
                className="border border-gray-400 w-full py-3 hover:bg-black hover:text-white transition mt-auto"
              >
                Add to cart
              </button>

            </div>

          );

        })}

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