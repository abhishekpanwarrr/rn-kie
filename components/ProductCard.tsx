import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    base_price: string;
    discount_price?: string;
    primary_image?: string;
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  const price = product.discount_price ?? product.base_price;

  return (
    <Pressable
      onPress={() => router.push(`/product/${product.slug}`)}
      style={{
        flex: 1,
        margin: 8,
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        elevation: 2,
      }}
    >
      <Image
        source={{
          uri: product.primary_image || "https://via.placeholder.com/300x300.png?text=No+Image",
        }}
        style={{ width: "100%", height: 150 }}
        resizeMode="cover"
      />

      <View style={{ padding: 10 }}>
        <Text numberOfLines={2} style={{ fontSize: 14, fontWeight: "600", marginBottom: 6 }}>
          {product.name}
        </Text>

        <Text style={{ fontSize: 14, fontWeight: "bold" }}>₹{price}</Text>
      </View>
    </Pressable>
  );
}
