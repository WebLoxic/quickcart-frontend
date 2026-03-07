"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getSliders } from "@/services/api";

export default function Banner() {

  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {

    async function loadSliders() {
      try {

        const data = await getSliders();

        const images = (data || []).map((item) => item.image);

        setBanners(images);

      } catch (error) {
        console.error("Slider API Error:", error);
      }
    }

    loadSliders();

  }, []);

  // autoplay slider
  useEffect(() => {

    if (!banners.length) return;

    const timer = setInterval(() => {

      setCurrent((prev) =>
        prev === banners.length - 1 ? 0 : prev + 1
      );

    }, 5000);

    return () => clearInterval(timer);

  }, [banners]);

  const nextSlide = () => {
    setCurrent(current === banners.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? banners.length - 1 : current - 1);
  };

  return (

    <section className="max-w-[1250px] mx-auto mt-4 px-3">

      <div className="relative overflow-hidden rounded-lg">

        {/* Slider */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >

          {banners.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="banner"
              className="w-full flex-shrink-0 object-contain h-[180px] md:h-[320px] rounded-lg"
            />
          ))}

        </div>

        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black text-white p-2 rounded-full"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black text-white p-2 rounded-full"
        >
          <ChevronRight size={20} />
        </button>

      </div>

    </section>
  );
}