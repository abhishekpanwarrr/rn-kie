import ProfileRow from "@/components/profile/ProfileRow";
import { getMe } from "@/src/api/user.api";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const router = useRouter();
  const { data: user, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        router.push("/auth/login");
      }
    };

    checkAuth();
  }, []);
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
        {isLoading ? (
          <ActivityIndicator
            style={{
              marginLeft: 40,
            }}
          />
        ) : user ? (
          <>
            <View style={{ marginLeft: 16, flex: 1 }}>
              <Text style={{ fontSize: 20, fontWeight: "700" }}>
                {user?.first_name ?? ""} {user?.last_name ?? ""}
              </Text>
              <Text style={{ color: "#666", marginTop: 4 }}>{user?.email}</Text>
              {/* {user?.is_email_verified && (
                <View style={styles.verifiedRow}>
                  <Ionicons name="checkmark-circle" size={16} color="#2ECC71" />
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
              )} */}
              {user?.is_email_verified && (
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark" size={14} color="#2ECC71" />
                  <Text style={styles.verifiedBadgeText}>Verified</Text>
                </View>
              )}
            </View>
            <TouchableOpacity onPress={() => router.push("/user/settings")}>
              <Ionicons name="settings-outline" size={22} />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/auth/login")}
            activeOpacity={0.8}
          >
            <Ionicons name="log-in-outline" size={20} color="white" style={styles.loginIcon} />
            <Text style={styles.loginText}>Sign In</Text>
          </TouchableOpacity>
        )}
      </View>
      {!user?.is_email_verified && (
        <View style={[styles.verifyBanner, { marginHorizontal: 16, marginBottom: 10 }]}>
          <Pressable onPress={() => router.push("/auth/verify-email")}>
            <Text style={styles.verifyTitle}>Verify your email</Text>
          </Pressable>
          <Text style={styles.verifySubtitle}>Secure your account and unlock all features</Text>
        </View>
      )}
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
          onPress={() => {
            if (!user) {
              alert("Login or register first!");
            } else {
              router.push("/address");
            }
          }}
        />

        <ProfileRow
          icon="card-outline"
          label="Payment method"
          onPress={() => {
            if (!user) {
              alert("Login or register first!");
            } else {
              router.push("/payment");
            }
          }}
        />

        <ProfileRow
          icon="pricetag-outline"
          label="Voucher"
          onPress={() => {
            if (!user) {
              alert("Login or register first!");
            } else {
              router.push("/voucher");
            }
          }}
        />

        <ProfileRow
          icon="heart-outline"
          label="My Wishlist"
          onPress={() => {
            if (!user) {
              alert("Login or register first!");
            } else {
              router.push("/wishlist");
            }
          }}
        />
        <ProfileRow
          icon="cart-outline"
          label="My orders"
          onPress={() => {
            if (!user) {
              alert("Login or register first!");
            } else {
              router.push("/order/orders");
            }
          }}
        />

        <ProfileRow
          icon="star-outline"
          label="Rate this app"
          onPress={() => {
            // placeholder (native later)
            alert("Thanks for your support ❤️");
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  verifyBanner: {
    backgroundColor: "#FFF5F5",
    borderColor: "#FFB3B3",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginTop: 12,
  },
  verifyTitle: {
    color: "#C62828",
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 4,
  },
  verifySubtitle: {
    color: "#8E2A2A",
    fontSize: 12,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#EAF9F0",
  },
  verifiedBadgeText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "600",
    color: "#2ECC71",
  },
  // verifiedRow: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginTop: 6,
  // },

  // verifiedText: {
  //   marginLeft: 6,
  //   fontSize: 13,
  //   fontWeight: "600",
  //   color: "#2ECC71",
  // },

  loginButton: {
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 20,
    backgroundColor: "#000",
    width: 120,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  loginIcon: {
    marginRight: 8,
  },
});
