"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function FestiveComboSection() {

    const { addToCart } = useCart();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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

            {/* Title */}

            <h2 className="text-center text-2xl md:text-3xl font-semibold mb-12">
                FESTIVE DELIGHT COMBOS
            </h2>

            {/* Products */}

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                {combos.map((product) => {

                    return (

                        <div
                            key={product.id}
                            className="flex flex-col h-full bg-white rounded-lg shadow hover:shadow-lg transition p-4"
                        >

                            {/* Image */}

                            <Link href={`/product/${product.id}`}>

                                <div className="relative h-[200px] flex items-center justify-center mb-4 cursor-pointer">

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

                            <div className="flex items-center gap-2 mb-4">

                                <span className="font-semibold text-lg">
                                    ₹ {product.price}
                                </span>

                            </div>

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

            <div className="flex justify-center mt-12">

                <Link
                    href="/collections"
                    className="border border-gray-400 px-10 py-3 hover:bg-black hover:text-white transition"
                >
                    View all
                </Link>

            </div>

        </section>

    );

}