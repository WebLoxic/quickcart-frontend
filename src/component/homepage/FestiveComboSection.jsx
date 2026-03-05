"use client";

import products from "@/data/products";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function FestiveComboSection() {

    const { addToCart } = useCart();

    /* Filter Gift Pack Products */

    const combos = products
        .filter((item) => item.category === "Gift Packs")
        .slice(0, 4);

    return (

        <section className="max-w-[1250px] mx-auto px-4 py-16">

            {/* Title */}

            <h2 className="text-center text-2xl md:text-3xl font-semibold mb-12">
                FESTIVE DELIGHT COMBOS
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
                            className="flex flex-col h-full bg-white rounded-lg shadow hover:shadow-lg transition p-4"
                        >

                            {/* Image */}

                            <Link href={`/product/${product.slug || product.id}`}>

                                <div className="relative h-[200px] flex items-center justify-center mb-4 cursor-pointer">

                                    <img
                                        src={imageSrc}
                                        alt={product.name}
                                        className="max-h-full object-contain"
                                    />

                                    {product.discount && (

                                        <span className="absolute bottom-3 left-3 bg-gray-200 text-xs px-3 py-1 rounded-full">
                                            Sale
                                        </span>

                                    )}

                                </div>

                            </Link>

                            {/* Name */}

                            <Link href={`/product/${product.slug || product.id}`}>

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

                                {product.originalPrice && (

                                    <span className="text-gray-400 line-through text-sm">
                                        ₹ {product.originalPrice}
                                    </span>

                                )}

                                <span className="font-semibold text-lg">
                                    ₹ {product.price}
                                </span>

                                {product.discount && (

                                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                                        {product.discount}
                                    </span>

                                )}

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
                    href="/collections/gift-packs"
                    className="border border-gray-400 px-10 py-3 hover:bg-black hover:text-white transition"
                >
                    View all
                </Link>

            </div>

        </section>

    );

}