"use client";

import Link from "next/link";

const categories = [
    {
        title: "DIGESTIVE",
        desc: "Tasty treats, happy digestion",
        image: "/assets/images/product/categories2.png",
        slug: "digestive",
    },
    {
        title: "NAMKEENS",
        desc: "Snack Delight in Every Bite",
        image: "/assets/images/product/categories1.png",
        slug: "namkeens",
    },
    {
        title: "SWEETS",
        desc: "Sweet treats with happiness",
        image: "/assets/images/product/categories3.png",
        slug: "sweets",
    },
    {
        title: "MUKHWAS",
        desc: "Fresh Treats, Anytime, Anywhere",
        image: "/assets/images/product/categories4.png",
        slug: "mouth-freshner",
    },
    {
        title: "SATMOLA COMBO",
        desc: "Special combos delivered",
        image: "/assets/images/product/categories5.png",
        slug: "combo",
    },
];

export default function TopCategories() {
    return (<section className="max-w-[1250px] mx-auto px-4 py-14">

        
        {/* Heading */}

        <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-wide">
                EXPLORE OUR TOP CATEGORIES
            </h2>

            <p className="text-gray-500 mt-2 text-sm md:text-base">
                Explore our wide range of products specially crafted for your taste and health.
            </p>
        </div>

        {/* Cards */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

            {categories.map((cat) => (
                <div
                    key={cat.slug}
                    className="relative h-[320px] rounded-xl overflow-hidden shadow-md hover:scale-[1.02] transition duration-300 flex items-end bg-cover bg-center"
                    style={{ backgroundImage: `url(${cat.image})` }}
                >

                    {/* Overlay Content */}

                    <div className="w-full bg-white/95 text-center p-4">

                        <h3 className="font-semibold text-lg">
                            {cat.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-3">
                            {cat.desc}
                        </p>

                        <Link
                            href={`/collections/${cat.slug}`}
                            className="inline-block bg-red-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition"
                        >
                            Shop Now
                        </Link>

                    </div>

                </div>
            ))}

        </div>

    </section>


);
}
