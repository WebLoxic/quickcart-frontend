"use client";

import products from "@/data/products";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function SweetsSection() {

    const { addToCart } = useCart();

    const sweetProducts = products
        .filter((item) => item.category === "Sweets")
        .slice(0, 3);

    return (

        <section className="max-w-[1250px] mx-auto px-4 py-16">

            {/* Title */}

            <h2 className="text-center text-2xl md:text-3xl font-semibold mb-10">
                DELIGHTFUL SWEET TREATS
            </h2>

            {/* Products */}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

                {sweetProducts.map((product) => {

                    const imageSrc =
                        product?.images?.length
                            ? product.images[0]
                            : product.image;

                    return (

                        <div
                            key={product.id}
                            className="text-center flex flex-col h-full"
                        >

                            {/* Image */}

                            <Link href={`/product/${product.slug || product.id}`}>

                                <div className="bg-gray-50 p-4 mb-3 cursor-pointer">

                                    <img
                                        src={imageSrc}
                                        alt={product.name}
                                        className="h-[180px] w-full object-contain mx-auto"
                                    />

                                </div>

                            </Link>

                            {/* Sold out badge */}

                            {product.soldOut && (

                                <span className="text-xs bg-gray-200 px-3 py-1 rounded-full inline-block mb-2">
                                    Sold out
                                </span>

                            )}

                            {/* Name */}

                            <Link href={`/product/${product.slug || product.id}`}>

                                <h3 className="text-sm leading-snug min-h-[40px] mb-2 hover:underline cursor-pointer">
                                    {product.name}
                                </h3>

                            </Link>

                            {/* Price */}

                            <div className="mb-4">

                                {product.originalPrice && (

                                    <span className="text-gray-400 line-through text-sm mr-2">
                                        ₹ {product.originalPrice}
                                    </span>

                                )}

                                <span className="font-semibold">
                                    ₹ {product.price}
                                </span>

                                {product.discount && (

                                    <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                        {product.discount}
                                    </span>

                                )}

                            </div>

                            {/* Button */}

                            {product.soldOut ? (

                                <button className="border border-gray-300 w-full py-3 text-gray-400">
                                    Sold out
                                </button>

                            ) : (

                                <button
                                    onClick={() => addToCart(product)}
                                    className="border border-gray-400 w-full py-3 hover:bg-black hover:text-white transition"
                                >
                                    Add to cart
                                </button>

                            )}

                        </div>

                    )

                })}

            </div>

        </section>

    )

}