import ProfileRow from "@/components/profile/ProfileRow";
import { logout } from "@/src/utils/auth.utils";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "@/src/theme/ThemeProvider";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { useQueryClient } from "@tanstack/react-query";

export default function Settings() {
  const { colors, theme, setTheme } = useTheme();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await SecureStore.deleteItemAsync("token");
          queryClient.clear();
          await logout();
          router.replace("/auth/login");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 24 }}>Settings</Text>

        {/* Account */}
        <Text style={{ fontSize: 13, color: "#666", marginBottom: 8 }}>ACCOUNT</Text>

        <ProfileRow
          icon="person-outline"
          label="Edit Profile"
          onPress={() => router.push("/user/profile/edit")}
        />
        <ProfileRow
          icon="lock-closed-outline"
          label="Change password"
          onPress={() => router.push("/user/profile/change-password")}
        />

        <Item
          icon="location-outline"
          label="Manage Addresses"
          onPress={() => router.push("/address")}
        />

        <Item icon="bag-outline" label="My Orders" onPress={() => router.push("/order/orders")} />

        {/* App */}
        <View style={{ marginTop: 24 }}>
          {/* <Text style={{ fontSize: 13, color: "#666", marginBottom: 8 }}>APP</Text> */}

          <Text style={{ fontSize: 16, fontWeight: "700", marginVertical: 12, color: colors.text }}>
            Appearance
          </Text>
          <Item
            icon="moon-outline"
            label="Dark Mode"
            onPress={() => Alert.alert("Theme toggle later")}
          />
          <ThemeItem label="Light" active={theme === "light"} onPress={() => setTheme("light")} />

          <ThemeItem label="Dark" active={theme === "dark"} onPress={() => setTheme("dark")} />

          <ThemeItem label="Brand" active={theme === "brand"} onPress={() => setTheme("brand")} />
        </View>

        {/* Logout */}
        <View style={{ marginTop: 32 }}>
          <Item icon="log-out-outline" label="Logout" danger onPress={handleLogout} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const ThemeItem = ({ label, active, onPress }: any) => (
  <Pressable
    onPress={onPress}
    style={{
      backgroundColor: active ? "#E5E7EB" : "#FFF",
      padding: 14,
      borderRadius: 12,
      marginBottom: 8,
    }}
  >
    <Text style={{ fontWeight: active ? "700" : "400" }}>{label}</Text>
  </Pressable>
);

const Item = ({
  icon,
  label,
  onPress,
  danger,
}: {
  icon: any;
  label: string;
  onPress: () => void;
  danger?: boolean;
}) => {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        backgroundColor: colors.background,
      }}
    >
      <Ionicons
        name={icon}
        size={20}
        color={danger ? "#E53935" : colors.primary}
        style={{ width: 26 }}
      />
      <Text
        style={{
          fontSize: 16,
          color: danger ? "#E53935" : colors.text,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};
