"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { cart, addToCart, removeFromCart } = useCart();

  const cartItem = cart.find((item) => item.id === product.id);
  const qty = cartItem ? cartItem.qty : 0;

  /* ================= SAFE IMAGE LOGIC ================= */

  const imageSrc =
    product?.images?.length && product.images[0]?.trim()
      ? product.images[0]
      : product?.image?.trim()
      ? product.image
      : "/next.svg"; // fallback image

  /* ==================================================== */

  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="relative min-w-[170px] h-[250px] bg-white rounded-xl border border-gray-200 p-3 hover:shadow-md transition flex flex-col cursor-pointer">

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-[9px] px-2 py-[2px] rounded font-semibold z-10">
            {product.discount}
          </div>
        )}

        {/* Image */}
        <div className="relative w-full h-24 mb-2">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>

        {/* Delivery */}
        <p className="text-[10px] text-gray-600">⏱ 9 MINS</p>

        {/* Product Name */}
        <h3 className="text-[13px] font-medium text-gray-900 leading-tight line-clamp-2 min-h-[34px]">
          {product.name}
        </h3>

        {/* Weight */}
        <p className="text-[11px] text-gray-500 mb-2">
          {product.weight}
        </p>

        {/* Bottom Section */}
        <div className="mt-auto flex items-center justify-between">

          {/* Price */}
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold">
              ₹{product.price}
            </span>

            {product.originalPrice && (
              <span className="text-[10px] text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Cart Button */}
          {qty === 0 ? (
            <button
              onClick={(e) => {
                e.preventDefault(); // prevent navigation
                addToCart(product);
              }}
              className="border border-green-600 text-green-600 text-[12px] font-semibold px-4 py-[3px] rounded-md hover:bg-green-600 hover:text-white transition"
            >
              ADD
            </button>
          ) : (
            <div
              onClick={(e) => e.preventDefault()}
              className="flex items-center border border-green-600 rounded-md"
            >
              <button
                onClick={() => removeFromCart(product.id)}
                className="px-2 text-green-600 font-bold"
              >
                -
              </button>

              <span className="px-2 text-sm">{qty}</span>

              <button
                onClick={() => addToCart(product)}
                className="px-2 text-green-600 font-bold"
              >
                +
              </button>
            </div>
          )}
        </div>

      </div>
    </Link>
  );
}