import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderSuccess() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 12 }}>🎉 Order Placed!</Text>

      <Text style={{ marginBottom: 24 }}>Order ID: {orderId}</Text>

      <Pressable
        onPress={() => router.replace("/")}
        style={{
          backgroundColor: "#111",
          paddingVertical: 14,
          paddingHorizontal: 32,
          borderRadius: 30,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "700" }}>Continue Shopping</Text>
      </Pressable>
    </SafeAreaView>
  );
}
