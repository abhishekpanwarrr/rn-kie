import React from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  price: string;
  quantity: number;
  setQuantity: (q: number) => void;
  onAddToCart: () => void;
  disabled?: boolean;
};

export default function AddToCartBar({
  price,
  quantity,
  setQuantity,
  onAddToCart,
  disabled,
}: Props) {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#eee",
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Quantity */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable
          onPress={() => quantity > 1 && setQuantity(quantity - 1)}
          style={{
            padding: 8,
            borderRadius: 20,
            backgroundColor: "#F2F2F2",
          }}
        >
          <Text>-</Text>
        </Pressable>

        <Text style={{ marginHorizontal: 12, fontWeight: "600" }}>{quantity}</Text>

        <Pressable
          onPress={() => setQuantity(quantity + 1)}
          style={{
            padding: 8,
            borderRadius: 20,
            backgroundColor: "#F2F2F2",
          }}
        >
          <Text>+</Text>
        </Pressable>
      </View>

      {/* Add to cart */}
      <Pressable
        disabled={disabled}
        onPress={onAddToCart}
        style={{
          backgroundColor: disabled ? "#CCC" : "#111",
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 30,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "700" }}>Add to cart · ₹{price}</Text>
      </Pressable>
    </View>
  );
}
