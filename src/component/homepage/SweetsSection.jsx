"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function SweetsSection() {

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

    /* show first 3 products */

    const sweetProducts = products.slice(0, 3);

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

            <h2 className="text-center text-2xl md:text-3xl font-semibold mb-10">
                DELIGHTFUL SWEET TREATS
            </h2>

            {/* Products */}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

                {sweetProducts.map((product) => (

                    <div
                        key={product.id}
                        className="text-center flex flex-col h-full"
                    >

                        {/* Image */}

                        <Link href={`/product/${product.id}`}>

                            <div className="bg-gray-50 p-4 mb-3 cursor-pointer">

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-[180px] w-full object-contain mx-auto"
                                />

                            </div>

                        </Link>

                        {/* Name */}

                        <Link href={`/product/${product.id}`}>

                            <h3 className="text-sm leading-snug min-h-[40px] mb-2 hover:underline cursor-pointer">
                                {product.name}
                            </h3>

                        </Link>

                        {/* Price */}

                        <div className="mb-4">

                            <span className="font-semibold">
                                ₹ {Number(product.price).toFixed(2)}
                            </span>

                        </div>

                        {/* Button */}

                        <button
                            onClick={() => addToCart(product)}
                            className="border border-gray-400 w-full py-3 hover:bg-black hover:text-white transition"
                        >
                            Add to cart
                        </button>

                    </div>

                ))}

            </div>

        </section>

    )

}