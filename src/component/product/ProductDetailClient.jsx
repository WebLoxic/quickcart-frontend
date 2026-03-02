"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/component/homepage/ProductCard";
import products from "@/data/products";

export default function ProductDetailClient({ product }) {
  const { addToCart } = useCart();

  /* ================= SAFE IMAGE HANDLING ================= */

  const images =
    product?.images?.length
      ? product.images
      : product?.image
      ? [product.image]
      : ["/next.svg"];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  /* ======================================================= */

  const similarProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* MAIN SECTION */}
      <div className="grid md:grid-cols-2 gap-12">

        {/* LEFT SIDE */}
        <div>

          {/* Main Image */}
          <div className="relative w-full h-[420px] bg-white rounded-xl border">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-contain p-10"
            />
          </div>

          {/* Thumbnail Images */}
          {images.length > 1 && (
            <div className="flex gap-4 mt-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 border rounded-lg cursor-pointer ${
                    selectedImage === img
                      ? "border-green-600"
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    src={img}
                    alt="thumb"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              ))}
            </div>
          )}

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-5">

          <div className="text-sm text-gray-500">
            Home / {product.category}
          </div>

          <h1 className="text-2xl font-bold">
            {product.name}
          </h1>

          <p className="text-gray-600">
            {product.weight}
          </p>

          <div className="text-3xl font-semibold">
            ₹{product.price}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Add to cart
          </button>

          {/* Why Shop Section */}
          <div className="mt-8 space-y-3">
            <h2 className="font-semibold text-lg">
              Why shop from QuickCart?
            </h2>

            <ul className="text-sm text-gray-600 space-y-2">
              <li>• 10 minute delivery</li>
              <li>• Best prices & offers</li>
              <li>• Wide assortment</li>
            </ul>
          </div>

        </div>

      </div>

      {/* SIMILAR PRODUCTS */}
      {similarProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-semibold mb-6">
            Similar products
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {similarProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}