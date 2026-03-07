"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/component/ProductCard";
import CollectionFilter from "@/component/CollectionFilter";

export default function CollectionPage() {

  const { slug } = useParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  /* banner map */

  const bannerMap = {
    digestive: "freeshipbanner2.webp",
    namkeens: "namkeenbanner.webp",
    sweets: "sweetbanner.webp",
    "mouth-freshner": "mukhwasbanner.webp",
    "free-shipping-combo-packs": "freeshipbanner.webp",
    "gift-packs": "combobanner.webp"
  };

  /* FETCH CATEGORIES */

  useEffect(() => {

    const fetchCategories = async () => {

      try {

        const res = await fetch(
          "https://bobby.webloxic.cloud/api/categories"
        );

        const data = await res.json();

        setCategories(data);

      } catch (error) {

        console.log("Category API Error:", error);

      }

    };

    fetchCategories();

  }, []);

  /* FETCH PRODUCTS */

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

  /* FIND CATEGORY ID FROM SLUG */

  const category = categories.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, "-") === slug
  );

  const categoryId = category?.id;

  /* FILTER PRODUCTS */

  let categoryProducts = products.filter(
    (p) => Number(p.category_id) === Number(categoryId)
  );

  /* FILTER STATES */

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
    sortedProducts.sort((a, b) => Number(a.price) - Number(b.price));
  }

  if (sort === "price-high") {
    sortedProducts.sort((a, b) => Number(b.price) - Number(a.price));
  }

  /* PRICE FILTER */

  if (priceFrom) {
    sortedProducts = sortedProducts.filter(
      (p) => Number(p.price) >= Number(priceFrom)
    );
  }

  if (priceTo) {
    sortedProducts = sortedProducts.filter(
      (p) => Number(p.price) <= Number(priceTo)
    );
  }

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading products...
      </div>
    );
  }

  return (

    <section className="max-w-[1250px] mx-auto px-4 py-10">

      {/* Banner */}

      <div className="flex justify-center mb-8">

        <img
          src={`/assets/images/product/${bannerMap[slug] || "freeshipbanner.webp"}`}
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

          sortedProducts.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))

        )}

      </div>

    </section>

  );

}