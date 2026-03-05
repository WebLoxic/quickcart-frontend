"use client";

import products from "@/data/products";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function NamkeenSection() {

    const { addToCart } = useCart();

    /* Filter Namkeen Products */

    const namkeenProducts = products
        .filter((item) => item.category === "Namkeens")
        .slice(0, 5);

    return (

        <section className="max-w-[1250px] mx-auto px-4 py-16">

            {/* Title */}

            <h2 className="text-center text-2xl md:text-3xl font-semibold mb-10">
                CRUNCHY NAMKEEN TREATS
            </h2>

            {/* Products */}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

                {namkeenProducts.map((product) => {

                    const imageSrc =
                        product?.images?.length
                            ? product.images[0]
                            : product.image;

                    return (

                        <div
                            key={product.id}
                            className="flex flex-col h-[360px] text-center"
                        >

                            {/* Image */}

                            <Link href={`/product/${product.slug || product.id}`}>

                                <div className="h-[180px] flex items-center justify-center cursor-pointer">

                                    <img
                                        src={imageSrc}
                                        alt={product.name}
                                        className="max-h-full object-contain"
                                    />

                                </div>

                            </Link>

                            {/* Name */}

                            <Link href={`/product/${product.slug || product.id}`}>

                                <h3 className="text-sm leading-snug mt-3 line-clamp-2 min-h-[40px] hover:underline cursor-pointer">
                                    {product.name}
                                </h3>

                            </Link>

                            {/* Price */}

                            <p className="mt-2 text-gray-700">
                                MRP ₹ {product.price.toFixed(2)}
                            </p>

                            {/* Button */}

                            <div className="mt-auto">

                                <button
                                    onClick={() => addToCart(product)}
                                    className="border border-gray-400 w-full py-3 hover:bg-black hover:text-white transition"
                                >
                                    Add to cart
                                </button>

                            </div>

                        </div>

                    );

                })}

            </div>

            {/* View All */}

            <div className="flex justify-center mt-10">

                <Link
                    href="/collections/namkeens"
                    className="border border-gray-400 px-10 py-3 hover:bg-black hover:text-white transition"
                >
                    View all
                </Link>

            </div>

        </section>

    );

}