import { removeFromWishlist } from "@/src/api/wishlist.api";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Alert, Image, Pressable, Text, TouchableOpacity, View } from "react-native";

type Props = {
  product: {
    id: string;
    name: string;
    slug: string;
    base_price: string;
    primary_image?: string;
  };
};

export default function WishlistItemCard({ product }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const removeMutation = useMutation({
    mutationFn: () => removeFromWishlist(product.id),

    // 🔥 optimistic update
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["wishlist"] });

      const previous = queryClient.getQueryData<any[]>(["wishlist"]);

      queryClient.setQueryData(["wishlist"], (old: any[] | undefined) =>
        old?.filter((item) => item.product.id !== product.id)
      );

      return { previous };
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["wishlist"], context.previous);
      }
      Alert.alert("Error", "Failed to remove item");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
  return (
    <TouchableOpacity
      onPress={() => router.push(`/product/${product.slug}`)}
      style={{
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 12,
        overflow: "hidden",
        elevation: 2,
      }}
    >
      <Image
        source={{ uri: product.primary_image }}
        style={{ width: 90, height: 90 }}
        resizeMode="cover"
      />

      <View style={{ flex: 1, padding: 12 }}>
        <Text style={{ fontSize: 15, fontWeight: "600" }} numberOfLines={2}>
          {product.name}
        </Text>

        <Text style={{ marginTop: 6, fontSize: 14, fontWeight: "500" }}>₹{product.base_price}</Text>
      </View>
      <Pressable
        onPress={() => removeMutation.mutate()}
        style={{
          padding: 12,
          justifyContent: "center",
        }}
      >
        <Ionicons name="heart" size={22} color="#E53935" />
      </Pressable>
    </TouchableOpacity>
  );
}
