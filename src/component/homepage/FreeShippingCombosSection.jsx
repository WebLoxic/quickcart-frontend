"use client";

import products from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function FreeShippingCombosSection() {

    const { addToCart } = useCart();

    /* Filter Free Shipping Products */

    const combos = products
        .filter((item) => item.category === "Free Shipping Combo")
        .slice(0, 4);

    return (

        <section className="max-w-[1250px] mx-auto px-4 py-16">

            {/* Banner */}

            <div className="mb-10">
                <img
                    src="/assets/images/product/freeshipbanner.webp"
                    className="w-full rounded-lg"
                />
            </div>

            {/* Title */}

            <h2 className="text-center text-2xl md:text-3xl font-semibold mb-10">
                FREE SHIPPING COMBOS
            </h2>

            {/* Products */}

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                {combos.map((product) => {

                    const imageSrc =
                        product?.images?.length
                            ? product.images[0]
                            : product.image;

                    return (

                        <div
                            key={product.id}
                            className="flex flex-col h-full text-center border border-gray-200 p-4 rounded-lg"
                        >

                            {/* Image */}

                            <div className="h-[180px] flex items-center justify-center mb-4">

                                <img
                                    src={imageSrc}
                                    className="max-h-full object-contain"
                                />

                            </div>

                            {/* Name */}

                            <h3 className="text-sm leading-snug line-clamp-2 min-h-[40px] mb-2">
                                {product.name}
                            </h3>

                            {/* Brand */}

                            <p className="text-xs tracking-widest text-gray-400 mb-2">
                                SATMOLA
                            </p>

                            {/* Price */}

                            <p className="text-gray-700 mb-4">
                                MRP ₹ {product.price.toFixed(2)}
                            </p>

                            {/* Button */}

                            <button
                                onClick={() => addToCart(product)}
                                className="mt-auto border border-gray-400 py-3 hover:bg-black hover:text-white transition"

                            >

                                Add to cart

                            </button>

                        </div>

                    );

                })}

            </div>

            {/* View All */}

            <div className="flex justify-center mt-10">

                <a
                    href="/collections/free-shipping-combo-packs"
                    className="border border-gray-400 px-10 py-3 hover:bg-black hover:text-white transition"

                >

                    View all

                </a>

            </div>

        </section>

    );

}
