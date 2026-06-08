import api from '@/lib/axiosInstance';
import {
  Product,
  ProductFormData,
  UpdateProductPayload,
  ProductCategory
} from '@/types/product';
import { ApiResponse } from '@/types/api';

// ─── GET all products ────────────────────────────────────────────────────────
export const getAllProducts = async (): Promise<Product[]> => {
  const response = await api.get<ApiResponse<Product[]>>('/products');
  return response.data.data;
};

// ─── GET products with limit ─────────────────────────────────────────────────
export const getLimitedProducts = async (
  limit: number = 10
): Promise<Product[]> => {
  const response = await api.get<Product[]>('/products', {
    params: { limit },
  });
  return response.data;
};

// ─── GET single product ──────────────────────────────────────────────────────
export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};

// ─── GET all categories ──────────────────────────────────────────────────────
export const getCategories = async (): Promise<ProductCategory[]> => {
  const response = await api.get<ProductCategory[]>(
    '/products/categories'
  );
  return response.data;
};

// ─── GET products by category ────────────────────────────────────────────────
export const getProductsByCategory = async (
  category: ProductCategory
): Promise<Product[]> => {
  const response = await api.get<Product[]>(
    `/products/category/${category}`
  );
  return response.data;
};

// ─── GET sorted products ─────────────────────────────────────────────────────
export const getSortedProducts = async (
  sort: 'asc' | 'desc' = 'asc'
): Promise<Product[]> => {
  const response = await api.get<Product[]>('/products', {
    params: { sort },
  });
  return response.data;
};

// ─── CREATE product ──────────────────────────────────────────────────────────
export const createProduct = async (
  payload: ProductFormData
): Promise<Product> => {
  const response = await api.post<Product>('/products', payload);
  return response.data;
};

// ─── UPDATE product ──────────────────────────────────────────────────────────
export const updateProduct = async (
  id: number,
  payload: ProductFormData
): Promise<Product> => {
  const response = await api.put<Product>(`/products/${id}`, payload);
  return response.data;
};

// ─── PATCH product ───────────────────────────────────────────────────────────
export const patchProduct = async (
  id: number,
  payload: UpdateProductPayload
): Promise<Product> => {
  const response = await api.patch<Product>(
    `/products/${id}`,
    payload
  );
  return response.data;
};

// ─── DELETE product ──────────────────────────────────────────────────────────
export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};

// ─── Named export object ─────────────────────────────────────────────────────
export const productService = {
  getAll:          getAllProducts,
  getLimited:      getLimitedProducts,
  getById:         getProductById,
  getCategories:   getCategories,
  getByCategory:   getProductsByCategory,
  getSorted:       getSortedProducts,
  create:          createProduct,
  update:          updateProduct,
  patch:           patchProduct,
  delete:          deleteProduct,
};