import products from "@/data/products";
import ProductDetailClient from "@/component/product/ProductDetailClient";

export default async function ProductPage({ params }) {

  const { id } = await params;   // 👈 IMPORTANT

  const productId = parseInt(id);

  const product = products.find(
    (item) => item.id === productId
  );

  if (!product) {
    return (
      <div className="p-20 text-center text-xl">
        Product not found
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}