"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {

  const { addToCart } = useCart();

  const imageSrc = product.image
    ? product.image
    : "/next.svg";

  return (

    <div className="text-center">

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

      <div className="text-yellow-500 text-sm mb-2">
        ★★★★★ <span className="text-gray-500 text-xs">(6)</span>
      </div>

      <p className="text-gray-800 mb-4">
        MRP ₹ {Number(product.price).toFixed(2)}
      </p>

      <button
        onClick={() => addToCart(product)}
        className="border border-gray-400 w-full py-3 hover:bg-black hover:text-white transition"
      >
        Add to cart
      </button>

    </div>
  );
}