import { getProducts } from "@/src/api/product.api";
import { useQuery } from "@tanstack/react-query";
import { FlatList, View } from "react-native";
import ProductCard from "./ProductCard";
import SectionHeader from "./SectionHeader";

export default function RecommendedProducts() {
  const { data, isLoading } = useQuery({
    queryKey: ["recommended-products"],
    queryFn: getProducts,
  });

  if (!data || isLoading) return null;

  return (
    <View style={{ marginTop: 16 }}>
      <SectionHeader title="Recommended" />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        scrollEnabled={false} // 🔑 IMPORTANT
        contentContainerStyle={{ paddingHorizontal: 8 }}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
    </View>
  );
}
