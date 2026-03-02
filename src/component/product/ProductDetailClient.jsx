"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/component/homepage/ProductCard";
import products from "@/data/products";
import Link from "next/link";
 import { Clock, Tag, ShieldCheck } from "lucide-react";

export default function ProductDetailClient({ product }) {
  const { addToCart } = useCart();

  const images =
    product?.images?.length
      ? product.images
      : product?.image
      ? [product.image]
      : ["/next.svg"];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  const similarProducts = products.filter(
    (item) =>
      item.category === product.category &&
      item.id !== product.id
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* ================= MAIN SECTION ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">

          {/* LEFT SIDE */}
          <div>

            {/* Main Image */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10">
              <div className="relative w-full h-[300px] sm:h-[420px]">
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto">
                {images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`relative min-w-[70px] h-[70px] bg-white rounded-xl border cursor-pointer ${
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
          <div className="flex flex-col justify-start">

            {/* Breadcrumb */}
            <p className="text-sm text-gray-500 mb-3">
              Home / {product.category}
            </p>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              {product.name}
            </h1>

            {/* Weight */}
            <p className="text-gray-500 text-sm mt-2">
              {product.weight}
            </p>

            {/* Price + Add to Cart Row */}
            <div className="flex items-center justify-between mt-6">

              <div className="text-3xl sm:text-4xl font-bold text-gray-900">
                ₹{product.price}
              </div>

              <button
                onClick={() => addToCart(product)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition"
              >
                Add to cart
              </button>

            </div>

          

{/* Why Shop Section */}
<div className="mt-10 pt-8 border-t border-gray-200">
  <h2 className="text-lg font-semibold mb-6">
    Why shop from QuickCart?
  </h2>

  <div className="space-y-6">

    {/* Express Delivery */}
    <div className="flex items-start gap-4">
      <div className="bg-green-100 p-3 rounded-full">
        <Clock className="text-green-600" size={22} />
      </div>
      <div>
        <p className="font-semibold text-gray-900">
          Round The Clock Delivery
        </p>
        <p className="text-sm text-gray-600">
          Get items delivered to your doorstep from dark stores near you,
          whenever you need them.
        </p>
      </div>
    </div>

    {/* Best Prices */}
    <div className="flex items-start gap-4">
      <div className="bg-green-100 p-3 rounded-full">
        <Tag className="text-green-600" size={22} />
      </div>
      <div>
        <p className="font-semibold text-gray-900">
          Best Prices & Offers
        </p>
        <p className="text-sm text-gray-600">
          Best price destination with offers directly from the manufacturers.
        </p>
      </div>
    </div>

    {/* Genuine Products */}
    <div className="flex items-start gap-4">
      <div className="bg-green-100 p-3 rounded-full">
        <ShieldCheck className="text-green-600" size={22} />
      </div>
      <div>
        <p className="font-semibold text-gray-900">
          Wide Assortment
        </p>
        <p className="text-sm text-gray-600">
          Choose from 30,000+ products across food, personal care,
          household & other categories.
        </p>
      </div>
    </div>

  </div>
</div>

          </div>

        </div>

        {/* ================= SIMILAR PRODUCTS ================= */}
        {similarProducts.length > 0 && (
          <div className="mt-16 sm:mt-20">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Similar products
              </h2>

              <Link
                href={`/category/${product.category}`}
                className="text-green-600 font-medium text-sm hover:underline"
              >
                See All
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {similarProducts.slice(0, 6).map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}