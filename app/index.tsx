import { Text, View } from "react-native";
import { fetchFeaturedProducts } from "@/api/product-service";
import { useEffect, useState } from "react";

export default function Index() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const result = await fetchFeaturedProducts(10);
      setProducts(result);
    };

    loadProducts();
  }, [])
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {
        fetchFeaturedProducts().then(products => (
          <Text>Found {products.length} featured products.</Text>
        )).catch(error => (
          <Text>Error fetching products: {error.message}</Text>
        ))
      }
      
    </View>
  );
}
