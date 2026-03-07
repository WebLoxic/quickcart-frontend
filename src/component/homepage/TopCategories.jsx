"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export default function TopCategories() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchCategories = async () => {

            try {

                const res = await fetch("https://bobby.webloxic.cloud/api/categories", {
                    cache: "no-store",
                });

                const data = await res.json();

                setCategories(data);

            } catch (error) {

                console.error("API Error:", error);

            } finally {

                setLoading(false);

            }

        };

        fetchCategories();

    }, []);

    if (loading) {
        return (
            <div className="text-center py-20 text-gray-500">
                Loading categories...
            </div>
        );
    }

    return (

        <section className="max-w-[1250px] mx-auto px-4 py-14">

            {/* Heading */}

            <div className="text-center mb-12">

                <h2 className="text-2xl md:text-3xl font-semibold tracking-wide">
                    EXPLORE OUR TOP CATEGORIES
                </h2>

                <p className="text-gray-500 mt-2 text-sm md:text-base">
                    Explore our wide range of products specially crafted for your taste and health.
                </p>

            </div>

            {/* Slider */}

            <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop={true}
                breakpoints={{
                    0: {
                        slidesPerView: 2,
                    },
                    640: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 5,
                    },
                }}
            >

                {categories.map((cat) => {

                    const slug = cat.name
                        .toLowerCase()
                        .replace(/\s+/g, "-");

                    return (

                        <SwiperSlide key={cat.id}>

                            <div
                                className="relative h-[320px] rounded-xl overflow-hidden shadow-md hover:scale-[1.02] transition duration-300 flex items-end bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(/assets/images/product/categories1.png)`
                                }}
                            >

                                <div className="w-full bg-white/95 text-center p-4">

                                    <h3 className="font-semibold text-lg">
                                        {cat.name}
                                    </h3>

                                    <p className="text-gray-600 text-sm mb-3">
                                        {cat.description}
                                    </p>

                                    <Link
                                        href={`/collections/${slug}`}
                                        className="inline-block bg-red-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition"
                                    >
                                        Shop Now
                                    </Link>

                                </div>

                            </div>

                        </SwiperSlide>

                    );

                })}

            </Swiper>

        </section>
    );
}