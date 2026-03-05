"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {

  const { addToCart } = useCart();

  const imageSrc =
    product?.images?.length && product.images[0]?.trim()
      ? product.images[0]
      : product?.image?.trim()
      ? product.image
      : "/next.svg";

  return (

    <div className="text-center">

      {/* CLICKABLE PRODUCT */}

      <Link href={`/product/${product.id}`}>

        <div className="relative w-full h-[220px] mb-4 cursor-pointer">

          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-contain"
          />

        </div>

        <h3 className="text-sm leading-snug mb-2 hover:underline cursor-pointer">
          {product.name}
        </h3>

      </Link>

      {/* Rating */}

      <div className="text-yellow-500 text-sm mb-2">
        ★★★★★ <span className="text-gray-500 text-xs">(6)</span>
      </div>

      {/* Price */}

      <p className="text-gray-800 mb-4">
        MRP ₹ {product.price.toFixed(2)}
      </p>

      {/* Add To Cart */}

      <button
        onClick={() => addToCart(product)}
        className="border border-gray-400 w-full py-3 hover:bg-black hover:text-white transition"
      >
        Add to cart
      </button>

    </div>

  );

}