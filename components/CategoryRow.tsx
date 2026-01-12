import { getCategories } from "@/src/api/category.api";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { FlatList, View } from "react-native";
import CategoryPill from "./CategoryPill";

export default function CategoryRow() {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (!data) return null;

  return (
    <View style={{ height: 110 }}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 16,
          alignItems: "center",
        }}
        renderItem={({ item }) => (
          <CategoryPill name={item.name} onPress={() => router.push(`/category/${item.slug}`)} />
        )}
      />
    </View>
  );
}
