import { getFeaturedProducts } from "@/src/api/product.api";
import { useQuery } from "@tanstack/react-query";
import { FlatList, View } from "react-native";
import ProductCard from "./ProductCard";
import SectionHeader from "./SectionHeader";

export default function FeaturedProducts() {
  const { data, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: getFeaturedProducts,
  });

  if (!data || isLoading) return null;

  return (
    <View style={{ marginTop: 8, height: 180 }}>
      <SectionHeader title="Feature Products" />
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 8 }}
        renderItem={({ item }) => (
          <View style={{ width: 190 }}>
            <ProductCard product={item} />
          </View>
        )}
      />
    </View>
  );
}
