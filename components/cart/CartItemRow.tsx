import { removeCartItem, updateCartItem } from "@/src/api/cart.api";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  item: {
    id: string;
    quantity: number;
    product: {
      name: string;
      base_price: string;
      discount_price?: string;
      primary_image?: string;
    };
    variant?: {
      attributes?: Record<string, string>;
      price?: string;
    };
  };
};

export default function CartItemRow({ item }: Props) {
  const queryClient = useQueryClient();

  const price = item.variant?.price ?? item.product.discount_price ?? item.product.base_price;

  // 🔹 update quantity
  const updateMutation = useMutation({
    mutationFn: (qty: number) => updateCartItem(item.id, qty),

    onMutate: async (qty) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previous = queryClient.getQueryData<any>(["cart"]);

      queryClient.setQueryData(["cart"], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          items: old.items.map((i: any) => (i.id === item.id ? { ...i, quantity: qty } : i)),
        };
      });

      return { previous };
    },

    onError: (_e, _v, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(["cart"], ctx.previous);
      }
      Alert.alert("Error", "Failed to update quantity");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // 🔹 remove item
  const removeMutation = useMutation({
    mutationFn: () => removeCartItem(item.id),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previous = queryClient.getQueryData<any>(["cart"]);

      queryClient.setQueryData(["cart"], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          items: old.items.filter((i: any) => i.id !== item.id),
        };
      });

      return { previous };
    },

    onError: (_e, _v, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(["cart"], ctx.previous);
      }
      Alert.alert("Error", "Failed to remove item");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        elevation: 2,
      }}
    >
      <Image
        source={{ uri: item.product.primary_image }}
        style={{ width: 80, height: 80, borderRadius: 8 }}
      />

      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={{ fontSize: 15, fontWeight: "600" }} numberOfLines={2}>
          {item.product.name}
        </Text>

        {item.variant?.attributes && (
          <Text style={{ marginTop: 4, color: "#666", fontSize: 12 }}>
            {Object.values(item.variant.attributes).join(" · ")}
          </Text>
        )}

        <Text style={{ marginTop: 6, fontWeight: "600" }}>₹{price}</Text>

        {/* Quantity controls */}
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
          <Pressable
            onPress={() => item.quantity > 1 && updateMutation.mutate(item.quantity - 1)}
            style={styles.qtyBtn}
          >
            <Text>-</Text>
          </Pressable>

          <Text style={{ marginHorizontal: 12, fontWeight: "600" }}>{item.quantity}</Text>

          <Pressable onPress={() => updateMutation.mutate(item.quantity + 1)} style={styles.qtyBtn}>
            <Text>+</Text>
          </Pressable>

          {/* Remove */}
          <Pressable onPress={() => removeMutation.mutate()} style={{ marginLeft: 16 }}>
            <Ionicons name="trash-outline" size={18} color="#E53935" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },
});
