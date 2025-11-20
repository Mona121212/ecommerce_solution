// app/index.tsx
import { Text, View } from "react-native";
import { fetchFeaturedProducts } from "@/api/product-service";
import { useEffect, useState } from "react";
import type { Product } from "@/types"; // 如果你的 Product 是从这里导出的

export default function Index() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // 只在这里调用一次接口
        const result = await fetchFeaturedProducts(10);
        setProducts(result);
      } catch (err: any) {
        console.error(err);
        setError(err.message ?? "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading && <Text>Loading...</Text>}

      {!!error && <Text>Error: {error}</Text>}

      {!loading && !error && (
        <Text>Found {products.length} featured products.</Text>
      )}
    </View>
  );
}
