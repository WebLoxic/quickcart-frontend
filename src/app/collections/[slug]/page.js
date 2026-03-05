"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import products from "@/data/products";
import ProductCard from "@/component/ProductCard";
import CollectionFilter from "@/component/CollectionFilter";

export default function CollectionPage() {

    const { slug } = useParams();

    /* CATEGORY MAP */

    const categoryMap = {
        digestive: "Digestive Candy",
        namkeens: "Namkeens",
        sweets: "Sweets",
        "mouth-freshner": "Mouth Freshner",

        "free-shipping-combo-packs": "Free Shipping Combo",
        "gift-packs": "Gift Packs"
    };

    /* BANNER MAP */

    const bannerMap = {
        digestive: "freeshipbanner2.webp",
        namkeens: "namkeenbanner.webp",
        sweets: "sweetbanner.webp",
        "mouth-freshner": "mukhwasbanner.webp",
        "free-shipping-combo-packs": "freeshipbanner.webp",
        "gift-packs": "combobanner.webp"
    };

    const categoryName = categoryMap[slug];

    /* PRODUCTS FILTER */

    const categoryProducts = products.filter(
        (p) => p.category === categoryName
    );

    /* STATES */

    const [sort, setSort] = useState("default");
    const [filterOpen, setFilterOpen] = useState(false);
    const [availabilityPage, setAvailabilityPage] = useState(false);
    const [pricePage, setPricePage] = useState(false);

    const [inStock, setInStock] = useState(false);
    const [priceFrom, setPriceFrom] = useState("");
    const [priceTo, setPriceTo] = useState("");

    let sortedProducts = [...categoryProducts];

    /* SORT */

    if (sort === "price-low") {
        sortedProducts.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
        sortedProducts.sort((a, b) => b.price - a.price);
    }

    /* PRICE FILTER */

    if (priceFrom) {
        sortedProducts = sortedProducts.filter(
            (p) => p.price >= priceFrom
        );
    }

    if (priceTo) {
        sortedProducts = sortedProducts.filter(
            (p) => p.price <= priceTo
        );
    }

    return (

        <section className="max-w-[1250px] mx-auto px-4 py-10">

            {/* Banner */}

            <div className="flex justify-center mb-8">

                <img
                    src={`/assets/images/product/${bannerMap[slug]}`}
                    alt={slug}
                    className="w-full md:w-[950px] rounded-lg object-cover"
                />

            </div>

            {/* Filter */}

            <CollectionFilter
                sortedProducts={sortedProducts}
                sort={sort}
                setSort={setSort}
                filterOpen={filterOpen}
                setFilterOpen={setFilterOpen}
                availabilityPage={availabilityPage}
                setAvailabilityPage={setAvailabilityPage}
                pricePage={pricePage}
                setPricePage={setPricePage}
                inStock={inStock}
                setInStock={setInStock}
                priceFrom={priceFrom}
                setPriceFrom={setPriceFrom}
                priceTo={priceTo}
                setPriceTo={setPriceTo}
            />

            {/* PRODUCTS */}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {sortedProducts.length === 0 ? (

                    <p className="col-span-full text-center text-gray-500">
                        No products found
                    </p>

                ) : (

                    sortedProducts.map((product) => (<ProductCard
                        key={product.id}
                        product={product}
                    />
                    ))

                )}

            </div>

        </section>

    );

}
