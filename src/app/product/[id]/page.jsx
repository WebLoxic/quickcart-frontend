import products from "@/data/products";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/component/product/ProductDetailClient";

export default async function Page({ params }) {
  const { id } = await params;

  const product = products.find(
    (item) => item.id.toString() === id
  );

  if (!product) return notFound();

  return <ProductDetailClient product={product} />;
}