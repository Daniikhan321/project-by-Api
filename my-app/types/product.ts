export type ProductCategory =
  | "electronics"
  | "jewelery"
  | "men's clothing"
  | "women's clothing";

export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: ProductCategory;
  image: string;
  rating: ProductRating;
}

// Creating a new product
export interface ProductFormData {
  title: string;
  price: number;
  description: string;
  category: ProductCategory;
  image: string;
}

// Updating a product
export type UpdateProductPayload = Partial<ProductFormData>;