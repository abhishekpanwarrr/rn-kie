import ProfileRow from "@/components/profile/ProfileRow";
import { getMyOrders } from "@/src/api/order.api";
import { formatDateTime } from "@/src/utils/date";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Orders() {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getMyOrders,
  });
  console.log("🚀 ~ Orders ~ data:", data);

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!data || data.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 16, color: "#666" }}>You haven’t placed any orders yet</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ProfileRow label="All orders" />
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/order/[id]",
                  params: { id: item.id },
                })
              }
              style={{
                backgroundColor: "#fff",
                padding: 16,
                borderRadius: 12,
                marginBottom: 12,
                elevation: 2,
              }}
            >
              <Text style={{ fontWeight: "700" }}>Order #{item.order_number}</Text>

              <Text style={{ marginTop: 4, color: "#666" }}>{item?.items?.length} items</Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 8,
                }}
              >
                <Text style={{ fontWeight: "600" }}>₹{item.total}</Text>
                <Text style={{ color: "#666", textTransform: "capitalize" }}>{item.status}</Text>
              </View>

              <Text style={styles.dateTime}>{formatDateTime(item?.created_at)}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dateTime: {
    color: "#85a9f8",
    paddingTop: 4,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd",
    alignSelf: "flex-end",
  },
});
