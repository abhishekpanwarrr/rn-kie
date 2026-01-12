import AddressCard from "@/components/checkout/AddressCard";
import { getAddresses } from "@/src/api/address.api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Address() {
  const router = useRouter();

  const { data: addresses = [], isLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
  });

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "700" }}>My Addresses</Text>

          <Pressable
            onPress={() => router.push("/address/add")}
            style={{
              backgroundColor: "#111",
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>Add</Text>
          </Pressable>
        </View>

        {/* Empty State */}
        {addresses.length === 0 && (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "#666", marginBottom: 12 }}>No addresses added yet</Text>

            <Pressable
              onPress={() => router.push("/address/add")}
              style={{
                backgroundColor: "#111",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 24,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>Add Address</Text>
            </Pressable>
          </View>
        )}

        {/* Address List */}
        <FlatList
          data={addresses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AddressCard address={item} />}
        />
      </View>
    </SafeAreaView>
  );
}
