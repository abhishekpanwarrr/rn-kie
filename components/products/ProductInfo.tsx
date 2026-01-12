import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

type Props = {
  name: string;
  base_price: string;
  discount_price?: string | null;
  rating: number;
  review_count: number;
};

export default function ProductInfo({
  name,
  base_price,
  discount_price,
  rating,
  review_count,
}: Props) {
  const price = discount_price ?? base_price;

  return (
    <View style={{ padding: 16 }}>
      {/* Product Name */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: "700",
          marginBottom: 8,
        }}
      >
        {name}
      </Text>

      {/* Price */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
          }}
        >
          ₹{price}
        </Text>

        {discount_price && (
          <Text
            style={{
              fontSize: 14,
              marginLeft: 8,
              textDecorationLine: "line-through",
              color: "#999",
            }}
          >
            ₹{base_price}
          </Text>
        )}
      </View>

      {/* Rating */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Ionicons name="star" size={16} color="#22C55E" />
        <Text style={{ marginLeft: 4, fontWeight: "600" }}>{rating.toFixed(1)}</Text>
        <Text style={{ marginLeft: 6, color: "#666" }}>({review_count})</Text>
      </View>
    </View>
  );
}
