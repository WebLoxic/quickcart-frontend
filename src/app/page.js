"use client"


import Banner from "@/component/homepage/Banner"
import ProductSection from "@/component/homepage/ProductSection"
import React from "react"

export default function Home () {
    return (
        <>
        <Banner/>
          <ProductSection
        title="Dairy, Bread & Eggs"
        category="Dairy, Bread & Eggs"
      />

      {/* 🚬 Rolling Paper Section */}
      <ProductSection
        title="Rolling paper & tobacco"
        category="Rolling paper & tobacco"
      />
      <ProductSection
        title="Snacks & Munchies"
        category="Snacks & Munchies"
      />
      <ProductSection
  title="Hookah"
  category="Hookah"
/>

<ProductSection
  title="Mouth fresheners"
  category="Mouth fresheners"
/>

<ProductSection
  title="Cold Drinks & Juices"
  category="Cold Drinks & Juices"
/>

<ProductSection
  title="Candies & Gums"
  category="Candies & Gums"
/>
        </>
    )
}