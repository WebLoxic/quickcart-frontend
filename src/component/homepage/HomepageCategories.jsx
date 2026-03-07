"use client";

import { useEffect, useState } from "react";
import CategorySection from "../CategorySection";

export default function HomepageCategories() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {

    const fetchCategories = async () => {

      const res = await fetch(
        "https://bobby.webloxic.cloud/api/categories"
      );

      const data = await res.json();

      setCategories(data);

    };

    fetchCategories();

  }, []);

  return (

    <>
      {categories.map(cat => (
        <CategorySection key={cat.id} category={cat} />
      ))}
    </>

  );

}