// api/product-service.ts
import type { Product } from "../types";

const BASE_URL = process.env.FAKESTORE_API_URL || "https://fakestoreapi.com";

// Fetch featured products from the fakestore API
export const fetchFeaturedProducts = async (
  limit = 10
): Promise<Product[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products?limit=${limit}`);
    const data = (await response.json()) as Product[];
    console.log("Fetched featured products:", data);
    return data;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
};

// fetch products by category
export const fetchFeaturedProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  try {
    // fakestore 的分类接口是 /products/category/:category
    const response = await fetch(
      `${BASE_URL}/products/category/${encodeURIComponent(category)}`
    );
    const data = (await response.json()) as Product[];
    console.log(`Fetched products for category ${category}:`, data);
    return data;
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    return [];
  }
};

// fetch all available categories
export const fetchAllCategories = async (): Promise<string[]> => {
  try {
    // fakestore 的所有分类是 /products/categories
    const response = await fetch(`${BASE_URL}/products/categories`);
    const data = (await response.json()) as string[];
    console.log("Fetched all categories:", data);
    return data;
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return [];
  }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const trimmed = query.trim();
    if (!trimmed) {
      return [];
    }

    // 注意这里是 /products，不是 /Products（大小写会 404）
    const response = await fetch(`${BASE_URL}/products`);
    const data = (await response.json()) as Product[];

    const lowerCaseQuery = trimmed.toLowerCase();

    return data.filter(
      (product) =>
        product.title.toLowerCase().includes(lowerCaseQuery) ||
        product.description.toLowerCase().includes(lowerCaseQuery)
    );
  } catch (error) {
    console.error("Error searching products", error);
    return [];
  }
};

export const fetchProductById = async (
  id: string
): Promise<Product | null> => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    const data = (await response.json()) as Product;
    return data;
  } catch (error) {
    console.error(`Error fetching product with ${id}:`, error);
    return null;
  }
};
