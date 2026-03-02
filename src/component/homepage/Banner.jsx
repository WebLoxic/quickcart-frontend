"use client";
import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="hidden md:block max-w-7xl mx-auto px-4 mt-6">

      {/* 🔥 Main Green Banner */}
      <div className="relative bg-green-700 rounded-2xl overflow-hidden p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">

        {/* Left Content */}
        <div className="text-white max-w-xl space-y-4 z-10">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Stock up on daily essentials
          </h1>

          <p className="text-lg text-green-100">
            Get farm-fresh goodness & a range of exotic fruits, vegetables,
            eggs & more
          </p>

          <Link
            href="/shop"
            className="inline-block bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Shop Now
          </Link>
        </div>

        {/* Right Image */}
        <div className="relative w-full md:w-[400px] h-56 md:h-72 mt-6 md:mt-0">
          <Image
            src="https://images.unsplash.com/photo-1610348725531-843dff563e2c"
            alt="Groceries"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* 🔥 3 Small Promo Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="relative bg-teal-500 text-white rounded-2xl p-6">
          <h3 className="text-xl font-semibold">
            Pharmacy at your doorstep!
          </h3>
          <p className="text-sm mt-2">
            Cough syrups, pain relief sprays & more
          </p>
        </div>

        <div className="relative bg-yellow-400 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Pet care supplies at your door
          </h3>
          <p className="text-sm mt-2 text-gray-700">
            Food, treats, toys & more
          </p>
        </div>

        <div className="relative bg-gray-200 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            No time for a diaper run?
          </h3>
          <p className="text-sm mt-2 text-gray-600">
            Get baby care essentials
          </p>
        </div>
      </div>

    </section>
  );
}