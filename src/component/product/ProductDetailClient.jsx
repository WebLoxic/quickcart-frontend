"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useParams } from "next/navigation";
import ProductCard from "@/component/ProductCard";

export default function ProductDetailClient() {

  const { addToCart } = useCart();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  /* FETCH PRODUCT DETAILS */

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const res = await fetch(
          `https://bobby.webloxic.cloud/api/product-details/${id}`
        );

        const data = await res.json();

        if (data.status) {

          setProduct(data.product);
          setSelectedImage(data.product.image);

        }

      } catch (error) {

        console.log("Product API Error:", error);

      }

    };

    fetchProduct();

  }, [id]);

  /* FETCH SIMILAR PRODUCTS */

  useEffect(() => {

    const fetchProducts = async () => {

      if (!product) return;

      try {

        const res = await fetch(
          "https://bobby.webloxic.cloud/api/products"
        );

        const data = await res.json();

        const filtered = data.products.filter(
          (p) =>
            Number(p.category_id) === Number(product.category_id) &&
            Number(p.id) !== Number(product.id)
        );

        setSimilarProducts(filtered.slice(0, 5));

      } catch (error) {

        console.log("Similar Product Error:", error);

      }

    };

    fetchProducts();

  }, [product]);

  if (!product) {

    return (
      <div className="text-center py-20">
        Loading product...
      </div>
    );

  }

  const images = product.image ? [product.image] : ["/next.svg"];

  return (

    <div className="max-w-[1250px] mx-auto px-6 py-12">

      {/* PRODUCT SECTION */}

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

        </div>

        {/* RIGHT SIDE */}

        <div>

          <p className="text-gray-500 uppercase text-sm mb-2">
            {product.category?.name}
          </p>

          <h1 className="text-2xl font-semibold mb-4">
            {product.name}
          </h1>

          <p className="text-xl font-semibold mb-6">
            MRP ₹ {Number(product.price).toFixed(2)}
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

          {/* Description */}

          <div className="mt-10">

            <h2 className="text-xl font-semibold mb-3">
              Product Description
            </h2>

            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

          </div>

        </div>

      </div>

      {/* SIMILAR PRODUCTS */}

      {similarProducts.length > 0 && (

        <div className="mt-20">

          <h2 className="text-2xl font-semibold mb-8">
            Similar Products
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

            {similarProducts.map((item) => (

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