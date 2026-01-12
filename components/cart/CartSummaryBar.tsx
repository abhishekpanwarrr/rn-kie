import React from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  total: string;
  itemCount: number;
  onCheckout: () => void;
};

export default function CartSummaryBar({ total, itemCount, onCheckout }: Props) {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#EEE",
        padding: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <Text style={{ color: "#666" }}>Subtotal ({itemCount} items)</Text>
        <Text style={{ fontWeight: "700", fontSize: 16 }}>₹{total}</Text>
      </View>

      <Pressable
        onPress={onCheckout}
        style={{
          backgroundColor: "#111",
          paddingVertical: 14,
          borderRadius: 30,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "700" }}>Proceed to Checkout</Text>
      </Pressable>
    </View>
  );
}
