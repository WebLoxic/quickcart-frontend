"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import products from "@/data/products";
import ProductCard from "@/component/ProductCard";

export default function ProductDetailClient({ product }) {

  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const images =
    product?.images?.length
      ? product.images
      : product?.image
      ? [product.image]
      : ["/next.svg"];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  /* Similar Products */

  const similarProducts = products.filter(
    (item) =>
      item.category === product.category &&
      item.id !== product.id
  );

  return (

    <div className="max-w-[1250px] mx-auto px-6 py-12">

      {/* ================= PRODUCT SECTION ================= */}

      <div className="grid md:grid-cols-2 gap-16">

        {/* LEFT IMAGE */}

        <div>

          <div className="relative w-full h-[420px] bg-white">

            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-contain"
            />

          </div>

          {/* THUMBNAILS */}

          {images.length > 1 && (

            <div className="flex gap-3 mt-4">

              {images.map((img, index) => (

                <div
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-[80px] h-[80px] cursor-pointer border ${
                    selectedImage === img
                      ? "border-black"
                      : "border-gray-200"
                  }`}
                >

                  <Image
                    src={img}
                    alt="thumb"
                    fill
                    className="object-contain p-1"
                  />

                </div>

              ))}

            </div>

          )}

        </div>

        {/* RIGHT SIDE */}

        <div>

          <p className="text-gray-500 uppercase text-sm mb-2">
            SATMOLA
          </p>

          <h1 className="text-2xl font-semibold mb-4">
            {product.name}
          </h1>

          {/* Rating */}

          <div className="flex items-center gap-2 mb-4 text-yellow-500">
            ★★★★★
            <span className="text-gray-600 text-sm">
              3 Reviews
            </span>
          </div>

          {/* Price */}

          <p className="text-xl font-semibold mb-6">
            MRP ₹ {product.price}.00
          </p>

          <p className="text-sm text-gray-500 mb-6">
            Inclusive of all taxes Shipping calculated at checkout.
          </p>

          {/* Quantity */}

          <div className="flex items-center gap-4 mb-6">

            <p>Quantity</p>

            <div className="flex border">

              <button
                onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                className="px-4 py-2"
              >
                -
              </button>

              <span className="px-6 py-2 border-x">
                {qty}
              </span>

              <button
                onClick={() => setQty(qty + 1)}
                className="px-4 py-2"
              >
                +
              </button>

            </div>

          </div>

          {/* Buttons */}

          <button
            onClick={() => addToCart({ ...product, qty })}
            className="w-full border py-3 mb-3 hover:bg-black hover:text-white transition"
          >
            Add to cart
          </button>

          <button className="w-full bg-black text-white py-3">
            Buy it now
          </button>

          {/* Pickup */}

          <p className="mt-6 text-sm text-gray-600">
            ✔ Pickup available at Shop location
          </p>

          <p className="text-sm text-gray-500">
            Usually ready in 24 hours
          </p>

          {/* Description */}

          <div className="mt-10">

            <h2 className="text-xl font-semibold mb-3">
              Product Description
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Enjoy the perfect balance of flavors with {product.name}.
              This crunchy and mildly spiced snack is ideal for teatime
              or anytime cravings.
            </p>

          </div>

        </div>

      </div>

      {/* ================= SIMILAR PRODUCTS ================= */}

      {similarProducts.length > 0 && (

        <div className="mt-20">

          <h2 className="text-2xl font-semibold mb-8">
            Similar Products
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

            {similarProducts.slice(0, 5).map((item) => (

              <ProductCard
                key={item.id}
                product={item}
              />

            ))}

          </div>

        </div>

      )}

    </div>

  );

}