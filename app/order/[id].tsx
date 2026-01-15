import { cancelOrder, getOrderById } from "@/src/api/order.api";
import { formatDateTime } from "@/src/utils/date";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { CheckCircle, CreditCard, MapPin, Package } from "lucide-react-native";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const queryClient = useQueryClient();

  const cancelMutation = useMutation({
    mutationFn: () => cancelOrder(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", data.id] });
    },
  });
  const { data, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: "#f8f9fa" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  if (!data) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: "#f8f9fa" }}>
        <Text style={{ textAlign: "center", fontSize: 16, color: "#666" }}>Order not found</Text>
      </SafeAreaView>
    );
  }

  // Calculate subtotal
  const subtotal = data.items.reduce((sum: any, item: any) => sum + item.price * item.quantity, 0);
  const shipping = data.shipping_cost || 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header with status */}
        <View style={styles.header}>
          <View style={styles.statusBadge}>
            <CheckCircle size={20} color="#34C759" />
            <Text style={styles.statusText}>
              Your order is {data.status === "delivered" ? "delivered" : data.status}
            </Text>
          </View>
          {data.status === "delivered" && (
            <Text style={styles.pointsText}>Rate product to get 5 points for collect.</Text>
          )}
        </View>

        {/* Order Info Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Order Information</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Order Number</Text>
            <Text style={styles.infoValue}>#{data.order_number}</Text>
          </View>

          {data.tracking_number && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Tracking Number</Text>
              <Text style={styles.infoValue}>{data.tracking_number}</Text>
            </View>
          )}

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Order Date & Time</Text>
            <Text style={styles.infoValue}>{formatDateTime(data?.created_at)}</Text>
          </View>
        </View>

        {/* Delivery Address Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MapPin size={18} color="#666" />
            <Text style={styles.cardTitle}>Delivery Address</Text>
          </View>
          <View style={styles.addressContainer}>
            <Text style={styles.addressText}>{data.shipping_address.address_line1}</Text>
            <Text style={styles.addressText}>{data.shipping_address.address_line2}</Text>
            <Text style={styles.addressText}>
              {data.shipping_address.city}, {data.shipping_address.state}{" "}
              {data.shipping_address.postal_code}
            </Text>
            <Text style={styles.addressText}>{data.shipping_address.country}</Text>
          </View>
        </View>

        {/* Items Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Package size={18} color="#666" />
            <Text style={styles.cardTitle}>Items</Text>
          </View>

          <FlatList
            data={data.items}
            scrollEnabled={false}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemCard}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.product.name}</Text>
                  {item.variant?.attributes && (
                    <Text style={styles.itemVariant}>
                      {Object.values(item.variant.attributes).join(" · ")}
                    </Text>
                  )}
                </View>
                <View style={styles.itemPriceContainer}>
                  <Text style={styles.itemQuantity}>×{item.quantity}</Text>
                  <Text style={styles.itemPrice}>${item?.price}</Text>
                </View>
              </View>
            )}
          />
        </View>

        {/* Payment Summary Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <CreditCard size={18} color="#666" />
            <Text style={styles.cardTitle}>Payment Summary</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Sub Total</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>
              {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
            </Text>
          </View>

          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${data?.total}</Text>
          </View>
        </View>

        {/* Buttons (if needed) */}
        <View style={[styles.buttonContainer, { marginBottom: 2 }]}>
          {["pending", "processing"].includes(data.status) && (
            <Pressable
              onPress={() =>
                Alert.alert("Cancel Order", "Are you sure you want to cancel this order?", [
                  { text: "No" },
                  {
                    text: "Yes",
                    style: "destructive",
                    onPress: () => cancelMutation.mutate(),
                  },
                ])
              }
              style={{
                marginTop: 20,
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: "#f00",
                padding: 14,
                borderRadius: 8,
                width: "100%",
              }}
            >
              <Text style={{ color: "#f00", textAlign: "center", fontWeight: "600" }}>
                Cancel Order
              </Text>
            </Pressable>
          )}
        </View>
        <View style={styles.buttonContainer}>
          {data.status === "delivered" ? (
            <>
              <View style={[styles.button, styles.primaryButton]}>
                <Text style={styles.primaryButtonText}>Rate Products</Text>
              </View>
              <View style={[styles.button, styles.secondaryButton]}>
                <Text style={styles.secondaryButtonText}>Return Home</Text>
              </View>
            </>
          ) : (
            <TouchableOpacity style={[styles.button, styles.primaryButton, { width: "100%" }]}>
              <Text style={styles.primaryButtonText}>Track Order</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212529",
  },
  pointsText: {
    fontSize: 14,
    color: "#6c757d",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f3f5",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: "#6c757d",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#212529",
  },
  addressContainer: {
    gap: 4,
  },
  addressText: {
    fontSize: 14,
    color: "#495057",
    lineHeight: 20,
  },
  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f8f9fa",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#212529",
    marginBottom: 4,
  },
  itemVariant: {
    fontSize: 12,
    color: "#868e96",
  },
  itemPriceContainer: {
    alignItems: "flex-end",
  },
  itemQuantity: {
    fontSize: 12,
    color: "#868e96",
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#212529",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#6c757d",
  },
  summaryValue: {
    fontSize: 14,
    color: "#212529",
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f1f3f5",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#212529",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 32,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#007AFF",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dee2e6",
  },
  secondaryButtonText: {
    color: "#212529",
    fontSize: 16,
    fontWeight: "500",
  },
});
