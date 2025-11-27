// app/index.tsx
import { Text, View, StyleSheet } from "react-native";
import {
  fetchFeaturedProducts,
  fetchAllCategories,
  fetchFeaturedProductsByCategory,
} from "@/api/product-service";
import Reat, { use, useEffect, useState } from "react";
import type { Product } from "@/types";
import CartIcon from "@/components/cart-icon";
import { router, Stack } from "expo-router";
import CategoryPill from "@/components/category-pill";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);

  const loadDate = async () => {
    try {
      setLoading(true);
      //fetch featured products from the API
      const products = await fetchFeaturedProducts(10);
      setFeaturedProducts(products);

      //fetch all available categories from the API
      const categoryData = await fetchAllCategories();
      setCategories(categoryData);

      //fetch product by cattegory

      if (categoryData.length > 0) {
        const defaultCategory = categoryData[0];
        const categoryProductData = await fetchFeaturedProductsByCategory(
          defaultCategory
        );
        setCategoryProducts(categoryProductData);
        setSelectedCategory(defaultCategory);
      }
    } catch (error) {
      console.error("Error loading data on index page", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = async (category: string | null) => {
    setSelectedCategory(category);
    if (!category) {
      // if all is selected
      setCategoryProducts(featuredProducts);
      return;
    }
    try {
      const products = await fetchFeaturedProductsByCategory(category);
      setCategoryProducts(products);
    } catch (error) {
      console.log("Error fetching products by category", error);
    }
  };
  useEffect(() => {
    loadDate();
  }, []);

  return (
    <>
      <Stack.Screen
        //name="Home"
        options={{ headerTitle: "My Store", headerRight: () => <CartIcon /> }}
      />
      <View style={styles.container}>
        <CategoryPill
          categories={categories}
          onSelectCategory={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
