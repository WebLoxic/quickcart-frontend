"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function FreeShippingCombosSection() {

    const { addToCart } = useCart();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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

    /* show only first 4 */

    const combos = products.slice(0, 4);

    if (loading) {

        return (
            <div className="text-center py-20 text-gray-500">
                Loading products...
            </div>
        );

    }

    return (

        <section className="max-w-[1250px] mx-auto px-4 py-16">

            {/* Banner */}

            <div className="mb-10">

                <img
                    src="/assets/images/product/freeshipbanner.webp"
                    alt="Free Shipping Banner"
                    className="w-full rounded-lg"
                />

            </div>

            {/* Title */}

            <h2 className="text-center text-2xl md:text-3xl font-semibold mb-10">
                FREE SHIPPING COMBOS
            </h2>

            {/* Products */}

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                {combos.map((product) => (

                    <div
                        key={product.id}
                        className="flex flex-col h-full text-center border border-gray-200 p-4 rounded-lg"
                    >

                        {/* Image */}

                        <Link href={`/product/${product.id}`}>

                            <div className="h-[180px] flex items-center justify-center mb-4 cursor-pointer">

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="max-h-full object-contain"
                                />

                            </div>

                        </Link>

                        {/* Name */}

                        <Link href={`/product/${product.id}`}>

                            <h3 className="text-sm leading-snug line-clamp-2 min-h-[40px] mb-2 hover:underline cursor-pointer">
                                {product.name}
                            </h3>

                        </Link>

                        {/* Brand */}

                        <p className="text-xs tracking-widest text-gray-400 mb-2">
                            SATMOLA
                        </p>

                        {/* Price */}

                        <p className="text-gray-700 mb-4">
                            MRP ₹ {Number(product.price).toFixed(2)}
                        </p>

                        {/* Button */}

                        <button
                            onClick={() => addToCart(product)}
                            className="mt-auto border border-gray-400 py-3 hover:bg-black hover:text-white transition"
                        >
                            Add to cart
                        </button>

                    </div>

                ))}

            </div>

            {/* View All */}

            <div className="flex justify-center mt-10">

                <Link
                    href="/collections/free-shipping-combo-packs"
                    className="border border-gray-400 px-10 py-3 hover:bg-black hover:text-white transition"
                >
                    View all
                </Link>

            </div>

        </section>

    );

}