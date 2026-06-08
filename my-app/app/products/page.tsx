"use client";

import { useProducts } from "@/hooks/useProducts";

export default function ProductsPage() {
  const { products, loading } = useProducts();

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Products</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <div key={product.id} className="border rounded-lg p-4 shadow">
            <img
              src={product.image}
              alt={product.title}
              className="h-48 object-contain mx-auto"
            />

            <h2 className="mt-4 font-bold">{product.title}</h2>

            <p className="text-green-600 font-semibold mt-2">
              ${product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}