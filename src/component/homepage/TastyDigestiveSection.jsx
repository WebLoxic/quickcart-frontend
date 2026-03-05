"use client";

import Link from "next/link";
import products from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function TastyDigestiveSection() {

    const { addToCart } = useCart();

    /* filter category */

    const filteredProducts = products
        .filter((item) => item.category === "Digestive Candy")
        .slice(0, 5);

    return (

        <section className="max-w-[1250px] mx-auto px-4 py-16">

            {/* Heading */}

            <h2 className="text-center text-2xl md:text-3xl font-semibold mb-10">
                TASTY & DIGESTIVE CANDY
            </h2>

            {/* Product Grid */}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

                {filteredProducts.map((product) => {

                    const imageSrc =
                        product?.images?.length
                            ? product.images[0]
                            : product.image;

                    return (

                        <div key={product.id} className="text-center">

                            {/* CLICKABLE PRODUCT */}

                            <Link href={`/product/${product.id}`}>

                                <img
                                    src={imageSrc}
                                    className="w-full object-contain mb-4 cursor-pointer"
                                />

                                <h3 className="text-sm leading-snug mb-2 hover:underline cursor-pointer">
                                    {product.name}
                                </h3>

                            </Link>

                            {/* Price */}

                            <p className="mb-4 text-gray-700">
                                MRP ₹ {product.price.toFixed(2)}
                            </p>

                            {/* Add to cart */}

                            <button
                                onClick={() => addToCart(product)}
                                className="border border-gray-400 w-full py-3 hover:bg-black hover:text-white transition"
                            >
                                Add to cart
                            </button>

                        </div>

                    );

                })}

            </div>

            {/* View All */}

            <div className="flex justify-center mt-10">

                <Link
                    href="/collections/digestive"
                    className="border border-gray-400 px-10 py-3 hover:bg-black hover:text-white transition"
                >
                    View all
                </Link>

            </div>

        </section>

    );

}