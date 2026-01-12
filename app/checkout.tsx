import AddressCard from "@/components/checkout/AddressCard";
import { getAddresses } from "@/src/api/address.api";
import { getCart } from "@/src/api/cart.api";
import { placeOrder } from "@/src/api/order.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Checkout() {
  const router = useRouter();
  const { step, addressId } = useLocalSearchParams<{
    step?: string;
    addressId?: string;
  }>();
  const queryClient = useQueryClient();

  const orderMutation = useMutation({
    mutationFn: () => placeOrder(addressId!),
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      router.replace({
        pathname: "/order/success",
        params: { orderId: order.id },
      });
    },
  });
  const { data: cart, isLoading: cartLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const { data: addresses = [], isLoading: addressLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
    refetchOnMount: true,
  });

  if (cartLoading || addressLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  // ✅ Only cart is mandatory
  if (!cart || cart.items.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Your cart is empty</Text>
      </SafeAreaView>
    );
  }

  const selectedAddress = addresses.find((a: any) => a.id === addressId);

  // ======================
  // STEP 2 — REVIEW
  // ======================
  if (step === "review" && selectedAddress) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 16 }}>
          <Text style={styles.title}>Deliver to</Text>

          <AddressCard address={selectedAddress} selected />

          <Text style={styles.title}>Items</Text>

          <FlatList
            data={cart.items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                <Text style={{ fontWeight: "600" }}>{item.product.name}</Text>
                {item.variant?.attributes && (
                  <Text style={styles.muted}>
                    {Object.values(item.variant.attributes).join(" · ")}
                  </Text>
                )}
                <Text>
                  ₹{item.variant?.price ?? item.product.base_price} × {item.quantity}
                </Text>
              </View>
            )}
          />

          <View style={{ marginTop: 16 }}>
            <View style={styles.row}>
              <Text>Subtotal</Text>
              <Text>₹{cart.total}</Text>
            </View>
            <View style={styles.row}>
              <Text>Delivery</Text>
              <Text>Free</Text>
            </View>
            <View style={styles.row}>
              <Text style={{ fontWeight: "700" }}>Total</Text>
              <Text style={{ fontWeight: "700" }}>₹{cart.total}</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomBar}>
          <Pressable onPress={() => orderMutation.mutate()} style={styles.primaryBtn}>
            <Text style={styles.primaryText}>
              {" "}
              {orderMutation.isPending ? "Placing..." : "Place Order"}
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // ======================
  // STEP 1 — ADDRESS SELECT
  // ======================
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={styles.title}>Select delivery address</Text>

        {addresses.length === 0 ? (
          // ✅ EMPTY STATE
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <Text style={{ fontSize: 16, color: "#666", marginBottom: 16 }}>
              No delivery address found
            </Text>

            <Pressable onPress={() => router.push("/address/add")} style={styles.primaryBtn}>
              <Text style={styles.primaryText}>Add New Address</Text>
            </Pressable>
          </View>
        ) : (
          // ✅ ADDRESS LIST
          <FlatList
            data={addresses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AddressCard
                address={item}
                selected={item.id === addressId}
                onSelect={() =>
                  router.push({
                    pathname: "/checkout",
                    params: {
                      step: "review",
                      addressId: item.id,
                    },
                  })
                }
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  itemRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },
  muted: {
    color: "#666",
    fontSize: 12,
  },
  bottomBar: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#EEE",
  },
  primaryBtn: {
    backgroundColor: "#111",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  primaryText: {
    color: "#fff",
    fontWeight: "700",
  },
});
