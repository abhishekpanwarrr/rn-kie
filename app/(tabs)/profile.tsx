import ProfileRow from "@/components/profile/ProfileRow";
import { getMe } from "@/src/api/user.api";
import { logout } from "@/src/utils/auth.utils";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const router = useRouter();
  const { data: user, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <Text>Failed to load profile</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header */}
      <View style={{ padding: 24, flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            backgroundColor: "#F2DCDC",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="person" size={32} color="#111" />
        </View>

        <View style={{ marginLeft: 16, flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: "700" }}>
            {user.first_name ?? "User"} {user.last_name ?? ""}
          </Text>
          <Text style={{ color: "#666", marginTop: 4 }}>{user.email}</Text>
        </View>

        <Ionicons name="settings-outline" size={22} />
      </View>

      {/* Card */}
      <View
        style={{
          marginHorizontal: 16,
          backgroundColor: "#FFF",
          borderRadius: 16,
          paddingHorizontal: 16,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 3,
        }}
      >
        <ProfileRow
          icon="location-outline"
          label="Address"
          onPress={() => router.push("/address")}
        />

        <ProfileRow
          icon="card-outline"
          label="Payment method"
          onPress={() => router.push("/payment")}
        />

        <ProfileRow
          icon="pricetag-outline"
          label="Voucher"
          onPress={() => router.push("/voucher")}
        />

        <ProfileRow
          icon="heart-outline"
          label="My Wishlist"
          onPress={() => router.push("/wishlist")}
        />
        <ProfileRow
          icon="cart-outline"
          label="My orders"
          onPress={() => router.push("/order/orders")}
        />

        <ProfileRow
          icon="star-outline"
          label="Rate this app"
          onPress={() => {
            // placeholder (native later)
            alert("Thanks for your support ❤️");
          }}
        />
        <ProfileRow
          icon="log-out-outline"
          label="Log out"
          danger
          onPress={async () => {
            await logout();
            router.replace("/auth/login");
          }}
        />
      </View>
    </SafeAreaView>
  );
}
