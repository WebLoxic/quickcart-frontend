"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Banner() {

  const banners = [
    "/assets/images/product/banner6.png",
    "/assets/images/product/banner7.png",
    "/assets/images/product/banner8.png",
    "/assets/images/product/banner9.png",
    "/assets/images/product/banner10.png"
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => prev === banners.length - 1 ? 0 : prev + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent(current === banners.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? banners.length - 1 : current - 1);
  };

  return (
    <section className="max-w-[1250px] mx-auto mt-4 px-3">

      <div className="relative overflow-hidden rounded-lg bg-white">

        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >

          {banners.map((img, index) => (
            <img
              key={index}
              src={img}
              className="w-full flex-shrink-0 object-contain h-[220px] md:h-[300px]"
              alt="banner"
            />
          ))}

        </div>

        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded"
        >
          <ChevronRight size={20} />
        </button>

      </div>

    </section>
  );
}